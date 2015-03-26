define([
	'intern!bdd',
	'intern/chai!assert',
	'intern/dojo/node!fs',
	'intern/dojo/node!../../markdown-include'
], function (bdd, assert, fs, markdownInclude) {
	bdd.describe('markdownInclude.stripTagsInFile', function () {
		bdd.it('should strip tags based on a pattern', function () {
			var file = fs.readFileSync('tests/data/docs/has_heading_tags.md').toString();
			var data = markdownInclude.stripTagsInFile({
				data: file, 
				pattern: markdownInclude.headingPattern,
				string: ' !heading'
			});
			var string = '# First Test Heading\n## Second Test Heading\n### Third Test Heading\n#### Fourth Test Heading\n##### Fifth Test Heading\n###### Sixth Test Heading';
			assert.equal(data, string, 'Data matches');
		});
	});
});