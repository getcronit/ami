import * as React from 'react'

import Finder from './components/organisms/Finder'
import {
  FinderData,
  FinderFileItem,
  FinderFolderItem,
  FinderMode
} from './components/organisms/Finder/types'
import ImageViewer from './components/organisms/ImageViewer'
import {useSnekFinderContext} from './SnekFinderProvider'

export interface IUseSnekFinderArgs {
  mode: FinderMode
  onSelect?: (file: FinderFileItem) => void
}

export interface IUseSnekFinder {
  finderElement: JSX.Element
  toggleSelector: () => void
  toggleSelectorPreview: (fileId: string) => void
}

export const useSnekFinder = ({
  mode,
  ...props
}: IUseSnekFinderArgs): IUseSnekFinder => {
  const {backend, initData, rootFileId} = useSnekFinderContext()

  const [isSelectorOpen, setIsSelectorOpen] = React.useState(false)
  const [data, setData] = React.useState(initData)

  React.useEffect(() => {
    setData(initData)
  }, [initData])

  React.useEffect(() => {
    const fn = async () => {
      const index = await backend.readIndex()

      // check if data is different from index

      const newData = index || initData

      const isDataDifferent = JSON.stringify(newData) !== JSON.stringify(data)

      if (isDataDifferent) {
        setData(newData)
      }
    }

    fn()
  }, [isSelectorOpen])

  const [openFile, setOpenFile] =
    React.useState<{
      fileId: string
      previewType: 'IMAGE_VIEWER' | 'PDF_VIEWER'
    } | null>(null)

  const openedFileItem = React.useMemo(() => {
    if (!openFile) {
      return null
    }

    const {fileId} = openFile

    const item = data[fileId]

    if (!item) {
      return null
    } else if ((item as any).isFolder) {
      return null
    }

    return item as FinderFileItem
  }, [openFile, data])

  const handleDataChange = React.useCallback(
    async (newData: object) => {
      await backend.writeIndex(newData)

      setData(newData as FinderData)
    },
    [backend]
  )

  const handleFileOpen = React.useCallback(
    (fileId: string) => {
      const file = data[fileId]

      if (!(file as FinderFolderItem).isFolder) {
        const {mimeType} = file as FinderFileItem
        if (mimeType && mimeType.startsWith('image/')) {
          setOpenFile({fileId, previewType: 'IMAGE_VIEWER'})
        } else if (mimeType && mimeType.startsWith('application/pdf')) {
          setOpenFile({fileId, previewType: 'PDF_VIEWER'})
        }
      }
    },
    [data, setOpenFile]
  )

  const handleFinderClose = React.useCallback(() => {
    setOpenFile(null)
    setIsSelectorOpen(false)
  }, [setOpenFile, isSelectorOpen, setIsSelectorOpen])

  const toggleSelector = React.useCallback(() => {
    setIsSelectorOpen(!isSelectorOpen)
  }, [isSelectorOpen, setIsSelectorOpen])

  const toggleSelectorPreview = React.useCallback(
    (fileId: string) => {
      toggleSelector()
      handleFileOpen(fileId)
    },
    [toggleSelector]
  )

  const toggleSelectorSelect = React.useCallback(
    (_: string, file: FinderFileItem) => {
      props.onSelect && props.onSelect(file)
      toggleSelector()
    },
    [toggleSelector]
  )

  const finderElement = (
    <>
      {openFile && openedFileItem && (
        <>
          {openFile.previewType === 'IMAGE_VIEWER' && (
            <ImageViewer
              src={openedFileItem.src}
              name={openedFileItem.name}
              onUpdate={async ({blob, dataURL, fileName}) => {
                const fileId = openFile.fileId

                setData(data => {
                  if (fileName) {
                    return {
                      ...data,
                      [fileId]: {
                        ...data[fileId],
                        src: dataURL,
                        name: fileName
                      }
                    }
                  } else {
                    return {
                      ...data,
                      [fileId]: {
                        ...data[fileId],
                        src: dataURL
                      }
                    }
                  }
                })

                // upload blob to backend
                if (blob) {
                  const url = await backend.upload(
                    new File([blob], openedFileItem.name)
                  )

                  setData(data => {
                    const newData = {
                      ...data,
                      [fileId]: {
                        ...data[fileId],
                        src: url
                      }
                    }

                    backend.writeIndex(newData)

                    return newData
                  })
                }
              }}
              onClose={() => setOpenFile(null)}
            />
          )}
          {/* {openFile.previewType === 'PDF_VIEWER' && (
            <PdfViewer
              src={openedFileItem.src}
              overlay
              toolbar
              onClose={() => setOpenFile(null)}
            />
          )} */}
        </>
      )}
      {!(mode === 'selector' && !isSelectorOpen) && (
        <Finder
          data={data}
          mode={mode}
          rootUUID={rootFileId}
          onItemOpen={handleFileOpen}
          onDataChanged={handleDataChange}
          onSelectorClose={handleFinderClose}
          onSelectorSelect={toggleSelectorSelect}
          onUploadFile={backend.upload}
        />
      )}
    </>
  )

  return {
    finderElement,
    toggleSelector,
    toggleSelectorPreview
  }
}
