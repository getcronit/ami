import {execSync} from 'child_process'

export function installDependencies(
  dependencies: string[],
  options: {
    cwd: string
  }
) {
  function readPackageJson(): {
    [key: string]: any
  } {
    return JSON.parse(
      execSync('cat package.json', {
        cwd: options.cwd
      }).toString()
    )
  }

  function addDependencies() {
    const packageJson = readPackageJson()

    const dependenciesString = dependencies.join(' ')

    const sfDependencies = packageJson.sfDependencies || {}
    const sfDependenciesNames = Object.keys(sfDependencies)

    const sfDependenciesString = sfDependenciesNames
      .map(dependency => `${dependency}@${sfDependencies[dependency]}`)
      .join(' ')

    if (sfDependenciesString || dependenciesString) {
      const newDependenciesString = dependenciesString.concat(
        ' ',
        sfDependenciesString
      )

      // Install dependencies and sfDependencies
      execSync(`yarn add --ignore-scripts ${newDependenciesString}`, {
        stdio: 'inherit',
        cwd: options.cwd
      })
    }
    return {sfDependenciesNames, sfDependencies}
  }

  function moveDependenciesInPackageJson(
    sfDependenciesNames: string[],
    sfDependencies: any
  ) {
    const packageJson = readPackageJson()

    const dependenciesNames = dependencies.map(dependency => {
      // check if dependency contains a version number
      const [name, ,] = dependency.split('@')

      return name
    }) as string[]

    const newDependenciesNames = dependenciesNames
      .concat(sfDependenciesNames)
      .filter((dependency, index, array) => array.indexOf(dependency) === index)

    // Move dependencies that are in packageJson.dependencies to packageJson.sfDependencies
    const dependenciesToMove = Object.keys(packageJson.dependencies).filter(
      dependency => {
        return newDependenciesNames.includes(dependency)
      }
    )

    for (const dependency of dependenciesToMove) {
      sfDependencies[dependency] = packageJson.dependencies[dependency]
      delete packageJson.dependencies[dependency]
    }

    packageJson.sfDependencies = sfDependencies

    // Write package.json
    execSync(`echo '${JSON.stringify(packageJson, null, 2)}' > package.json`, {
      cwd: options.cwd
    })
  }

  const {sfDependenciesNames, sfDependencies} = addDependencies()

  moveDependenciesInPackageJson(sfDependenciesNames, sfDependencies)
}
