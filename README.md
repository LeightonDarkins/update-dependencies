<div align="center">
<h1>UPDATE DEPENDENCIES</h1>
<a href="https://www.emojione.com/emoji/1f982">
<img height="160" width="160" alt="scorpion" src="https://raw.githubusercontent.com/LeightonDarkins/update-dependencies/master/assets/scorpion.png" />
</a>

<p>This is a collection of node scripts and a bash helper to update an npm project's dependencies to their latest possible version.</p>

<hr />
</div>

## Usage
- "cd" to the root of one of your npm projects
- run `run.sh` from there i.e. `../path/to/script_archive/update_npm_dependencies/run.sh`

## Flow

The general flow is like this:

- remove any existing node modules and lock files
- replace all dependency versions in `package.json` with `latest`
  - if the `package.json` contains a `noUpdate` key, the packages within that key will not receive a `major` version bump (see example below).
    - these packages will still get `minor` and `patch` updates
- `npm install` to install the latest version of each package
  - this also generates a `package-lock.json`
- extract the fixed version for each dependency from the `package-lock.json` and insert them into the `package.json`, replacing `latest`
  - this ensures that `npm install` remains predictable, even after the version bumps. Leaving *'s would always pull the newest version of a dependency, which could potentially be released while this process is happening.
- compare a backup of the original `package.json` to the new `package.json` to indicate which depdencies have had thier version bumped.
- run `npm outdated` to show which packages are still out of date

## I've got updated dependencies, now what..?

After all of that is done, you'll just be left with a modified `package.json` and `package-lock.json`

Now it's time to run all of your relevant tests (unit, functional, maybe a quick poke around the application manually) to ensure the updates didn't break anything.

Assuming everything behaves itself, commit the changes to the `package.json` and `package-lock.json` to master and let the pipelines do their thing.

## noUpdate Example

```javascript
// package.json

{
  "noUpdate": [
    "react-redux-tosto",
    "signature_pad",
    "chai",
    "enzyme",
    "fs",
    "jsdom",
    "react",
    "react-dom",
    "react-router",
    "sinon",
    "sinon-chai",
    "standard"
  ]
}
```