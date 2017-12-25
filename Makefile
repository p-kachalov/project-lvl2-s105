install:
	npm install

start:
	npm run babel-node -- src/bin/gendiff.js

build:
	npm run build

test:
	npm test

publish:
	npm publish

lint:
	npm run eslint src
