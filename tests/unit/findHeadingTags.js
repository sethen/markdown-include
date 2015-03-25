define([
	'intern!bdd',
	'intern/chai!assert',
	'intern/dojo/node!fs',
	'intern/dojo/node!../../markdown-include'
], function (bdd, assert, fs, markdownInclude) {
	bdd.describe('markdownInclude.findHeadingTags', function () {
		bdd.it('should return an array if heading tags are found', function () {
			var file = fs.readFileSync('tests/data/docs/has_heading_tags.md').toString();
			var findHeadingTags = markdownInclude.findHeadingTags(file);
			assert.equal(findHeadingTags.length, 6, 'Heading tags length match');
		});

		bdd.it('should return an empty array if no heading tags are found', function () {
			var file = fs.readFileSync('tests/data/docs/has_include_tags.md').toString();
			var findHeadingTags = markdownInclude.findHeadingTags(file);
			assert.equal(findHeadingTags.length, 0, 'Heading tags length match');
		});
	});
});