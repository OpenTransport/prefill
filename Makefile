all:
	npm install
	browserify js/prefill.js -o build/bundle.js