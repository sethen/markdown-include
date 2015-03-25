define([
	'intern!bdd',
	'intern/chai!assert',
	'intern/dojo/node!../../markdown-include'
], function (bdd, assert, markdownInclude) {
	bdd.describe('markdownInclude.processIncludeTags', function () {
		bdd.it('should process include tags and return a collection of file names', function () {
			var tagsArr = ['#include "tests/data/docs/3.md"', '#include "tests/data/docs/4.md"'];
			var files = markdownInclude.processIncludeTags('tests/data/docs/1.md', 'tests/data/docs/has_include_tags.md', tagsArr);

			assert.equal(files.length, 2, 'Length matches');
			assert.equal(files[0], "tests/data/docs/3.md", 'File matches');
			assert.equal(files[1], "tests/data/docs/4.md", 'File matches');
		});

		bdd.it('should throw an error when a circular injection is detected', function () {
			var tagsArr = ['#include "tests/data/docs/1.md"', '#include "tests/data/docs/1.md"'];
			var throwsError = function () {
				markdownInclude.processIncludeTags('tests/data/docs/1.md', 'tests/data/docs/1.md', tagsArr);
			};

			assert.throws(throwsError, Error);
		});
	});
});