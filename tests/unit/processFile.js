define([
	'intern!bdd',
	'intern/chai!assert',
	'intern/dojo/node!../../markdown-include'
], function (bdd, assert, markdownInclude) {
	bdd.describe('markdownInclude.processFile', function () {
		bdd.after(function () {
			markdownInclude.build = markdownInclude.options = {};
		});

		bdd.beforeEach(function () {
			markdownInclude.processFile('tests/data/docs/has_include_tags.md');
		});

		bdd.it('should add a key to the build object', function () {
			assert.property(markdownInclude.build, 'tests/data/docs/has_include_tags.md');
		});

		bdd.it('should know the include tags in the file', function () {
			var build = markdownInclude.build['tests/data/docs/has_include_tags.md'];
			assert.equal(build.includeTags.length, 2, 'Length matches');
			assert.sameMembers(build.includeTags, [
				'#include "tests/data/docs/1.md"',
				'#include "tests/data/docs/2.md"'
			]);
		});

		bdd.it('should know the file paths from the include tags found', function () {
			var build = markdownInclude.build['tests/data/docs/has_include_tags.md'];
			assert.equal(build.files.length, 2, 'Length matches');
			assert.sameMembers(build.files, [
				'tests/data/docs/1.md',
				'tests/data/docs/2.md'
			]);
		});

		bdd.it('should know the raw data of a file', function () {
			var build = markdownInclude.build['tests/data/docs/has_include_tags.md'];
			assert.equal(build.rawData, '#include "tests/data/docs/1.md"\n#include "tests/data/docs/2.md"', 'Raw data matches');
		});

		bdd.it('should know the parsed data of a file', function () {
			var build = markdownInclude.build['tests/data/docs/has_include_tags.md'];
			assert.equal(build.parsedData, '1\n2', 'Parsed data matches');
		});
	});
});