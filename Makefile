help:
		node bin/gendiff -h
publish:
		npm publish --dry-run
lint:
		npx eslint .

setup: install build

install:
	npm install
build:
	npm run build

ci:
	npm ci