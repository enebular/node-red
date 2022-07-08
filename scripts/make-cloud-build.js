#!/usr/bin/env node

const path = require('path')
const fs = require('fs-extra')

const rootPackage = path.join(__dirname, '..', 'package.json')
const packages = ['node-red']

const gruntFilePath = path.join(__dirname, '..', 'Gruntfile.js')

const packagesToRemove = [
  'node-red-dashboard',
  'node-red-node-email',
  'node-red-node-tail'
]

const gruntFileLinesToRemove = [
  'monaco/dist/**',
  'monaco/types/extraLibs.js',
  'monaco/style.css',
  'monaco/monaco-bootstrap.js'
]

function cleanUpPackage(packageFile) {
  let modulePackage = require(packageFile)
  packagesToRemove.forEach((package) => {
    delete modulePackage.dependencies[package]
  })
  return fs.writeJSON(packageFile, modulePackage, { spaces: 4 })
}

async function cleanupGruntFile() {
  let gruntFile = await fs.readFile(gruntFilePath, 'utf8')
  gruntFile = gruntFile.split('\n')
  gruntFile = gruntFile.filter((line) => {
    return !gruntFileLinesToRemove.some((pattern) => {
      return line.includes(pattern)
    })
  })
  gruntFile = gruntFile.join('\n')
  return fs.writeFile(gruntFilePath, gruntFile)
}

let promises = []
promises.push(cleanUpPackage(rootPackage))
packages.forEach((package) => {
  promises.push(
    cleanUpPackage(
      path.join(__dirname, '../packages/node_modules', package, 'package.json')
    )
  )
})

promises.push(cleanupGruntFile())

Promise.all(promises).catch((e) => {
  console.log(e)
  process.exit(1)
})
