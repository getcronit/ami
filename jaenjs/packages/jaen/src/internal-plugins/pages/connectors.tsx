import React from 'react'
import {IJaenConnection} from '../../types'
import {cleanObject} from '../../utils/helper'
import {isAuthenticated} from '../../utils/hooks/isAuthenticated'
import {withRedux} from './internal/redux'
import {useField} from './internal/services/field/hooks'
import {JaenPageProvider} from './internal/services/page'
import SEO from './internal/services/page/SEO'
import {
  SectionOptionsContext,
  useJaenSectionContext
} from './internal/services/section'
import {IJaenPageProps} from './types'
/**
 * @function connectPage Connects a gatsby page with Jaen.
 *
 * @see {@link connectTemplate} for more information.
 *
 * Warning: This component must be used to wrap a page, not a template.
 */
export const connectPage = <P extends IJaenPageProps>(
  Component: React.ComponentType<P>,
  options: {
    displayName: string
    children?: string[]
  }
) => {
  const MyComp: IJaenConnection<P, typeof options> = props => {
    const jaenPage = {
      id: props.pageContext.jaenPageId,
      ...props.data?.jaenPage
    }

    return (
      <>
        <SEO pageMeta={jaenPage.jaenPageMetadata} pagePath={props.path} />
        <JaenPageProvider
          jaenPage={jaenPage}
          jaenPages={props.data.allJaenPage?.nodes}>
          <Component {...props} />
        </JaenPageProvider>
      </>
    )
  }

  MyComp.options = options

  return MyComp
}
export type IPageConnection = ReturnType<typeof connectPage>

/**
 * @function connectTemplate Connects a gatsby template with Jaen.
 *
 * @param Component The template page to wrap
 * @param {JaenTemplateOptions} templateOptions Configuration for the page
 *
 * Warning: This component must be used in conjunction with the graphql`
 *   query($jaenPageId: String!) {
 *     ...JaenPageData
 *   }
 * ``
 *
 * @example
 * ```
 * export default connectTemplate(
 *   p => {
 *     return (
 *       <>
 *         <h1>Blog</h1>
 *         <p>{JSON.stringify(p)}</p>
 *       </>
 *     )
 *   },
 *   {
 *     displayName: 'Simple Blog Page'
 *   }
 * )
 *
 * export const query = graphql`
 *   query($jaenPageId: String!) {
 *     ...JaenPageData
 *   }
 * `
 * ```
 */
export const connectTemplate = <P extends IJaenPageProps>(
  Component: React.ComponentType<P>,
  options: ITemplateOptions
) => {
  const MyComp: IJaenConnection<P, typeof options> = props => {
    const jaenPage = {
      id: props.pageContext.jaenPageId,
      ...props.data?.jaenPage
    }

    return (
      <>
        <SEO pageMeta={jaenPage.jaenPageMetadata} pagePath={props.path} />
        <JaenPageProvider
          jaenPage={jaenPage}
          jaenPages={props.data.allJaenPage?.nodes}>
          <Component {...props} />
        </JaenPageProvider>
      </>
    )
  }

  MyComp.options = options

  return MyComp
}

export type ITemplateOptions = {
  displayName: string
  children: Array<string>
  isRootTemplate?: boolean
}
export type ITemplateConnection = ReturnType<typeof connectTemplate>

export type ISectionOptions = {displayName: string; name: string}

/**
 * @function connectSection Connects a section with Jaen.
 *
 * @param Component The component to wrap
 */
export const connectSection = <P extends {}>(
  Component: React.ComponentType<P>,
  options: ISectionOptions
) => {
  const MyComp: IJaenConnection<P, typeof options> = props => {
    const section = useJaenSectionContext()

    React.useEffect(() => {
      if (isAuthenticated() && section) {
        // clean up props to prevent circular reference, react items or other issues in redux store / local storage
        //section.register(cleanObject(props))
      }
    }, [])
    return (
      <SectionOptionsContext.Provider value={options}>
        <Component {...props} />
      </SectionOptionsContext.Provider>
    )
  }

  MyComp.options = options

  return MyComp
}
export type ISectionConnection = ReturnType<typeof connectSection>

export interface JaenFieldProps<IDefaultValue> {
  name: string
  displayName?: string
  defaultValue: IDefaultValue
  style?: React.CSSProperties
  className?: string
}

export interface FieldOptions<IValue, IDefaultValue, IProps = {}> {
  fieldType: string
  getAdminWidget?: (
    props: {
      field: {
        defaultValue: IDefaultValue
        value: IValue
        onChange: (value: IValue) => void
        name: string
      }
    } & IProps
  ) => JSX.Element
}

/**
 * @function connectField - Connects a field to Jaen.
 *
 * @param Component The component to wrap
 *
 * @example
 * ```
 * const T = connectField<string>(props => {
 *   const {name, defaultValue, style, className} = props.jaenField
 *   return null
 * })
 * ```
 */
export const connectField = <IValue, IDefaultValue = IValue, P = {}>(
  Component: React.ComponentType<
    React.PropsWithChildren<
      P & {
        jaenField: JaenFieldProps<IDefaultValue> & {
          staticValue?: IValue
          value?: IValue
          isEditing: boolean
          onUpdateValue: (value: IValue) => void
        }
      }
    >
  >,
  options: FieldOptions<IValue, IDefaultValue, P>
) => {
  const MyComp: IJaenConnection<
    P & JaenFieldProps<IDefaultValue>,
    typeof options
  > = props => {
    const RegisterHelper: React.FC = withRedux(() => {
      const field = useField<IValue>(props.name, options.fieldType)

      React.useEffect(() => {
        if (isAuthenticated()) {
          // clean up props to prevent circular reference, react items or other issues in redux store / local storage
          field.register(cleanObject(props))
        }
      }, [])

      return (
        <Component
          jaenField={{
            name: props.name,
            defaultValue: props.defaultValue,
            staticValue: field.staticValue,
            value: field.value,
            isEditing: field.isEditing,
            onUpdateValue: field.write,
            style: props.style,
            className: props.className
          }}
          {...props}
        />
      )
    })

    return <RegisterHelper />
  }

  MyComp.options = options

  return React.memo(MyComp)
}

export type IFieldConnection = ReturnType<typeof connectField>
