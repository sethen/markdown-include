define([
	'intern!bdd',
	'intern/chai!assert',
	'intern/dojo/node!fs',
	'intern/dojo/node!../../markdown-include'
], function (bdd, assert, fs, markdownInclude) {
	bdd.describe('markdownInclude.processFile', function () {
		bdd.beforeEach(function () {
			markdownInclude.processFile('tests/data/has_include_tags.md');
		});

		bdd.it('should add a key to the build object', function () {
			assert.property(markdownInclude.build, 'tests/data/has_include_tags.md');
		});

		bdd.it('should know the include tags in the file', function () {
			var build = markdownInclude.build['tests/data/has_include_tags.md'];
			assert.equal(build.includeTags.length, 2, 'Length matches');
			assert.sameMembers(build.includeTags, [
				'#include "tests/data/first_test_include.md"',
				'#include "tests/data/second_test_include.md"'
			]);
		});

		bdd.it('should know the file paths from the include tags found', function () {
			var build = markdownInclude.build['tests/data/has_include_tags.md'];
			assert.equal(build.files.length, 2, 'Length matches');
			assert.sameMembers(build.files, [
				'tests/data/first_test_include.md',
				'tests/data/second_test_include.md'
			]);
		});

		bdd.it('should know the raw data of a file', function () {
			var build = markdownInclude.build['tests/data/has_include_tags.md'];
			assert.equal(build.rawData, '#include "tests/data/first_test_include.md"\n#include "tests/data/second_test_include.md"', 'Raw data matches');
		});

		bdd.it('should know the parsed data of a file', function () {
			var build = markdownInclude.build['tests/data/has_include_tags.md'];
			assert.equal(build.parsedData, 'First test include.\nSecond test include.', 'Parsed data matches');
		});
	});
});