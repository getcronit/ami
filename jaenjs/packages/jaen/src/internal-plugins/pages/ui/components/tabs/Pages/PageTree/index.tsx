import Tree, {
  ItemId,
  moveItemOnTree,
  mutateTree,
  RenderItemParams,
  TreeDestinationPosition,
  TreeItem,
  TreeSourcePosition
} from '@atlaskit/tree'
import {AddIcon, DeleteIcon, LockIcon} from '@chakra-ui/icons'
import {
  Badge,
  Box,
  Flex,
  HStack,
  MenuGroup,
  MenuItem,
  MenuList,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import {motion} from 'framer-motion'
import * as React from 'react'
import {FaFile, FaFolderMinus, FaFolderPlus} from 'react-icons/fa'
import {IJaenTemplate} from '../../../../../types'
import {ContextMenu} from '../../../ContextMenu'
import {CreateValues, PageCreator} from '../PageCreator'
import {TreeConverter} from './treeconverter'

export type Items = {
  [id: string]: {
    data: {
      title: string
      slug: string
      template: Omit<IJaenTemplate, 'children'> | null
      deleted?: true
    }
    isRootItem?: true
    children: string[]
    parent: string | null
  }
}

export type PageTreeProps = {
  items: Items
  defaultSelection?: string
  templates: IJaenTemplate[]
  creatorFallbackTemplates: IJaenTemplate['children']
  onItemSelect: (id: string | null) => void
  onItemDoubleClick: (id: string) => void
  onItemCreate: (parentId: string | null, values: CreateValues) => void
  onItemDelete: (id: string) => void
  onItemMove: (
    id: string,
    oldParentId: string | null,
    newParentId: string | null
  ) => void
}

const PADDING_PER_LEVEL = 16
const PreTextIcon = styled.span`
  display: inline-block;
  width: 16px;
  justify-content: center;
  cursor: pointer;
  margin-right: 5px;
`

const PageTree: React.FC<PageTreeProps> = ({
  items,
  templates,
  creatorFallbackTemplates,
  ...props
}) => {
  const greyOverlay = useColorModeValue('gray.50', 'gray.700')
  const orange = useColorModeValue('orange', 'orange.500')

  const textColor = useColorModeValue('gray.700', 'gray.300')

  // convert items to a set
  const [tree, setTree] = React.useState(TreeConverter(items))

  const defaultSelection = React.useMemo(() => {
    if (props.defaultSelection && tree.items[props.defaultSelection]) {
      return props.defaultSelection
    }

    return tree.rootId.toString()
  }, [tree.rootId, props.defaultSelection])

  const [selectedItem, setSelectedItem] = React.useState<string>(
    defaultSelection
  )

  const creatorTemplates = React.useMemo(() => {
    return (
      templates.find(
        template => template.name === tree.items[selectedItem]?.data?.template
      )?.children || creatorFallbackTemplates
    )
  }, [
    templates,
    creatorFallbackTemplates,
    tree.items[selectedItem]?.data?.template
  ])

  const rootTemplates = React.useMemo(() => {
    return templates.filter(t => t.isRootTemplate)
  }, [templates])

  const pageCreatorDisclosure = useDisclosure()

  const handleItemCreate = (values: CreateValues) => {
    // Check if the slug is already taken of a sibling
    const {title, slug, template} = values

    const parentId = selectedItem !== tree.rootId ? selectedItem : null

    props.onItemCreate(parentId, values)

    // Close the modal
    pageCreatorDisclosure.onClose()

    //Add the new item to the tree
    const newItemId = `${selectedItem}/${slug}`

    const newItem = {
      id: newItemId,
      data: {
        title,
        slug,
        template: template.name
      },
      children: [],
      parent: selectedItem
    }

    const newTree = {...tree}

    newTree.items[newItemId] = newItem

    //Update parent children
    newTree.items[selectedItem].isExpanded = true
    newTree.items[selectedItem].children.push(newItemId)

    //setTree(newTree)
    //handleSelectItem(newItemId)
  }

  const handleItemDelete = (id: string) => {
    props.onItemDelete(id)

    // Remove the item from the tree
    const item = tree.items[id]

    if (item) {
      const parentId: string = (item as any).parent || tree.rootId

      // Remove the item from the parent children
      tree.items[parentId].children = tree.items[parentId].children.filter(
        childId => childId !== id
      )

      // Remove the item from the tree
      delete tree.items[id]

      handleSelectItem(parentId)

      setTree(tree)
    }
  }

  React.useEffect(() => {
    setTree(TreeConverter(items))
  }, [items])

  const handleSelectItem = (id?: string | null) => {
    setSelectedItem(id || defaultSelection)
    props.onItemSelect(id || null)
  }

  const handleContainerClick = (event: React.MouseEvent) => {
    event.preventDefault()

    if (event.target === event.currentTarget) {
      handleClick(event, null)
    }
  }

  const handleClick = (event: React.MouseEvent, id: string | null) => {
    //event.stopPropagation()

    handleSelectItem(id)

    // switch (event.detail) {
    //   case 1:
    //     handleSelectItem(id)
    //   case 2:
    //     if (id) {
    //       alert('ad')
    //       props.onItemDoubleClick(id)
    //     }
    // }
  }

  const getIcon = (
    item: TreeItem,
    onExpand: (itemId: ItemId) => void,
    onCollapse: (itemId: ItemId) => void
  ) => {
    const hasChildren = item.children.some(
      childId => tree.items[childId] && !tree.items[childId].data.deleted
    )

    if (hasChildren) {
      return item.isExpanded ? (
        <PreTextIcon onClick={() => onCollapse(item.id)}>
          <FaFolderMinus />
        </PreTextIcon>
      ) : (
        <PreTextIcon onClick={() => onExpand(item.id)}>
          <FaFolderPlus />
        </PreTextIcon>
      )
    }
    return (
      <PreTextIcon>
        <FaFile />
      </PreTextIcon>
    )
  }

  const renderItem = ({
    item,
    onExpand,
    onCollapse,
    provided
  }: RenderItemParams) => {
    const id = item.id.toString()
    const isSelected = id === selectedItem

    // Emotion box wrapper with props for the item
    // If selectedItem === item.id change background color and backdrop shadow
    // Use custom type
    const ItemBox = styled(Box)`
      border-bottom: 1px solid
        ${
          item.isExpanded && item.children && item.children.length > 0
            ? '#eaeaea'
            : 'transparent'
        };
      }
    `

    const handleItemBoxClick = (event: React.MouseEvent) => {
      handleClick(event, id)
    }

    //> ItemInfo and call
    const GenerateItemBadges = () => {
      const isLocked = !item.data.template
      const hasChanges = item.data.hasChanges

      return (
        <HStack align="center" justify="space-between">
          {isLocked && <LockIcon />}
          {hasChanges && (
            <Badge
              bg={orange}
              color={textColor}
              fontSize="xs"
              fontWeight="semibold"
              ml={2}>
              Changes
            </Badge>
          )}
        </HStack>
      )
    }

    const MotionBox = motion(ItemBox)

    const renderedItem = (
      <MotionBox
        bg={isSelected ? greyOverlay : 'transparent'}
        whileHover={{scale: 1.005}}
        p={2}
        onClick={handleItemBoxClick}
        onDoubleClick={() => props.onItemDoubleClick(id)}
        onContextMenu={handleItemBoxClick}>
        <Flex>
          <Box flex={1}>
            {getIcon(item, onExpand, onCollapse)}
            {item.data ? item.data.title : ''}
          </Box>

          {GenerateItemBadges()}
        </Flex>
      </MotionBox>
    )

    // Framer Motion wrapper for the item

    return (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{
          ...provided.draggableProps.style,
          top: 'auto !important',
          left: 'auto !important'
        }}>
        {!(item.data as any).deleted && renderedItem}
      </div>
    )
  }

  const onExpand = (itemId: ItemId) => {
    setTree(mutateTree(tree, itemId, {isExpanded: true}))
  }

  const onCollapse = (itemId: ItemId) => {
    setTree(mutateTree(tree, itemId, {isExpanded: false}))
  }

  const onDragEnd = (
    source: TreeSourcePosition,
    destination?: TreeDestinationPosition
  ) => {
    if (!destination) {
      return
    }

    const movedItemId = tree.items[source.parentId].children[
      source.index
    ].toString()

    const dstId = destination.parentId.toString()

    const newSlug = tree.items[movedItemId].data.slug

    const validSlug = !tree.items[dstId].children.some(childId => {
      const {slug, deleted} = tree.items[childId].data

      if (slug === newSlug && !deleted) {
        return true
      }
    })

    const dstTemplate = tree.items[dstId]?.data?.template
    const movedTemplate = tree.items[movedItemId]?.data?.template

    // Check movedItemId template is in dstId template children
    const childTemplates = templates.find(
      template => template.name === dstTemplate
    )?.children

    if (childTemplates && childTemplates.some(e => e.name === movedTemplate)) {
      if (validSlug) {
        const newTree = moveItemOnTree(tree, source, destination)

        // @ts-ignore
        //newTree.items[movedItemId].parent = destination.parentId

        setTree(mutateTree(tree, destination.parentId, {isExpanded: true}))
        handleSelectItem(movedItemId)

        props.onItemMove(
          movedItemId,
          // @ts-ignore
          tree.items[movedItemId].parent === tree.rootId.toString()
            ? null
            : // @ts-ignore
              tree.items[movedItemId].parent,
          dstId === tree.rootId.toString() ? null : dstId
        )
      }
    }
  }

  return (
    <>
      <ContextMenu<HTMLDivElement>
        renderMenu={() => (
          <MenuList zIndex="popover">
            <MenuGroup title="Page">
              <MenuItem
                icon={<AddIcon />}
                onClick={() => pageCreatorDisclosure.onOpen()}>
                Add
              </MenuItem>
              {tree.items[selectedItem]?.data?.template && (
                <>
                  <MenuItem
                    icon={<DeleteIcon />}
                    onClick={() => handleItemDelete(selectedItem)}>
                    Delete
                  </MenuItem>
                </>
              )}
            </MenuGroup>
          </MenuList>
        )}>
        {ref => (
          <Box
            ref={ref}
            h="75vh"
            overflowY={'scroll'}
            overflowX="hidden"
            onClick={handleContainerClick}
            onContextMenu={handleContainerClick}>
            <Tree
              tree={tree}
              renderItem={renderItem}
              onExpand={onExpand}
              onCollapse={onCollapse}
              onDragEnd={onDragEnd}
              offsetPerLevel={PADDING_PER_LEVEL}
              isDragEnabled
              isNestingEnabled
            />
          </Box>
        )}
      </ContextMenu>
      <PageCreator
        finalFocusRef={null as any}
        values={{
          title: '',
          slug: '',
          template: {
            name: '',
            displayName: ''
          }
        }}
        templates={
          selectedItem === 'SitePage' ? rootTemplates : creatorTemplates
        }
        isOpen={pageCreatorDisclosure.isOpen}
        onClose={pageCreatorDisclosure.onClose}
        onSubmit={handleItemCreate}
        externalValidation={(name, value) => {
          if (name === 'slug') {
            const siblings = tree.items[selectedItem].children

            const slugTaken = siblings.some(
              siblingId => tree.items[siblingId]?.data?.slug === value
            )

            if (slugTaken) {
              return 'Slug is already taken'
            }
          }
        }}
      />
    </>
  )
}

export default PageTree
