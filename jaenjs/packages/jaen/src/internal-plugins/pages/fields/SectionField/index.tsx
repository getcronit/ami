import {Box, Skeleton} from '@chakra-ui/react'
import deepmerge from 'deepmerge'
import * as React from 'react'
import {ISectionConnection} from '../../index'
import {useAppDispatch, useAppSelector, withRedux} from '../../internal/redux'
import {internalActions} from '../../internal/redux/slices'
import {useJaenPageContext} from '../../internal/services/page'
import {
  JaenSectionProvider,
  useJaenSectionContext
} from '../../internal/services/section'
import {IJaenSectionItem} from '../../types'
import {findSection} from '../../utils'
import {SectionAddPopover, SectionManagePopover} from './components/popovers'

type SectionPropsCallback = (args: {
  count: number
  totalSections: number
  section: IJaenSectionItem
}) => {[key: string]: any}

export interface SectionFieldProps {
  name: string // chapterName
  displayName: string
  sections: ISectionConnection[]
  as?: React.ComponentType<React.HTMLAttributes<HTMLElement>>
  sectionAs?: React.ComponentType<React.HTMLAttributes<HTMLElement>>
  props?: {[key: string]: any}
  sectionProps?: {[key: string]: any} | SectionPropsCallback
  className?: string
  style?: React.CSSProperties
  sectionClassName?: string
  sectionStyle?: React.CSSProperties
}

const SectionField = ({
  name,
  displayName,
  sections,
  ...rest
}: SectionFieldProps) => {
  const jaenSection = useJaenSectionContext()

  const sectionPath = (jaenSection?.path || []).concat({
    fieldName: name,
    sectionId: jaenSection?.id
  })

  const dispatch = useAppDispatch()

  const isEditing = useAppSelector(state => state.internal.status.isEditing)

  // sections to dictionary with key as section name
  const sectionsDict = sections.reduce<
    Record<
      string,
      {
        Component: ISectionConnection
        options: {displayName: string; name: string}
      }
    >
  >(
    (acc, Section) => ({
      ...acc,
      [Section.options.name]: {
        Component: Section,
        options: Section.options
      }
    }),
    {}
  )

  const {jaenPage} = useJaenPageContext()

  if (!jaenPage.id) {
    throw new Error(
      'JaenPage id is undefined! connectField must be used within a JaenPage'
    )
  }

  const staticSection = findSection(jaenPage.sections || [], sectionPath)

  const dynamicSection = useAppSelector(
    state =>
      findSection(
        state.internal.pages.nodes[jaenPage.id]?.sections || [],
        sectionPath
      ),
    (l, r) => {
      if (!l && !r) {
        return true
      }

      if (!l || !r) {
        return false
      }

      const shouldUpdate =
        JSON.stringify(Object.keys(l.items)) !==
        JSON.stringify(Object.keys(r.items))

      if (shouldUpdate) {
        return false
      }

      for (let i = 0; i < l.items.length; i++) {
        const lItem = l.items[i]
        const rItem = r.items[i]

        if (lItem.deleted || rItem.deleted) {
          return false
        }
      }

      return true
    }
  )

  const section = React.useMemo(() => {
    const mergedSection = deepmerge(staticSection || {}, dynamicSection || {}, {
      arrayMerge: (target, source, options) => {
        const destination = target.slice()

        source.forEach((item, index) => {
          if (typeof destination[index] === 'undefined') {
            // @ts-ignore
            destination[index] = options?.cloneUnlessOtherwiseSpecified(
              item,
              options
            )
            // @ts-ignore
          } else if (options.isMergeableObject(item)) {
            destination[index] = deepmerge(target[index], item, options)
          } else if (target.indexOf(item) === -1) {
            destination.push(item)
          }
        })
        return destination
      }
    })

    const sectionItemsDict: {
      [id: string]: IJaenSectionItem
    } = {}

    mergedSection?.items?.forEach(item => {
      sectionItemsDict[item.id] = item
    })

    const orderedSectionItems: IJaenSectionItem[] = []

    let ptrHead = mergedSection?.ptrHead

    while (ptrHead) {
      const item = sectionItemsDict[ptrHead]

      if (!item) {
        throw new Error(`ptrHead ${ptrHead} is not found in section items!`)
      }

      if (item.deleted) {
        continue
      }

      orderedSectionItems.push(item)

      ptrHead = item.ptrNext
    }

    mergedSection.items = orderedSectionItems

    return mergedSection
  }, [staticSection, dynamicSection])

  const handleSectionAdd = React.useCallback(
    (sectionItemType: string, between: [string | null, string | null]) => {
      dispatch(
        internalActions.section_add({
          pageId: jaenPage.id,
          sectionItemType,
          path: sectionPath,
          between
        })
      )
    },
    []
  )

  const handleSectionAppend = React.useCallback(
    (sectionName: string, id: string, ptrNext: string | null) => {
      handleSectionAdd(sectionName, [id, ptrNext || null])
    },
    []
  )

  const handleSectionPrepend = React.useCallback(
    (sectionName: string, id: string, ptrPrev: string | null) => {
      handleSectionAdd(sectionName, [ptrPrev || null, id])
    },
    []
  )

  const handleSectionDelete = React.useCallback(
    (id: string, between: [string | null, string | null]) => {
      dispatch(
        internalActions.section_remove({
          pageId: jaenPage.id,
          sectionId: id,
          path: sectionPath,
          between
        })
      )
    },
    []
  )

  const sectionsOptions = React.useMemo(
    () =>
      sections.map(s => ({
        name: s.options.name,
        displayName: s.options.displayName
      })),
    [sections]
  )

  const Wrapper = rest.as || Box

  return (
    <Wrapper {...rest.props} className={rest.className} style={rest.style}>
      {isEditing && !section.ptrHead && section.items.length === 0 ? (
        <SectionAddPopover
          key={`${section.ptrHead}-add-popover`}
          disabled={false}
          header={
            <>
              Add to <strong>{displayName}</strong>
            </>
          }
          sections={sectionsOptions}
          onSelect={name => handleSectionAdd(name, [null, null])}>
          <Box>
            <Skeleton h="100" />
          </Box>
        </SectionAddPopover>
      ) : (
        section.items.map((item, index) => {
          const {Component, options} = sectionsDict[item.type]

          const trigger = (
            <JaenSectionProvider key={item.id} path={sectionPath} id={item.id}>
              <Component />
            </JaenSectionProvider>
          )

          const SectionWrapper = rest.sectionAs || Box

          const sectionProps =
            typeof rest.sectionProps === 'function'
              ? rest.sectionProps({
                  count: index + 1,
                  totalSections: section.items.length,
                  section: item
                })
              : rest.sectionProps

          if (isEditing) {
            return (
              <SectionWrapper
                key={`${item.id}-manage-popover`}
                {...sectionProps}
                className={rest.sectionClassName}
                style={rest.sectionStyle}>
                <SectionManagePopover
                  key={item.id}
                  sections={sectionsOptions}
                  id={item.id}
                  ptrPrev={item.ptrPrev}
                  ptrNext={item.ptrNext}
                  header={options.displayName}
                  disabled={false}
                  onAppend={handleSectionAppend}
                  onPrepend={handleSectionPrepend}
                  onDelete={(id, ptrPrev, ptrNext) =>
                    handleSectionDelete(id, [ptrPrev || null, ptrNext || null])
                  }
                  trigger={trigger}
                />
              </SectionWrapper>
            )
          }

          return (
            <SectionWrapper
              key={`${item.id}-section`}
              {...sectionProps}
              className={rest.sectionClassName}
              style={rest.sectionStyle}>
              {trigger}
            </SectionWrapper>
          )
        })
      )}
    </Wrapper>
  )
}

export default withRedux(SectionField)
