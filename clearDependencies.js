const {
  DEPENDENCIES_TO_SKIP,
  PACKAGE_JSON,
  BACKUP_FILE,
  readFileToObject,
  writeObjectToFile,
  wipeDependencies,
  LOCK_FILE } = require('./shared.js')

console.log('‼️   The following dependencies will not update to a new major version:\n')

DEPENDENCIES_TO_SKIP.forEach(dependency => {
  console.log(`  🔴   ${dependency}`)
})

console.log('')

const packageJson = readFileToObject(PACKAGE_JSON)

console.log(`📦  backing up ${PACKAGE_JSON} to ${BACKUP_FILE}\n`)

writeObjectToFile(BACKUP_FILE, packageJson)

console.log(`💥  deleting ${LOCK_FILE}\n`)

console.log('💥  wiping Dependency versions...\n')

wipeDependencies(packageJson.dependencies)

console.log('💥  wiping DevDependency versions...\n')

wipeDependencies(packageJson.devDependencies)

console.log('🎁  saving updated package.json')

writeObjectToFile(PACKAGE_JSON, packageJson)
