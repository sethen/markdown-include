define([
	'intern!bdd',
	'intern/chai!assert',
	'intern/dojo/node!fs',
	'intern/dojo/node!../../markdown-include'
], function (bdd, assert, fs, markdownInclude) {
	bdd.describe('markdownInclude.replaceIncludeTags', function () {
		var filePath = 'tests/data/README.md';

		bdd.beforeEach(function () {
			markdownInclude.options.build = filePath;
		});

		bdd.it('should write file based on build option', function () {
			var dfd = this.async(1000);

			markdownInclude.writeFile('Something to write.', dfd.callback(function () {
				var file = fs.readFileSync(filePath).toString();
				assert.equal(file, 'Something to write.');
			}));
		});
	});
});