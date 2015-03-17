define([
	'intern!bdd',
	'intern/chai!assert',
	'intern/dojo/node!../../markdown-include'
], function (bdd, assert, markdownInclude) {
	bdd.describe('markdownInclude.replaceIncludeTags', function () {
		bdd.beforeEach(function () {
			markdownInclude.processFile('tests/data/has_include_tags.md');
		});

		bdd.it('should replace the include tags with file data', function () {
			var replacedData = markdownInclude.replaceIncludeTags('tests/data/has_include_tags.md');
			assert.equal(replacedData, 'First test include.\nSecond test include.');
		});
	});
});