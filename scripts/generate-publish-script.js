#!/usr/bin/env node

const path = require("path");
const fs = require("fs-extra");
const should = require("should");

const LATEST = "2";

function generateScript() {
    return new Promise((resolve, reject) => {
        const packages = [
            "@uhuru/node-red-registry",
            "@uhuru/node-red-runtime",
            "@uhuru/node-red-editor-client",
            "@uhuru/node-red-editor-api",
            "@uhuru/node-red",
        ];
        const rootPackage = require(path.join(__dirname,"..","package.json"));
        const version = rootPackage.version;

        const versionParts = version.split(".");
        let updateNextToLatest = false;
        let tagArg = "";
        if (versionParts[0] !== LATEST) {
            tagArg = `--tag v${versionParts[0]}-maintenance`
        } else if (/-/.test(version)) {
            let tag = /.+-([a-z]+)\.?.*/.exec(version)[1] || 'beta'
            tagArg = `--tag ${tag}`
        } else {
            updateNextToLatest = true;
        }

        const lines = [];

        packages.forEach(name => {
            const tarName = name.replace(/@/,"").replace(/\//,"-")
            lines.push(`npm publish ${tarName}-${version}.tgz ${tagArg}\n`);
            if (updateNextToLatest) {
                lines.push(`npm dist-tag add ${name}@${version} next\n`);
            }
        })
        resolve(lines.join(""))
    });
}

if (require.main === module) {
    generateScript().then(output => {
        console.log(output);
    });
} else {
    module.exports = generateScript;
}
