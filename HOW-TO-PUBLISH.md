# How to publish to npmjs

[npmjs](https://www.npmjs.com/)に本パッケージをpublishする手順について説明します。

以下のプログラムが入っていることを前提とします。

* git
* nodejs v14以降
* grunt-cli(`npm i -g grunt-cli`) or use `npx`

手順を以下に示します。

1. 本パッケージのクローン
本パッケージを`git clone`にて取得します。  
`git clone https://github.com/enebular/node-red`
1. 必要パッケージのインストール
以下のコマンドを実行します。
`npm i`
1. Versionの変更
Versionを変更します。本パッケージのVersionの規則は`XXX`とし、nの部分を加算していきます。
`node scripts/set-package-version.js XXX`
1. release用のパッケージファイル作成
以下のコマンドを実行します。
`npx grunt release`
1. Publish
パッケージファイルが作成されたフォルダに移動します。
`cd .dist/modules/`
生成されたスクリプトを実行します。
`sh publish.sh`

publishされるのは以下のパッケージです。

@uhuru/node-red
@uhuru/node-red-editor-api
@uhuru/node-red-editor-client
@uhuru/node-red-runtime
@uhuru/node-red-registry
