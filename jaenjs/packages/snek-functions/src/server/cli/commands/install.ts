import {installDependencies} from '../../installDependencies'

export default async (
  dependencies: string[],
  options: {
    cwd: string
  }
) => {
  installDependencies(dependencies, options)
}
