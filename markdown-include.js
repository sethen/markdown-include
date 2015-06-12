/**
 * @author Sethen Maleno (https://github.com/sethen)
 * @description Include markdown files into other markdown files
 * @version  0.2.2
 */
(function () {
	"use strict";

	var exec = require('child_process').exec;
	var fs = require('fs');
	var includePattern = /^#include\s"(.+\/|\/|\w|-|\/)+.md"/gm;
	var ignorePattern = /^#include\s"(.+\/|\/|\w|-|\/)+.md" !ignore/gm;
	var headingPattern = /^#+\s.+ !heading/gm;
	var build = {};
	var tableOfContents = '';

	/**
	 * Builds links for table of contents
	 * @param  {String} str String to test and transform
	 * @return {String}     String for link
	 */
	function buildLinkString(str) {
		var linkPatterns = {
			dot: /\./g,
			stick: /\|/g
		};
		var key;

		for (key in linkPatterns) {
			var pattern = linkPatterns[key];

			if (pattern.test(str)) {
				str = str.replace(pattern, '');
			}
		}

		return str.trim().split(' ').join('-').toLowerCase();
	}

	/**
	 * Build content item for navigation
	 * @param  {Object} obj Object containing count and headingTag
	 * @return {String}     String for markdown navigation item
	 */
	function buildContentItem(obj) {
		var headingTag = obj.headingTag;
		var count = obj.count;
		var item = headingTag.substring(count + 1);
		var index = headingTag.indexOf(item);
		var headingTrimmed = buildLinkString(headingTag.substring(index));
		var navItem;

		/**
		 * Small utility function for building links for navigation items
		 * @param  {String} heading Navigation item
		 * @return {String}         Navigation item that's linked
		 */
		function buildNavItem(heading) {
			return '[' + item + '](#' + heading + ')\n';
		}

		switch (obj.count) {
			case 1:
				navItem = '* ' + buildNavItem(headingTrimmed);
			break;
			case 2:
				navItem = '  * ' + buildNavItem(headingTrimmed);
			break;
			case 3:
				navItem = '    * ' + buildNavItem(headingTrimmed);
			break;
			case 4:
				navItem = '      * ' + buildNavItem(headingTrimmed);
			break;
			case 5:
				navItem = '        * ' + buildNavItem(headingTrimmed);
			break;
			case 6:
				navItem = '          * ' + buildNavItem(headingTrimmed);
			break;
		}

		return navItem;
	}

	/**
	 * Compile files from markdown.json
	 * @param  {String} path File path to markdown.json
	 */
	function compileFiles(path) {
		fs.readFile(path, function (err, data) {
			if (err) {
				throw err;
			}

			var options = JSON.parse(data.toString());
			var files = options.files;
			var i;

			for (i = 0; i < files.length; i += 1) {
				var file = files[i];

				processFile(file);
				build[file].parsedData = stripFileTags({
					data: build[file].parsedData, 
					pattern: ignorePattern, 
					string: ' !ignore'
				});

				if (options.tableOfContents) {
					compileHeadingTags(file);

					if (options.tableOfContents.heading) {
						build[file].parsedData = options.tableOfContents.heading + '\n\n' + tableOfContents + '\n\n' + build[file].parsedData;
					}
					else {
						build[file].parsedData = tableOfContents + '\n\n' + build[file].parsedData;
					}
				}

				writeFile(options, build[file].parsedData);
			}
		});
	}


	/**
	 * Compiling heading tags in a parsed file
	 * @param  {String} file File path
	 */
	function compileHeadingTags(file) {
		var headingTags = findHeadingTags(build[file].parsedData);
		var replacedHeadingTag;
		var parsedHeading;
		var i;

		for (i = 0; i < headingTags.length; i += 1) {
			replacedHeadingTag = headingTags[i].replace(' !heading', '');
			parsedHeading = parseHeadingTag(replacedHeadingTag);
			tableOfContents += buildContentItem(parsedHeading);
		}

		build[file].parsedData = stripFileTags({
			data: build[file].parsedData, 
			pattern: headingPattern,
			string: ' !heading'
		});
	}

	/**
	 * Finding heading tags that have !heading
	 * @param  {String} parsedData Parsed data from includes
	 * @return {Array}             Array of matching heading tags
	 */
	function findHeadingTags(parsedData) {
		return parsedData.match(headingPattern) || [];
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
	 * [parseHeadingTag description]
	 * @param  {[type]} headingTag [description]
	 * @return {[type]}            [description]
	 */
	function parseHeadingTag(headingTag) {
		var count = 0;
		var i;

		for (i = 0; i < headingTag.length; i += 1) {
			if (headingTag[i] === '#') {
				count += 1;
			}
			else {
				break;
			}
		}

		return {
			count: count,
			headingTag: headingTag
		};
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
	 * Strips tags in a given file
	 * @param  {Object} obj Object containing file path, pattern to match and string to replace
	 * @return {String}     Replaced data from object keys
	 */
	function stripFileTags(obj) {
		var replacedData;
		
		if (obj.pattern.test(obj.data)) {
			var patterns = obj.data.match(obj.pattern);
			var i;

			for (i = 0; i < patterns.length; i += 1) {
				var currentPattern = patterns[i];
				var index = obj.data.indexOf(currentPattern);
				var stringLength = obj.string.length;
				var currentPatternTagLength = patterns[i].length;
				var replacedTag = currentPattern.substring(0, currentPatternTagLength - stringLength);

				if (obj.replace) {
					console.log('do something else');
				}
				else {
					if (replacedData) {
						replacedData = replacedData.replace(currentPattern, replacedTag);
					}
					else {
						replacedData = obj.data.replace(currentPattern, replacedTag);
					}
				}
			}

			return replacedData;
		}
	}

	/**
	 * Write file wrapper
	 * @param  {String} path Path to build new file
	 * @param  {String} data Data to write into file
	 */
	function writeFile(options, parsedData) {
		fs.writeFile(options.build, parsedData, function (err) {
			if (err) {
				throw err;
			}

			console.info(options.build + ' has been built successfully');
		});
	}

	compileFiles(process.argv[2]);
}());