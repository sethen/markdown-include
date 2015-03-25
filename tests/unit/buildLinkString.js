define([
	'intern!bdd',
	'intern/chai!assert',
	'intern/dojo/node!../../markdown-include'
], function (bdd, assert, markdownInclude) {
	bdd.describe('markdownInclude.buildLinkString', function () {
		bdd.it('should return a link string from a string', function () {
			var linkString = markdownInclude.buildLinkString('My Link String');
			assert.equal(linkString, 'my-link-string', 'Strings match');
		});

		bdd.it('should return a link string from a string with dots', function () {
			var linkString = markdownInclude.buildLinkString('My.Link.String');
			assert.equal(linkString, 'my-link-string', 'Strings match');
		});

		bdd.it('should return a link string from a string with sticks', function () {
			var linkString = markdownInclude.buildLinkString('My|Link|String');
			assert.equal(linkString, 'my-link-string', 'Strings match');
		});
	});
});