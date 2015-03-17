define([
	'intern!bdd',
	'intern/chai!assert',
	'intern/dojo/node!../../markdown-include'
], function (bdd, assert, markdownInclude) {
	bdd.describe('markdownInclude.parseIncludeTag', function () {
		bdd.it('should return a file path from an include tag', function () {
			var fileInclude = markdownInclude.parseIncludeTag('#include "markdown-file.md"');
			assert.equal(fileInclude, 'markdown-file.md', 'File paths match');
		});
	});
});