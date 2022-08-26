import {generateTemplate} from '../../generateTemplate.js'

export default async (
  rootPath: string,
  template: string | undefined,
  options: {
    name: string
  }
) => {
  generateTemplate(rootPath, template, options.name)
}
