define([
	'intern!bdd',
	'intern/chai!assert',
	'intern/dojo/node!fs',
	'intern/dojo/node!../../markdown-include'
], function (bdd, assert, fs, markdownInclude) {
	bdd.describe('markdownInclude.findIncludeTags', function () {
		bdd.it('should return an array if include tags are found', function () {
			var file = fs.readFileSync('tests/data/docs/has_include_tags.md').toString();
			var findHeadingTags = markdownInclude.findIncludeTags(file);
			assert.equal(findHeadingTags.length, 2, 'Heading tags length match');
		});
	});
});