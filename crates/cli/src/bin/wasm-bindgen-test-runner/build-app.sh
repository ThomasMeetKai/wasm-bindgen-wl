#!/bin/bash

rm -rf tmp
rm -rf deploy
mkdir tmp
mkdir deploy
cd ../app
cargo make # needs to happen BEFORE rollup call
cd ../wle-frontend
rollup ./js/app_rs.js --format iife --file ./tmp/app_rs.bundle.js
cp BackendPOC.wlp ./tmp
./node_modules/.bin/esbuild ./js/app_ts.ts --sourcemap --bundle --outfile="tmp/BackendPOC-bundle.js"
cp js/worker/* tmp/.
cp js/app_rs_loader.js ./tmp
cp ../app/deploy/app_rs_bg.wasm tmp/.
cp -Rp tmp/* deploy/.
rm -rf tmp
rm -rf ../app/deploy