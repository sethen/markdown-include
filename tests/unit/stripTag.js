define([
	'intern!bdd',
	'intern/chai!assert',
	'intern/dojo/node!../../markdown-include'
], function (bdd, assert, markdownInclude) {
	bdd.describe('markdownInclude.stripTag', function () {
		bdd.it('should strip tags based on a pattern', function () {
			var strippedTag = markdownInclude.stripTag({
				tag: '#include "1.md" !ignore',
				pattern: ' !ignore'
			});
			assert.equal(strippedTag, '#include "1.md"', 'Tags match');
		});
	});
});