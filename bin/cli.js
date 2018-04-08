#!/usr/bin/env node

/* eslint-env node */
'use strict';

var markdownInclude = require('../markdown-include');

if (process.argv.length === 3) {
	var markdownJson = process.argv[2];

	markdownInclude.compileFiles(markdownJson).then(function () {
		console.info(markdownInclude.options.build + ' have been built successfully');
	});
} else {
	var inDir = process.argv[2];
	var outDir = process.argv[3];

	markdownInclude.compileFolders(inDir, outDir, function (err) {
		if (err) {
			console.error(err);
		} else {
			console.info(inDir + ' has been processed successfully');
		}
	});
}