const fs = require('fs')

const packageJson = readFileToObject('package.json')
const DEPENDENCIES_TO_SKIP = packageJson.noUpdate ? packageJson.noUpdate : []

function setVersionNumber (dependencies, lockDependency, version) {
  Object.keys(dependencies).forEach(dependency => {
    if (lockDependency !== dependency) return

    dependencies[lockDependency] = `^${version}`
  })
}

function readFileToObject (filename) {
  const buffer = fs.readFileSync(filename)
  return JSON.parse(buffer)
}

function writeObjectToFile (filename, object) {
  fs.writeFileSync(filename, JSON.stringify(object))
}

function deleteFile (filename) {
  fs.unlinkSync(filename)
}

function wipeDependencies (dependencies) {
  Object.keys(dependencies).forEach(dependency => {
    if (DEPENDENCIES_TO_SKIP.includes(dependency)) return

    dependencies[dependency] = 'latest'
  })
}

module.exports = {
  DEPENDENCIES_TO_SKIP,
  PACKAGE_JSON: 'package.json',
  LOCK_FILE: 'package-lock.json',
  BACKUP_FILE: 'package.bak.json',
  setVersionNumber,
  readFileToObject,
  writeObjectToFile,
  wipeDependencies,
  deleteFile
}
