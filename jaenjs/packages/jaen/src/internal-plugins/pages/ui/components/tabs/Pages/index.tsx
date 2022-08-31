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
const PagesTab = (props: PagesTabProps) => {
  const landingPageId = 'JaenPage /'

  const [selection, setSelection] = React.useState<IJaenPage | null>(
    props.getPage(landingPageId)
  )

  const isSelectionLandingPage = selection?.id === landingPageId

  const onSelect = (id: string | null) => {
    const page = props.getPage(id || landingPageId)

    setSelection(page)
  }

  const handlePageUpdate = React.useCallback(
    (values: ContentValues) => {
      selection && props.onPageUpdate(selection.id, values)
    },
    [selection]
  )

  const handleItemDelete = React.useCallback(() => {
    const id = selection && selection.id

    setSelection(null)

    id && props.onItemDelete(id)
  }, [selection])

  const selectedTemplate = React.useMemo(
    () => props.templates.find(t => t.name === selection?.template) || null,
    [props.templates, selection?.template]
  )

  const pageTitle = selection?.jaenPageMetadata.title || 'Page'

  const disableAdd = !selectedTemplate || isSelectionLandingPage
  const disableDelete = !selection?.template || isSelectionLandingPage
  const disableNavigate = !selection

  return (
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
              onClick={() => props.onItemDoubleClick(selection?.id!)}
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
              onSelect(landingPageId)
            } else {
              props.onItemDoubleClick(landingPageId)
            }
          }}>
          Landing Page
        </Button>
        <PageTree
          selection={selection?.id}
          items={props.items}
          templates={props.templates}
          creatorFallbackTemplates={props.creatorFallbackTemplates}
          onItemSelect={onSelect}
          onItemDoubleClick={props.onItemDoubleClick}
          onItemCreate={props.onItemCreate}
          onItemDelete={handleItemDelete}
          onItemMove={props.onItemMove}
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
            />
          </JaenPageProvider>
        )}
      </Box>
    </HStack>
  )
}

export default PagesTab
