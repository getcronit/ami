import {DeleteIcon} from '@chakra-ui/icons'
import {Box, Divider} from '@chakra-ui/layout'
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Portal,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import {FaFile} from '@react-icons/all-files/fa/FaFile'
import {FaFilePdf} from '@react-icons/all-files/fa/FaFilePdf'
import {FaFolder} from '@react-icons/all-files/fa/FaFolder'
import update from 'immutability-helper'
import React from 'react'
import {MouseEvent, useEffect, useState} from 'react'
import {useDropzone, FileRejection} from 'react-dropzone'
import {MimeTypes} from '../../../common/mimeTypes'
import {fileToBase64} from '../../../common/toBase64'
import {isValidHttpUrl} from '../../../common/url'
import {uuidv4} from '../../../common/uuid'
import ContextModal from '../../molecules/ContextModal'
import FileContextMenu from '../../molecules/FileContextMenu'
import FileInfoBox, {
  FileDetails,
  FileInfoBoxProps
} from '../../molecules/FileInfoBox'
import FileList from '../../molecules/FileList'
import Toolbar from '../../molecules/Toolbar'
import {
  FinderData,
  FinderFileItem,
  FinderFolderItem,
  FinderMode,
  MimeType
} from './types'

export type SnekFinderProps = {
  mode?: FinderMode
  onSelectorClose?: () => void
  onSelectorSelect?: (uuid: string, fileItem: FinderFileItem) => void
  data: FinderData
  rootUUID: string
  onItemOpen: (uuid: string) => void
  onDataChanged: (data: FinderData) => Promise<void>
  onUploadFile: (file: File) => Promise<string>
}

const Finder: React.FC<SnekFinderProps> = ({mode = 'browser', ...props}) => {
  const toast = useToast()
  const folderCreateContextModal = useDisclosure()
  const itemRenameContextModal = useDisclosure()

  const [showInfoCard, setShowInfoCard] = useState(false)
  const infoCardToggle = () => setShowInfoCard(!showInfoCard)

  let [data, setData] = useState<FinderData>(props.data)

  React.useEffect(() => {
    setData(props.data)
  }, [props.data])

  const updateData = (newData: FinderData) => {
    setData(newData)
    props.onDataChanged(newData)
  }

  const [rootUUID, setRootUUID] = useState(props.rootUUID)

  const [parentNodeHistory, setParentNodeHistory] = useState<
    {index: string; text: string}[]
  >([{index: rootUUID, text: data[rootUUID].name}])

  const [selectedFiles, setSelectedFiles] = useState<number[]>([])
  const [contextMenu, setContextMenu] = useState<{
    id: number | undefined
    spawnX: number
    spawnY: number
  } | null>(null)

  const switchParentNode = (uuid: string) => {
    // find uuid in parentNodeHistory and remove it and all following elements
    const index = parentNodeHistory.findIndex(
      (item: {index: string}) => item.index === uuid
    )

    if (index !== -1) {
      setParentNodeHistory(parentNodeHistory.slice(0, index + 1))
    } else {
      setParentNodeHistory(
        parentNodeHistory.concat({index: uuid, text: data[uuid].name})
      )
    }

    setRootUUID(uuid)
    // add uuid to parentNodeHistory state
  }

  const resolveUUIDFromIndex = (index: number) => {
    const folder = data[rootUUID] as FinderFolderItem

    return folder.childUUIDs[index] || rootUUID
  }

  const handleSelectionChange = (ids: number[]) => {
    setSelectedFiles(ids)
  }

  const handleContextMenu = (event: MouseEvent, id: number | undefined) => {
    setContextMenu({id, spawnX: event.clientX, spawnY: event.clientY})
  }

  const handleMove = (dragUUID: string, dropUUID: string) => {
    const folder = data[rootUUID] as FinderFolderItem

    // Push dragUUID to data[dropUUID].childUUIDs without duplicates
    const droppable = data[dropUUID] as FinderFolderItem

    if (!droppable.childUUIDs.includes(dragUUID)) {
      // Remove dragUUID from folder.childUUIDs
      const newRootChildUUIDs = folder.childUUIDs.filter(
        (uuid: string) => uuid !== dragUUID
      )

      const newData = update(data, {
        [rootUUID]: {
          childUUIDs: {$set: newRootChildUUIDs}
        },
        [dropUUID]: {
          childUUIDs: {$push: [dragUUID]}
        }
      })

      updateData(newData)

      toast({
        title: `Moved item`,
        status: 'info',
        isClosable: true,
        position: 'bottom-right'
      })
    }
  }

  const handleListMove = (dragIndex: number, dropIndex: number) => {
    const dragUUID = resolveUUIDFromIndex(dragIndex)
    const dropUUID = resolveUUIDFromIndex(dropIndex)

    handleMove(dragUUID, dropUUID)
  }

  const handleBreadcrumbMove = (dragIndex: number, dropUUID: string) => {
    const dragUUID = resolveUUIDFromIndex(dragIndex)

    handleMove(dragUUID, dropUUID)
  }

  const handleUpload = async (
    acceptedFiles: File[],
    fileRejections: FileRejection[]
  ) => {
    toast.closeAll()

    if (fileRejections.length > 0) {
      for (const fileRejection of fileRejections) {
        toast({
          title: `Uploading ${fileRejection.file.name} rejected`,
          description: fileRejection.errors
            .map(error => error.message)
            .join(', '),
          status: 'error',
          isClosable: true,
          position: 'bottom-right'
        })
      }
    }

    const todayDate = new Date().toDateString()

    const files: {
      [uuid: string]: {
        name: string
        createdAt: string
        modifiedAt: string
        src: string
        mimeType: MimeType
        size: string
      }
    } = {}

    for (const [i, file] of acceptedFiles.entries()) {
      const {name, type, size} = file

      // convert size to kb or mb
      const kb = size / 1024
      const mb = kb / 1024
      const sizeString = mb > 1 ? `${mb.toFixed(2)} MB` : `${kb.toFixed(2)} KB`

      // check if file is bigger than 2mb if so toast a warning
      if (mb > 1.5) {
        toast({
          title: `${name} is a heavy file`,
          description: `Uploading a file bigger than 2mb might result in performence issues, please consider uploading a smaller file`,
          status: 'warning',
          isClosable: true,
          position: 'bottom-right'
        })
      } else {
        toast({
          title: `Uploading ${name}`,
          description: `${sizeString}`,
          status: 'info',
          isClosable: true,
          position: 'bottom-right'
        })
      }

      const fileName = name.split('.')[0]

      const src = await props.onUploadFile(file)

      files[uuidv4()] = {
        name: fileName,
        createdAt: todayDate,
        modifiedAt: todayDate,
        src,
        mimeType: type as MimeType,
        size: sizeString
      }

      toast({
        title: `Uploaded ${name} (${i + 1}/${acceptedFiles.length})`,
        status: 'success',
        isClosable: true,
        position: 'bottom-right'
      })
    }

    let newData

    for (const [uuid, file] of Object.entries(files)) {
      newData = update(data, {
        [rootUUID]: {
          childUUIDs: {$push: [uuid]}
        }
      })

      newData = update(newData, {
        [uuid]: {
          $set: file
        }
      })
    }

    if (newData) {
      updateData(newData)
    }
  }

  const handleFileInfoBoxUpdate = (details: FileDetails) => {
    const uuid = resolveUUIDFromIndex(selectedFiles[0])

    const todayDate = new Date().toDateString()

    // update details of uuid item
    const newData = update(data, {
      [uuid]: {
        name: {$set: details.fileName},
        description: {$set: details.description},
        modifiedAt: {$set: todayDate}
      }
    })

    updateData(newData)
  }

  const handleFinishFolderCreate = (name: string) => {
    const todayDate = new Date().toDateString()

    // Create new folder
    const uuid = uuidv4()

    let newData = update(data, {
      [rootUUID]: {
        childUUIDs: {$push: [uuid]}
      }
    })

    newData = {
      ...newData,
      [uuid]: {
        isFolder: true,
        name,
        createdAt: todayDate,
        modifiedAt: todayDate,
        childUUIDs: []
      }
    }

    // Update data with new folder
    updateData(newData)

    toast({
      title: `Created folder`,
      status: 'success',
      isClosable: true,
      position: 'bottom-right'
    })

    folderCreateContextModal.onClose()
  }

  const handleItemRename = (name: string) => {
    // Get uuid from selected item
    const uuid = resolveUUIDFromIndex(selectedFiles[0])
    const todayDate = new Date().toDateString()

    // Rename uuid and update modfiedAt
    const newData = update(data, {
      [uuid]: {
        name: {$set: name},
        modifiedAt: {$set: todayDate}
      }
    })

    updateData(newData)

    itemRenameContextModal.onClose()
  }

  //#region > Context Menu handlers
  const handleFileOpen = () => {
    // get uuid of selected file
    const uuid = resolveUUIDFromIndex(selectedFiles[0])
    const item = data[uuid]

    setContextMenu(null)

    if ((item as FinderFolderItem).isFolder) {
      switchParentNode(uuid)
    } else {
      if (mode === 'selector') {
        if (props.onSelectorSelect) {
          const fileItem = item as FinderFileItem
          // check if url is valid

          if (isValidHttpUrl(fileItem.src)) {
            props.onSelectorSelect(uuid, fileItem)
          }
        }
      } else {
        props.onItemOpen(uuid)
      }
    }
  }

  const handleFileRename = () => {
    setContextMenu(null)

    itemRenameContextModal.onOpen()
    //props.onItemRename(contextMenu.id)
  }

  const handleFileDelete = () => {
    setContextMenu(null)

    // Unset uuid from data and update data[rootUUID].childUUIDs
    const uuid = resolveUUIDFromIndex(selectedFiles[0])

    const newData = update(data, {
      $unset: [uuid],
      [rootUUID]: {
        childUUIDs: arr => arr.filter(_uuid => _uuid !== uuid)
      }
    })

    setSelectedFiles([])
    updateData(newData)
  }

  const handleNewFolder = () => {
    setContextMenu(null)
    folderCreateContextModal.onOpen()
  }
  //#endregion

  const prepareFileListItems = () => {
    // if parentNode is null tree.nodes is prepared else parentNode.children

    const children = (data[rootUUID] as FinderFolderItem).childUUIDs.map(
      uuid => ({
        uuid,
        ...data[uuid]
      })
    )

    return children.map(item => {
      let prefix: JSX.Element

      const folderItem = item as FinderFolderItem
      const fileItem = item as FinderFileItem

      if (folderItem.isFolder) {
        prefix = <Icon as={FaFolder} w={6} h={6} />
      } else {
        const {mimeType, src} = fileItem

        if (mimeType && mimeType.startsWith('image/')) {
          prefix = <Image w={6} h={6} src={src}></Image>
        } else if (mimeType && mimeType.startsWith('application/pdf')) {
          prefix = <Icon as={FaFilePdf} w={6} h={6} />
        } else {
          prefix = <Icon as={FaFile} w={6} h={6} />
        }
      }

      return {
        prefix,
        name: item.name,
        modifiedAt: item.modifiedAt,
        fileSize: fileItem.size,
        isFolder: folderItem.isFolder
      }
    })
  }

  const prepareFileInfoBoxProps = () => {
    const uuid = resolveUUIDFromIndex(selectedFiles[0])
    const item = data[uuid]

    const folderItem = item as FinderFolderItem
    const fileItem = item as FinderFileItem

    let props: FileInfoBoxProps = {
      onUpdate: handleFileInfoBoxUpdate,
      details: {
        fileName: item.name,
        fileType:
          (folderItem.isFolder && 'Folder') || MimeTypes[fileItem.mimeType],
        fileSize: fileItem.size,
        createdAt: item.createdAt,
        modifiedAt: item.modifiedAt,
        description: item.description
      }
    }

    if (folderItem.isFolder) {
      props['previewElement'] = <Icon as={FaFolder} h={200} w={200} />
    } else {
      const {mimeType, src, previewSrc} = fileItem

      if (mimeType && mimeType.includes('image/')) {
        props['previewImageSrc'] = src
      } else {
        if (previewSrc) {
          props['previewImageSrc'] = previewSrc
        } else {
          props['previewElement'] = <Icon as={FaFile} h={200} w={200} />
        }
      }
    }

    return props
  }

  // !BUG: useDropzone clashes with react-dnd dropzone inside of FileList component
  // This creates unnecessary re-rendering of this component when FileList dnd is used
  // (occures on drag and drop / click on rows)
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    draggedFiles
  } = useDropzone({
    onDrop: handleUpload,
    maxSize: 5000000
  })

  useEffect(() => {
    if (isDragActive && isDragAccept) {
      toast({
        title: `Drop to upload ${draggedFiles.length} file${
          draggedFiles.length > 1 ? 's' : ''
        }`,
        status: 'info',
        isClosable: true,
        position: 'bottom-right'
      })
    }
  }, [isDragActive, isDragAccept, draggedFiles.length])

  const finderExtras = (
    <>
      {contextMenu && (
        <Portal>
          <Box
            pos="absolute"
            top={contextMenu.spawnY}
            left={contextMenu.spawnX}
            zIndex="popover"
            w="3xs">
            <FileContextMenu
              items={
                contextMenu.id !== undefined
                  ? [
                      {
                        _type: 'ITEM',
                        content: <>{mode === 'selector' ? 'Select' : 'Open'}</>,
                        onItemClick: handleFileOpen
                      },
                      {
                        _type: 'ITEM',
                        content: <>{'Rename'}</>,
                        onItemClick: handleFileRename
                      },
                      {
                        _type: 'ITEM',
                        content: (
                          <HStack spacing={2}>
                            <DeleteIcon />
                            <Text>Delete</Text>
                          </HStack>
                        ),
                        onItemClick: handleFileDelete
                      }
                    ]
                  : [
                      {
                        _type: 'ITEM',
                        content: <>{'New folder'}</>,
                        onItemClick: handleNewFolder
                      }
                    ]
              }
            />
          </Box>
        </Portal>
      )}
      <ContextModal
        title="Create folder"
        inputPlaceholder="Your new folder"
        finishBtnLabel="Create"
        onFinish={handleFinishFolderCreate}
        isOpen={folderCreateContextModal.isOpen}
        onClose={folderCreateContextModal.onClose}
        onCancel={folderCreateContextModal.onClose}
      />
      <ContextModal
        title="Rename"
        inputPlaceholder="File name"
        inputText={data[resolveUUIDFromIndex(selectedFiles[0])].name}
        finishBtnLabel="Rename"
        onFinish={handleItemRename}
        isOpen={itemRenameContextModal.isOpen}
        onClose={itemRenameContextModal.onClose}
        onCancel={itemRenameContextModal.onClose}
      />
      <Drawer isOpen={showInfoCard} onClose={infoCardToggle}>
        <DrawerContent minW="fit-content">
          <DrawerCloseButton />
          <DrawerHeader>File info</DrawerHeader>
          <DrawerBody>
            <FileInfoBox {...prepareFileInfoBoxProps()} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )

  if (mode === 'selector' && props.onSelectorClose) {
    return (
      <>
        {finderExtras}
        <Modal
          isOpen={true}
          onClose={props.onSelectorClose}
          isCentered
          scrollBehavior="inside">
          <ModalOverlay />
          <ModalContent minW={'8xl'} minH="85vh">
            <ModalHeader>SnekFinder - Selector</ModalHeader>
            <ModalCloseButton />
            <Box px={4}>
              <Toolbar
                view="LIST"
                onViewToggleClick={() => null}
                onInfoToggleClick={infoCardToggle}
                breadcrumbs={parentNodeHistory}
                onBreadcrumbClick={switchParentNode}
                onBreadcrumbDnDMove={handleBreadcrumbMove}
                onUpload={handleUpload}
                onNewFolder={handleNewFolder}
              />
            </Box>

            <ModalBody as={Flex} flexDirection="column" pt={0}>
              <Box flexGrow={1} h="100vh">
                <Box
                  {...getRootProps()}
                  h={'100%'}
                  _focus={{outline: 'none'}}
                  onClick={e => e.stopPropagation()}
                  onContextMenu={e => {
                    e.preventDefault()
                  }}>
                  <input {...getInputProps()} />

                  <FileList
                    items={prepareFileListItems()}
                    onSelectionDoubleClick={handleFileOpen}
                    onSelectionChange={handleSelectionChange}
                    onContextMenu={handleContextMenu}
                    onDnD={handleListMove}
                    onContextMenuClose={() => setContextMenu(null)}
                  />
                </Box>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }

  return (
    <>
      {finderExtras}
      <Toolbar
        view="LIST"
        onViewToggleClick={() => null}
        onInfoToggleClick={infoCardToggle}
        breadcrumbs={parentNodeHistory}
        onBreadcrumbClick={switchParentNode}
        onBreadcrumbDnDMove={handleBreadcrumbMove}
        onUpload={handleUpload}
        onNewFolder={handleNewFolder}
      />

      <Box
        {...getRootProps()}
        h={'90%'}
        overflowY="auto"
        _focus={{outline: 'none'}}
        onClick={e => e.stopPropagation()}
        onContextMenu={e => {
          e.preventDefault()
        }}>
        <input {...getInputProps()} />

        <FileList
          items={prepareFileListItems()}
          onSelectionDoubleClick={handleFileOpen}
          onSelectionChange={handleSelectionChange}
          onContextMenu={handleContextMenu}
          onDnD={handleListMove}
          onContextMenuClose={() => setContextMenu(null)}
        />
      </Box>
    </>
  )
}

export default Finder
