install:
	npm install

start:
	npm run babel-node -- src/bin/gendiff.js

build:
	npm build

test:
	npm test

publish:
	npm publish

lint:
	npm run eslint src
