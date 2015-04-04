/* eslint-env node */
var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('test', shell.task([
	'node_modules/.bin/intern-client config=tests/intern.js'
]));

gulp.task('build', shell.task([
	'./bin/cli.js markdown.json'
]));