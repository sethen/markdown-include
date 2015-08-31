#!/usr/bin/env node

/* eslint-env node */
'use strict';

var markdownJson = process.argv[2];
var markdownInclude = require('../markdown-include');

markdownInclude.compileFiles(markdownJson).then(function () {
	console.info(markdownInclude.options.build + ' have been built successfully');
});