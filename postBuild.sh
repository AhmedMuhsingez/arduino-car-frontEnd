#/bin/sh
mv build/static/js/main*.js build/main.js
mv build/static/css/main*.css build/main.css
gsed -i 's/\/static\/js\/main\.[a-zA-Z0-9]*\.js/\/main.js/g' build/index.html
gsed -i 's/\/static\/css\/main\.[a-zA-Z0-9]*\.css/\/main.css/g' build/index.html
rm -rf build/static
rm -rf build/asset-manifest.json
rm -rf build/manifest.json
