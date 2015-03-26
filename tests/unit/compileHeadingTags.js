define([
	'intern!bdd',
	'intern/chai!assert',
	'intern/dojo/node!../../markdown-include'
], function (bdd, assert, markdownInclude) {
	bdd.describe('markdownInclude.compileHeadingTags', function () {
		bdd.after(function () {
			markdownInclude.options = markdownInclude.build = {};
		});

		bdd.beforeEach(function () {
			markdownInclude.options = {
				tableOfContents: {
					lead: 'number'
				}
			};

			markdownInclude.processFile('tests/data/docs/has_heading_tags.md');
		});

		bdd.it('should parse a file with headings', function () {
			var compileHeadingTags = markdownInclude.compileHeadingTags('tests/data/docs/has_heading_tags.md');
			var parsedData = markdownInclude.build['tests/data/docs/has_heading_tags.md'].parsedData;

			assert.equal(parsedData, '# First Test Heading\n## Second Test Heading\n### Third Test Heading\n#### Fourth Test Heading\n##### Fifth Test Heading\n###### Sixth Test Heading', 'Data matches');
		});
	});
});