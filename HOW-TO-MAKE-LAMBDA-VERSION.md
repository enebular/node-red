# How to publish to npmjs

1. Remove monaco build files in Gruntfile.js

```
'monaco/dist/**',
'monaco/types/extraLibs.js',
'monaco/style.css',
'monaco/monaco-bootstrap.js'
``

2. Remove additional nodes

```  
"node-red-dashboard": "^3.1.7",
"node-red-node-email": "^1.15.1",
"node-red-node-tail": "^0.3.2"
```
