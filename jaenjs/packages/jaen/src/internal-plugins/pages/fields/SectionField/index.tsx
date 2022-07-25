import { Box, Skeleton } from '@chakra-ui/react'
import deepmerge from 'deepmerge'
import * as React from 'react'
import { deepmergeArrayIdMerge } from '../../../../utils/helper'
import { ISectionConnection, ISectionOptions } from '../../index'
import { useAppDispatch, useAppSelector, withRedux } from '../../internal/redux'
import { internalActions } from '../../internal/redux/slices'
import { useJaenPageContext } from '../../internal/services/page'
import {
  JaenSectionProvider,
  useJaenSectionContext
} from '../../internal/services/section'
import { IJaenSectionItem, JaenSectionPath } from '../../types'
import { findSection } from '../../utils'
import { SectionAddPopover, SectionManagePopover } from './components/popovers'

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

  const sectionPath = React.useMemo(
    () =>
      (jaenSection?.path || []).concat({
        fieldName: name,
        sectionId: jaenSection?.id
      }),
    []
  )

  const dispatch = useAppDispatch()

  const isEditing = useAppSelector(state => state.internal.status.isEditing)

  // sections to dictionary with key as section name
  const sectionsDict = React.useMemo(() => {
    return sections.reduce<
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
  }, [sections])

  const {jaenPage} = useJaenPageContext()

  if (!jaenPage.id) {
    throw new Error(
      'JaenPage id is undefined! connectField must be used within a JaenPage'
    )
  }

  const staticSection = React.useMemo(
    () => findSection(jaenPage.sections || [], sectionPath),
    [jaenPage.sections, sectionPath]
  )

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
      arrayMerge: deepmergeArrayIdMerge
    })

    const sectionItemsDict: {
      [id: string]: IJaenSectionItem
    } = {}

    mergedSection?.items?.forEach(item => {
      sectionItemsDict[item.id] = item
    })

    const orderedSectionItems: IJaenSectionItem[] = []

    let ptrHead = mergedSection?.ptrHead

    let i = 0

    while (ptrHead && i < 50) {
      console.log(sectionItemsDict, ptrHead)
      const item = sectionItemsDict[ptrHead]

      if (!item) {
        throw new Error(`ptrHead ${ptrHead} is not found in section items!`)
      }

      i++

      ptrHead = item.ptrNext

      if (item.deleted) {
        continue
      }

      orderedSectionItems.push(item)
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
    (id: string, ptrPrev: string | null, ptrNext: string | null) => {
      dispatch(
        internalActions.section_remove({
          pageId: jaenPage.id,
          sectionId: id,
          path: sectionPath,
          between: [ptrPrev, ptrNext]
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
      {isEditing && section.items.length === 0 ? (
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
        <>
          {section.items.map((item, index) => {
            const {Component: Section, options} = sectionsDict[item.type]

            const SectionWrapper = rest.sectionAs || Box

            const sectionProps =
              typeof rest.sectionProps === 'function'
                ? rest.sectionProps({
                    count: index + 1,
                    totalSections: section.items.length,
                    section: item
                  })
                : rest.sectionProps

            return (
              <SectionWrapper
                key={item.id}
                {...sectionProps}
                className={rest.sectionClassName}
                style={rest.sectionStyle}>
                <LazySectionManagement
                  key={item.id}
                  isEditing={isEditing}
                  sectionPath={sectionPath}
                  Component={Section}
                  options={options}
                  allOptions={sectionsOptions}
                  itemId={item.id}
                  itemPtrPrev={item.ptrPrev}
                  itemPtrNext={item.ptrNext}
                  onAppend={handleSectionAppend}
                  onPrepend={handleSectionPrepend}
                  onDelete={handleSectionDelete}
                />
              </SectionWrapper>
            )
          })}
        </>
      )}
    </Wrapper>
  )
}

const LazySectionManagement = React.memo(
  (props: {
    isEditing: boolean
    sectionPath: JaenSectionPath
    Component: ISectionConnection
    options: ISectionOptions
    allOptions: ISectionOptions[]

    itemId: string
    itemPtrPrev: string | null
    itemPtrNext: string | null

    onDelete: (
      id: string,
      ptrPrev: string | null,
      ptrNext: string | null
    ) => void
    onAppend: (sectionName: string, id: string, ptrNext: string | null) => void
    onPrepend: (sectionName: string, id: string, ptrPrev: string | null) => void
  }) => {
    const item = (
      <JaenSectionProvider
        path={props.sectionPath}
        id={props.itemId}
        Component={props.Component}
      />
    )

    return (
      <SectionManagePopover
        trigger={item}
        sections={props.allOptions}
        disabled={!props.isEditing}
        id={props.itemId}
        ptrPrev={props.itemPtrPrev}
        ptrNext={props.itemPtrNext}
        header={props.options.displayName}
        onAppend={props.onAppend}
        onPrepend={props.onPrepend}
        onDelete={props.onDelete}
      />
    )
  }
)

export default withRedux(SectionField)
