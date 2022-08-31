#!/usr/bin/env sh

# エラー時は停止
set -e

# ビルド出力ディレクトリに移動
cd dist

# カスタムドメインにデプロイする場合
# echo 'www.example.com' > CNAME

git init
git checkout -b main
git add -A
git commit -m 'deploy'

# https://<USERNAME>.github.io にデプロイする場合
git push -f git@github.com:ktaroabobon/ifcjs-react.git main:gh-pages

# https://<USERNAME>.github.io/<REPO> にデプロイする場合
# git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

cd -
