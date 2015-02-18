/**
 * @author Sethen Maleno (https://github.com/sethen)
 * @description Include markdown files into other markdown files
 * @version  1.0
 */
(function () {
	"use strict";

	var fs = require('fs');
	var includePattern = /^#include\s"(.+\/|\/|\w|-|\/)+.md"/gm;
	var ignorePattern = /^#include\s"(.+\/|\/|\w|-|\/)+.md" !ignore/gm;
	var build = {};

	/**
	 * Write file function
	 * @param  {String} path Path to build new file
	 * @param  {String} data Data to write into file
	 */
	function buildFile(path, data) {
		fs.writeFile(path, data, function (err) {
			if (err) {
				throw err;
			}

			console.info(path + ' has been built successfully');
		});
	}

	/**
	 * Finds include tags in file content based on a regular expression
	 * @param  {String} rawData Raw data from file
	 * @return {Array}          Array containing found include tags
	 */
	function findIncludeTags(rawData) {
		var ignores;
		var includes = rawData.match(includePattern) || [];

		if (ignorePattern.test(rawData)) {
			ignores = rawData.match(ignorePattern);
		}

		if (includes.length > 0 && ignores) {
			var i;

			for (i = 0; i < ignores.length; i += 1) {
				var ignoreTest = includes[i] + ' !ignore';

				if (ignoreTest && includes.length === 1) {
					includes = [];
				}
				else if (ignoreTest) {
					includes.shift();
				}
			}
		}

		return includes;
	}

	/**
	 * Processes file for the life cycle
	 * @param  {String} file        A file path
	 * @param  {String} currentFile Current file that an include was found in
	 */
	function processFile(file, currentFile) {
		if (file in build) {
			replaceIncludeTags(file);
		}
		else {
			var rawData = fs.readFileSync(file).toString();
			var includeTags = findIncludeTags(rawData);
			var files = includeTags.length ? processIncludeTags(file, currentFile, includeTags) : null;

			build[file] = {
				files:  files,
				includeTags: includeTags,
				rawData: rawData,
			};

			if (files && includeTags) {
				build[file].parsedData = replaceIncludeTags(file);
			}
			else {
				build[file].parsedData = rawData;
			}
		}
	}

	/**
	 * Parses an include tag to get a file path
	 * @param  {String} tag An include tag
	 * @return {String}     A file path
	 */
	function parseIncludeTag(tag) {
		var firstQuote = tag.indexOf('"') + 1;
		var lastQuote = tag.lastIndexOf('"');

		return tag.substring(firstQuote, lastQuote);
	}

	/**
	 * Processes array of include tags and passes file for recursion
	 * @param  {String} file        File passed for additional processing to check for more includes
	 * @param  {String} currentFile Current file passed on recursion to check for circular dependencies
	 * @param  {Array}  tags        Array of include tags
	 * @return {Array}              Collection of files parsed from include tags
	 */
	function processIncludeTags(file, currentFile, tags) {
		var collection = [];
		var i;

		for (i = 0; i < tags.length; i += 1) {
			var includeFile = parseIncludeTag(tags[i]);

			if (includeFile === currentFile) {
				throw new Error('Circular injection ' + file + ' -> ' + includeFile + ' -> ' + file);
			}

			collection.push(includeFile);
			processFile(includeFile, file);
		}

		return collection;
	}

	/**
	 * Replaces include tags with actual content from files
	 * @param  {String} file File content
	 * @return {String}      Replaced file content
	 */
	function replaceIncludeTags(file, cached) {
		var obj = build[file];
		var replacedData;
		var i;

		for (i = 0; i < obj.includeTags.length; i += 1) {
			var includeTag = obj.includeTags[i];
			var currentFile = obj.files[i];

			if (cached) {
				replacedData = obj.parsedData;
			}
			else if (replacedData) {
				replacedData = replacedData.replace(includeTag, build[currentFile].parsedData);
			}
			else {
				replacedData = obj.rawData.replace(includeTag, build[currentFile].parsedData);
			}
		}

		return replacedData;
	}

	/**
	 * Replaces include tags with an !ignore
	 * @param  {String} file File path
	 */
	function replaceIgnoreTags(file) {
		var obj = build[file];
		var parsedData = obj.parsedData;
		var replacedData;
		
		if (ignorePattern.test(parsedData)) {
			var ignores = parsedData.match(ignorePattern);
			var i;

			for (i = 0; i < ignores.length; i += 1) {
				var ignore = ignores[i];
				var index = parsedData.indexOf(ignore);
				var ignoreLength = ' !ignore'.length;
				var ignoreTagLength = ignores[i].length;
				var replacedTag = ignore.substring(0, ignoreTagLength - ignoreLength);

				if (replacedData) {
					replacedData = replacedData.replace(ignore, replacedTag);
				}
				else {
					replacedData = obj.parsedData.replace(ignore, replacedTag);
				}
			}

			obj.parsedData = replacedData;
		}
	}

	fs.readFile('markdown.json', function (err, data) {
		if (err) {
			throw err;
		}

		var options = JSON.parse(data.toString());
		var files = options.files;
		var i;

		for (i = 0; i < files.length; i += 1) {
			var file = files[i];
			processFile(file);
			replaceIgnoreTags(file);
			buildFile(options.build, build[file].parsedData);
		}
	});
}());