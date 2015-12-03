.PHONY: test

binary-relation.js: binary-relation.ts typings/tsd.d.ts

typings/tsd.d.ts: tsd.json
	./node_modules/tsd/build/cli.js install


test/binary-relation.js: test/binary-relation.ts

%.js: %.ts
	./node_modules/tsc/bin/tsc


test: test/binary-relation.js binary-relation.js
	./node_modules/.bin/mocha --reporter spec

