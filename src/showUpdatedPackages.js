const { BACKUP_FILE, deleteFile, readFileToObject, PACKAGE_JSON } = require('./shared.js')

const packageJson = readFileToObject(PACKAGE_JSON)
const backup = readFileToObject(BACKUP_FILE)

console.log('  ✅  DEPENDENCIES\n')
Object.keys(packageJson.dependencies).forEach(packageJsonDependency => {
  Object.keys(backup.dependencies).forEach(backupDependency => {
    if (packageJsonDependency !== backupDependency) return

    const packageJsonVersion = packageJson.dependencies[packageJsonDependency].replace('^', '')
    const backupVersion = backup.dependencies[backupDependency].replace('^', '')

    if (packageJsonVersion === backupVersion) return

    console.log(`  ✅  ${packageJsonDependency} has been updated from ${backupVersion} to ${packageJsonVersion}`)
  })
})
console.log('\n')

let dependencyCount = 0

console.log('  ✅  DEV DEPENDENCIES\n')
Object.keys(packageJson.devDependencies).forEach(packageJsonDependency => {
  Object.keys(backup.devDependencies).forEach(backupDevDependency => {
    if (packageJsonDependency !== backupDevDependency) return

    const packageJsonVersion = packageJson.devDependencies[packageJsonDependency].replace('^', '')
    const backupVersion = backup.devDependencies[backupDevDependency].replace('^', '')

    if (packageJsonVersion === backupVersion) return

    dependencyCount++
    console.log(`  ✅  ${packageJsonDependency} has been updated from ${backupVersion} to ${packageJsonVersion}`)
  })
})
console.log('\n')

console.log(`🦂  ${dependencyCount} dependencies were updated\n`)

deleteFile(BACKUP_FILE)
