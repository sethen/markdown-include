define([
	'intern!bdd',
	'intern/chai!assert',
	'intern/dojo/node!../../markdown-include'
], function (bdd, assert, markdownInclude) {
	bdd.describe('markdownInclude.parseHeadingTag', function () {
		bdd.it('should return a count from a heading tag', function () {
			var count = markdownInclude.parseHeadingTag('### heading').count;
			assert.equal(count, 3, 'Counts match');
		});
	});
});