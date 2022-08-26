import {installDependencies} from '../../installDependencies.js'

export default async (
  dependencies: string[],
  options: {
    cwd: string
  }
) => {
  installDependencies(dependencies, options)
}
