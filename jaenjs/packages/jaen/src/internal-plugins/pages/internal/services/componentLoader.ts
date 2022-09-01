import { IPageConnection, ITemplateConnection } from '../../connectors'

export const templateLoader = async (
  relativePath: string
): Promise<ITemplateConnection> => {
  //@ts-ignore
  return (await import(`${___JAEN_TEMPLATES___}/${relativePath}`)).default
}

export const pageLoader = async (
  relativePath: string
): Promise<IPageConnection> => {
  //@ts-ignore
  return (await import(`${___JAEN_PAGES___}/${relativePath}`)).default
}
