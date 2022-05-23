import {AddIcon, DeleteIcon, ViewIcon} from '@chakra-ui/icons'
import {Box, Divider, Flex} from '@chakra-ui/layout'
import {ButtonGroup, IconButton} from '@chakra-ui/react'
import * as React from 'react'
import {ContentValues, PageContent} from './PageContent'
import PageTree, {PageTreeProps} from './PageTree'
import {JaenPageProvider} from '../../../../internal/services/page'
import {IJaenPage} from '../../../../types'

export interface PagesTabProps extends PageTreeProps {
  getPage: (id: string) => IJaenPage | null
  onPageUpdate: (id: string, values: ContentValues) => void
}

/**
 * PagesTab is a component for displaying the page tree with content in the dashboard.
 * Display PageTree and PageContent next to each other.
 */
const PagesTab = (props: PagesTabProps) => {
  const [selection, setSelection] = React.useState<IJaenPage | null>(null)

  const onSelect = (id: string | null) => {
    if (id !== null) {
      const page = props.getPage(id)
      setSelection(page)
    } else {
      setSelection(null)
    }
  }

  const handlePageUpdate = React.useCallback(
    (values: ContentValues) => {
      alert(`Page updated: ${JSON.stringify(values)}`)
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

  return (
    <Flex h={'85vh'}>
      <Box w={selection ? '30%' : '100%'}>
        <>
          <ButtonGroup size="sm" pb="4">
            <IconButton
              aria-label="Add a subpage to the selected page"
              icon={<AddIcon />}
              disabled
            />
            <IconButton
              aria-label="Delete the selected page"
              icon={<DeleteIcon />}
              onClick={handleItemDelete}
              disabled={!selection?.template}
            />
            <IconButton
              aria-label="Navigate to the page"
              icon={<ViewIcon />}
              onClick={() => props.onItemDoubleClick(selection?.id!)}
              disabled={!selection}
            />
          </ButtonGroup>
          <PageTree
            items={props.items}
            templates={props.templates}
            creatorFallbackTemplates={props.creatorFallbackTemplates}
            onItemSelect={onSelect}
            onItemDoubleClick={props.onItemDoubleClick}
            onItemCreate={props.onItemCreate}
            onItemDelete={handleItemDelete}
            onItemMove={props.onItemMove}
          />
        </>
      </Box>

      <Divider orientation="vertical" />

      <Box flex={1}>
        {selection && (
          <JaenPageProvider jaenPage={selection} unregisterFields={false}>
            <PageContent
              key={selection.id}
              template={selectedTemplate}
              jaenPageId={selection.id}
              values={{
                title: selection.jaenPageMetadata.title,
                slug: selection.slug,
                description: selection.jaenPageMetadata.description,
                image: selection.jaenPageMetadata.image,
                excludedFromIndex: selection.excludedFromIndex
              }}
              onSubmit={handlePageUpdate}
            />
          </JaenPageProvider>
        )}
      </Box>
    </Flex>
  )
}

export default PagesTab
