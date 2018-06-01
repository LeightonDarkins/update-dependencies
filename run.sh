#!/bin/bash
set -e

scriptDir=$(dirname $0)

echo "🦂  Removing Node Modules"
rm -rf node_modules

echo "🦂  Updating all dependency versions to 'latest' in package.json"
node "$scriptDir/src/clearDependencies"

echo "🦂  Running npm install | to install the latest dependencies"
npm install

echo "🦂  Replacing 'latest' with new dependency versions"
node "$scriptDir/src/setConcreteVersionNumbers"

echo "🦂  Running npm update | to format package.json nicely"
npm update

echo "🦂  Showing which packages were updated. Deleting backup file."
node "$scriptDir/src/showUpdatedPackages"

echo "Time to run all of your tests and see if anything exploded 💥 💥 💥"
echo ""
echo "If everything looks good, ship it! 🚀'"
echo ""

echo "🦂  These packages are still out of date. But that's probably intentional 👍"
echo ""
npm outdated
