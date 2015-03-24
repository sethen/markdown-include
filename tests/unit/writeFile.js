define([
	'intern!bdd',
	'intern/chai!assert',
	'intern/dojo/node!fs',
	'intern/dojo/node!../../markdown-include'
], function (bdd, assert, fs, markdownInclude) {
	bdd.describe('markdownInclude.writeFile', function () {
		var writePath = 'tests/data/README.md';
		var parsedData = 'Parsed data';

		bdd.before(function () {
			markdownInclude.options.build = writePath;
		});

		bdd.it('should write parsed data to file', function () {
			var dfd = this.async(1000);
			markdownInclude.writeFile(parsedData).then(dfd.callback(function (data) {
				assert.equal(data, parsedData, 'Data matches');
			}));
		});
	});
});