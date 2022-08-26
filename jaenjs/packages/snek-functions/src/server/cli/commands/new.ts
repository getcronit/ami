import {generateTemplate} from '../../generateTemplate.js'

export default async (
  rootPath: string,
  template: string,
  options: {
    name: string
  }
) => {
  generateTemplate(rootPath, template, options.name)
}
