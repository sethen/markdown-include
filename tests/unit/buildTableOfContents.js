define([
	'intern!bdd',
	'intern/chai!assert',
	'intern/dojo/node!../../markdown-include'
], function (bdd, assert, markdownInclude) {
	bdd.describe('markdownInclude.buildTableOfContents', function () {
		bdd.after(function () {
			markdownInclude.options = markdownInclude.build = {};
			markdownInclude.tableOfContents = '';
		});

		bdd.beforeEach(function () {
			markdownInclude.options = {
				tableOfContents: {
					lead: 'number'
				}
			};
			markdownInclude.tableOfContents = '';

			markdownInclude.processFile('tests/data/docs/has_heading_tags_on_lower_levels.md');
		});

		bdd.it('should create a table of contents with correct level', function () {
			markdownInclude.compileHeadingTags('tests/data/docs/has_heading_tags_on_lower_levels.md');

			assert.equal(markdownInclude.tableOfContents,
				'1. [Third Test Heading](#third-test-heading)\n' +
				'  1. [Fourth Test Heading](#fourth-test-heading)\n' +
				'    1. [Fifth Test Heading](#fifth-test-heading)\n' +
				'      1. [Sixth Test Heading](#sixth-test-heading)\n',
				'Data matches');
		});
	});
});