const { DEPENDENCIES_TO_SKIP, PACKAGE_JSON, LOCK_FILE, readFileToObject, setVersionNumber, writeObjectToFile } = require('./shared.js')

const packageJson = readFileToObject(PACKAGE_JSON)
const packageLockJson = readFileToObject(LOCK_FILE)

const packageLockJsonDependencies = packageLockJson.dependencies

Object.keys(packageLockJsonDependencies).forEach(lockDependency => {
  if (DEPENDENCIES_TO_SKIP.includes(lockDependency)) return

  const version = packageLockJsonDependencies[lockDependency].version

  setVersionNumber(packageJson.dependencies, lockDependency, version)
  setVersionNumber(packageJson.devDependencies, lockDependency, version)
})

console.log('🎁  saving updated package.json')

writeObjectToFile(PACKAGE_JSON, packageJson)