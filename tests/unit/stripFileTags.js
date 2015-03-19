define([
	'intern!bdd',
	'intern/chai!assert',
	'intern/dojo/node!../../markdown-include'
], function (bdd, assert, markdownInclude) {
	bdd.describe('markdownInclude.stripFileTags', function () {
		bdd.after(function () {
			markdownInclude.build = markdownInclude.options = {};
		});

		bdd.before(function () {
			markdownInclude.processFile('tests/data/has_heading_tags');
		});

		bdd.it('should strip tags based on a pattern', function () {
			markdownInclude.stripFileTags({
				data: markdownInclude.build['tests/data/has_heading_tags'].parsedData, 
				pattern: this.headingPattern,
				string: ' !heading'
			});
		});
	});
});