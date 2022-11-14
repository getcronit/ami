import {AddIcon, DeleteIcon, ViewIcon} from '@chakra-ui/icons'
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  HStack,
  IconButton,
  Stack,
  Tooltip
} from '@chakra-ui/react'
import {FaGlobeEurope} from '@react-icons/all-files/fa/FaGlobeEurope'
import * as React from 'react'
import {JaenPageProvider} from '../../../../internal/services/page'
import {IJaenPage} from '../../../../types'
import {
  pageUpdateValidation,
  usePageManager
} from '../../providers/PageManagerProvider'
import {ContentValues, PageContent} from './PageContent'
import PageTree, {PageTreeProps} from './PageTree'

export interface PagesTabProps extends PageTreeProps {
  getPage: (id: string) => IJaenPage | null
  onPageUpdate: (id: string, values: ContentValues) => void
}

/**
 * PagesTab is a component for displaying the page tree with content in the dashboard.
 * Display PageTree and PageContent next to each other.
 */
const PagesTab = () => {
  const manager = usePageManager()
  const rootPageId = manager.rootPageId

  const landingPage = React.useMemo(() => manager.onGet(rootPageId), [
    rootPageId
  ]) as IJaenPage

  const [selection, setSelection] = React.useState<IJaenPage>(landingPage)

  const relativeRootPageId = selection.id === rootPageId ? null : selection.id

  const isSelectionLandingPage = selection?.id === rootPageId

  const onSelect = (id: string | null) => {
    const page = (id && manager.onGet(id)) || landingPage

    setSelection(page)
  }

  const handlePageUpdate = React.useCallback(
    (values: ContentValues) => {
      selection && manager.onUpdate(selection.id, values)
    },
    [selection]
  )

  const handleItemDelete = React.useCallback(() => {
    const id = selection && selection.id

    setSelection(landingPage)

    id && manager.onDelete(id)
  }, [selection])

  const selectedTemplate = React.useMemo(
    () => manager.templates.find(t => t.name === selection?.template) || null,
    [manager.templates, selection?.template]
  )

  const pageTitle = selection?.jaenPageMetadata.title || 'Page'

  const templatesForPage = React.useMemo(
    () => manager.templates.find(t => t.name === selection?.template),
    [manager.templates, selection?.template]
  )

  const disableAdd = templatesForPage
    ? templatesForPage.children.length === 0
    : false

  const disableDelete = !selection?.template || isSelectionLandingPage
  const disableNavigate = !selection

  return (
    <>
      <HStack h={'85vh'} align="start">
        <Stack w="20%">
          <ButtonGroup size="sm">
            <Tooltip
              label={
                disableAdd
                  ? `Cannot add child page to ${pageTitle}`
                  : `Add child page to ${pageTitle}`
              }
              shouldWrapChildren>
              <IconButton
                aria-label="Add a subpage to the selected page"
                icon={<AddIcon />}
                disabled={disableAdd}
                onClick={() => manager.onToggleCreator(relativeRootPageId)}
              />
            </Tooltip>

            <Tooltip
              label={
                disableDelete
                  ? `Cannot delete ${pageTitle}`
                  : `Delete ${pageTitle}`
              }
              shouldWrapChildren>
              <IconButton
                aria-label="Delete the selected page"
                icon={<DeleteIcon />}
                onClick={handleItemDelete}
                disabled={disableDelete}
              />
            </Tooltip>

            <Tooltip label={`Navigate to ${pageTitle}`} shouldWrapChildren>
              <IconButton
                aria-label="Navigate to the page"
                icon={<ViewIcon />}
                onClick={() => manager.onNavigate(selection?.id!)}
                disabled={disableNavigate}
              />
            </Tooltip>
          </ButtonGroup>

          <Divider />

          <Button
            leftIcon={<FaGlobeEurope />}
            w="full"
            justifyContent="start"
            borderWidth={'1px'}
            borderRadius="lg"
            _focus={{
              boxShadow: 'none'
            }}
            p={4}
            fontSize="sm"
            variant="ghost"
            bg={isSelectionLandingPage ? 'gray.50' : undefined}
            onClick={e => {
              // differentiate between single click and double click
              if (e.detail === 1) {
                onSelect(rootPageId)
              } else {
                manager.onNavigate(rootPageId)
              }
            }}>
            Landing Page
          </Button>
          <PageTree
            selection={selection?.id}
            items={manager.tree}
            templates={manager.templates}
            onItemSelect={onSelect}
            onItemDoubleClick={manager.onNavigate}
            onItemCreate={manager.onCreate}
            onItemDelete={manager.onDelete}
            onItemMove={manager.onMove}
          />
        </Stack>

        <Divider orientation="vertical" />

        <Box flex={1}>
          {selection && (
            <JaenPageProvider jaenPage={selection} unregisterFields={false}>
              <PageContent
                key={selection.id}
                template={selectedTemplate}
                jaenPageId={selection.id}
                publishedAt={selection.jaenPageMetadata.datePublished}
                values={{
                  title: selection.jaenPageMetadata.title,
                  slug: selection.slug || 'root',
                  description: selection.jaenPageMetadata.description,
                  image: selection.jaenPageMetadata.image,
                  excludedFromIndex: selection.excludedFromIndex
                }}
                onSubmit={handlePageUpdate}
                externalValidation={(name, value) => {
                  return pageUpdateValidation({
                    name,
                    value,
                    parentId: selection.parent?.id,
                    treeItems: manager.tree
                  })
                }}
              />
            </JaenPageProvider>
          )}
        </Box>
      </HStack>
    </>
  )
}

export default PagesTab
