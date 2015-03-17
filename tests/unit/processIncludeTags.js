define([
	'intern!bdd',
	'intern/chai!assert',
	'intern/dojo/node!../../markdown-include'
], function (bdd, assert, markdownInclude) {
	bdd.describe('markdownInclude.processIncludeTags', function () {
		bdd.it('should process include tags and return a collection of file names', function () {
			var tagsArr = ['#include "tests/data/third_test_include.md"', '#include "tests/data/fourth_test_include.md"'];
			var files = markdownInclude.processIncludeTags('tests/data/first_test_include.md', 'tests/data/has_include_tags.md', tagsArr);

			assert.equal(files.length, 2, 'Length matches');
			assert.equal(files[0], "tests/data/third_test_include.md", 'File matches');
			assert.equal(files[1], "tests/data/fourth_test_include.md", 'File matches');
		});
	});
});