#!/usr/bin/env sh
# abort on errors
set -e
# build
quasar build -m pwa
# navigate into the build output directory
cd dist/pwa/
# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:username/hello-world.git master:gh-pages
cd -

