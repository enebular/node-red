# How to make lambda version of node-red

1. Use command to make lite version of node-red
`node scripts/make-cloud-build`
1. Change version of package.json
`node scripts/set-package-version.js X.X.X-c.x`
1. Prepare packages to release
`npx grunt release`
1. Publish
`cd .dist/modules`
`sh publish.sh`
