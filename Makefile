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

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8