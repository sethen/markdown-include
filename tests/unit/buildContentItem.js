define([
	'intern!bdd',
	'intern/chai!assert',
	'intern/dojo/node!../../markdown-include'
], function (bdd, assert, markdownInclude) {
	bdd.describe('markdownInclude.buildContentItem', function () {
		bdd.afterEach(function () {
			markdownInclude.options = {};
		});

		bdd.it('should return a content item with a lead key of number', function () {
			markdownInclude.options = {
				tableOfContents: {
					lead: 'number'
				}
			};

			var contentItem = markdownInclude.buildContentItem({
				count: 1,
				headingTag: '# My Heading To Link'
			});

			assert.equal(contentItem, '1. [My Heading To Link](#my-heading-to-link)\n', 'Content items match');
		});

		bdd.it('should return a content item with a lead key of *', function () {
			markdownInclude.options = {
				tableOfContents: {
					lead: '*'
				}
			};

			var contentItem = markdownInclude.buildContentItem({
				count: 1,
				headingTag: '# My Heading To Link'
			});

			assert.equal(contentItem, '* [My Heading To Link](#my-heading-to-link)\n', 'Content items match');
		});
	});
});