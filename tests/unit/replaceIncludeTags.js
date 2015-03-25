define([
	'intern!bdd',
	'intern/chai!assert',
	'intern/dojo/node!../../markdown-include'
], function (bdd, assert, markdownInclude) {
	bdd.describe('markdownInclude.replaceIncludeTags', function () {
		bdd.after(function () {
			markdownInclude.build = markdownInclude.options = {};
		});

		bdd.beforeEach(function () {
			markdownInclude.processFile('tests/data/docs/has_include_tags.md');
		});

		bdd.it('should replace the include tags with file data', function () {
			var replacedData = markdownInclude.replaceIncludeTags('tests/data/docs/has_include_tags.md');
			assert.equal(replacedData, '1\n2');
		});
	});
});