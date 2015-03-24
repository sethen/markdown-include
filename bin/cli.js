#!/usr/bin/env node

var markdownJson = process.argv[2];
var markdownInclude = require('../markdown-include');

markdownInclude.compileFiles(markdownJson).then(function () {
	console.info(markdownInclude.options.build + ' have been built successfully');
});