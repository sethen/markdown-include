/**
 * @author Sethen Maleno (https://github.com/sethen)
 * @description Include markdown files into other markdown files
 * @version  0.4.3
 */

/* eslint-env node */
'use strict';

var fs = require('fs');
var q = require('q');

this.ignoreTag = ' !ignore';
this.headingTag = ' !heading';
this.includePattern = /^#include\s"(.+\/|\/|\w|-|\/)+\.(md|markdown)"/gm;
this.ignorePattern = new RegExp('^#include\\s"(.+\\/|\\/|\\w|-|\\/)+\.(md|markdown)"' + this.ignoreTag, 'gm');
this.headingPattern = new RegExp('^#+\\s.+' + this.headingTag, 'gm');
this.tableOfContents = '';
this.build = {};
this.customTags = [];

/**
 * Build content item for navigation
 * @param  {Object} obj Object containing count and headingTag
 * @return {String}     String for markdown navigation item
 */
exports.buildContentItem = function (obj) {
	var headingTag = obj.headingTag;
	var count = obj.count;
	var item = headingTag.substring(count + 1);
	var index = headingTag.indexOf(item);
	var headingTrimmed = this.buildLinkString(headingTag.substring(index));
	var lead = this.options.tableOfContents.lead && this.options.tableOfContents.lead === 'number' ? '1.' : '*';
	var navItem;

	switch (obj.count) {
		case 1:
			navItem = lead + ' ' + this.buildLink(item, headingTrimmed);
		break;
		case 2:
			navItem = '  ' + lead + ' ' + this.buildLink(item, headingTrimmed);
		break;
		case 3:
			navItem = '    ' + lead + ' ' + this.buildLink(item, headingTrimmed);
		break;
		case 4:
			navItem = '      ' + lead + ' ' + this.buildLink(item, headingTrimmed);
		break;
		case 5:
			navItem = '        ' + lead + ' ' + this.buildLink(item, headingTrimmed);
		break;
		case 6:
			navItem = '          ' + lead + ' ' + this.buildLink(item, headingTrimmed);
		break;
	}

	return navItem;
};

/**
 * Utility function for building links
 * @param  {String} title   Phrase for link
 * @param  {String} anchor  ID for link
 * @return {String}         Markdown style link
 */
exports.buildLink = function (title, anchor) {
	return '[' + title + '](#' + anchor + ')\n';
};


/**
 * Builds links for table of contents
 * @param  {String} str String to test and transform
 * @return {String}     String for link
 */
exports.buildLinkString = function (str) {
	var linkPatterns = {
		backtick: {
			pattern: /`/g,
			replace: ''
		},
		dot: {
			pattern: /\./g,
			replace: '',
		},
		stick: {
			pattern: /\|/g,
			replace: ''
		}
	};
	var key;

	for (key in linkPatterns) {
		if (linkPatterns.hasOwnProperty(key)) {
			var pattern = linkPatterns[key].pattern;
			var replace = linkPatterns[key].replace || ' ';

			if (pattern.test(str)) {
				str = str.replace(pattern, replace);
			}
		}
	}

	return str.trim().split(' ').join('-').toLowerCase();
};

/**
 * Compile files from markdown.json
 * @param  {String} path File path to markdown.json
 * @return {Object}      Promise to be resolved
 */
exports.compileFiles = function (path) {
	var deferred = q.defer();
	var self = this;

	fs.readFile(path, function (err, data) {
		if (err) {
			throw err;
		}

		self.options = JSON.parse(data.toString());
		var files = self.options.files;
		var i;

		for (i = 0; i < files.length; i += 1) {
			var file = files[i];

			self.processFile(file);
			self.build[file].parsedData = self.stripTagsInFile({
				data: self.build[file].parsedData,
				pattern: self.ignorePattern,
				string: self.ignoreTag
			});

			if (self.options.tableOfContents) {
				self.compileHeadingTags(file);

				if (self.options.tableOfContents.heading && self.tableOfContents) {
					self.build[file].parsedData = self.options.tableOfContents.heading + '\n\n' + self.tableOfContents + '\n\n' + self.build[file].parsedData;
				}
			}
		}

		if (self.customTags && self.customTags.length) {
			self.build[file].parsedData = self.resolveCustomTags(self.build[file].parsedData);
		}

		deferred.resolve(self.writeFile(self.build[file].parsedData));
	});

	return deferred.promise;
};

/**
 * Compiling heading tags in a parsed file
 * @param  {String} file File path
 * @return {Void}        Undefined
 */
exports.compileHeadingTags = function (file) {
	var headingTags = this.findHeadingTags(this.build[file].parsedData);
	var replacedHeadingTag;
	var parsedHeading;
	var i;

	for (i = 0; i < headingTags.length; i += 1) {
		replacedHeadingTag = headingTags[i].replace(this.headingTag, '');
		parsedHeading = this.parseHeadingTag(replacedHeadingTag);
		this.tableOfContents += this.buildContentItem(parsedHeading);
	}

	this.build[file].parsedData = this.stripTagsInFile({
		data: this.build[file].parsedData,
		pattern: this.headingPattern,
		string: this.headingTag
	});
};

/**
 * Finding heading tags that have !heading
 * @param  {String} parsedData Parsed data from includes
 * @return {Array}             Array of matching heading tags
 */
exports.findHeadingTags = function (parsedData) {
	return parsedData.match(this.headingPattern) || [];
};

/**
 * Finds include tags in file content based on a regular expression
 * @param  {String} rawData Raw data from file
 * @return {Array}          Array containing found include tags
 */
exports.findIncludeTags = function (rawData) {
	var ignores = rawData.match(this.ignorePattern) || [];
	var includes = rawData.match(this.includePattern) || [];

	if (includes.length > 0 && ignores.length > 0) {
		var i;

		for (i = 0; i < ignores.length; i += 1) {
			var testIncludeString = this.stripTag({
				tag: ignores[i],
				pattern: this.ignoreTag
			});

			var index = includes.indexOf(testIncludeString);

			if (index > -1) {
				includes.splice(index, 1);
			}
		}
	}

	return includes;
};

/**
 * Parses a heading tag according to the amount of asterisks
 * @param  {String} headingTag String consisting of markdown formatted heading
 * @return {Object}            Object consisting of key value pairs describing heading tag
 */
exports.parseHeadingTag = function (headingTag) {
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

	// Do we need to return the heading tag??
	return {
		count: count,
		headingTag: headingTag
	};
};

/**
 * Parses an include tag to get a file path
 * @param  {String} tag An include tag
 * @return {String}     A file path
 */
exports.parseIncludeTag = function (tag) {
	var firstQuote = tag.indexOf('"') + 1;
	var lastQuote = tag.lastIndexOf('"');

	return tag.substring(firstQuote, lastQuote);
};

/**
 * Processes file for the life cycle
 * @param  {String} file        A file path
 * @param  {String} currentFile Current file that an include was found in
 * @return {Void}               Undefined
 */
exports.processFile = function (file, currentFile) {
	if (file in this.build) {
		this.replaceIncludeTags(file);
	}
	else {
		var rawData = fs.readFileSync(file).toString();
		var includeTags = this.findIncludeTags(rawData);
		var files = includeTags.length ? this.processIncludeTags(file, currentFile, includeTags) : null;

		this.build[file] = {
			files: files,
			includeTags: includeTags,
			rawData: rawData
		};

		if (files && includeTags) {
			this.build[file].parsedData = this.replaceIncludeTags(file);
		}
		else {
			this.build[file].parsedData = rawData;
		}
	}
};

/**
 * Processes array of include tags and passes file for recursion
 * @param  {String} file        File passed for additional processing to check for more includes
 * @param  {String} currentFile Current file passed on recursion to check for circular dependencies
 * @param  {Array}  tags        Array of include tags
 * @return {Array}              Collection of files parsed from include tags
 */
exports.processIncludeTags = function (file, currentFile, tags) {
	var collection = [];
	var i;

	for (i = 0; i < tags.length; i += 1) {
		var includeFile = this.parseIncludeTag(tags[i]);

		if (includeFile === currentFile) {
			throw new Error('Circular injection ' + file + ' -> ' + includeFile + ' -> ' + file);
		}

		collection.push(includeFile);
		this.processFile(includeFile, file);
	}

	return collection;
};

exports.registerPlugin = function () {
	if (arguments[0].pattern && arguments[0].replace) {
		this.customTags.push(arguments[0]);
	}
	else {
		this.customTags.push({
			pattern: arguments[0],
			replace: arguments[1]
		});
	}
};

/**
 * Replaces include tags with actual content from files
 * @param  {String} file File content
 * @return {String}      Replaced file content
 */
exports.replaceIncludeTags = function (file) {
	var obj = this.build[file];
	var replacedData;
	var i;

	for (i = 0; i < obj.includeTags.length; i += 1) {
		var includeTag = obj.includeTags[i];
		var currentFile = obj.files[i];

		if (replacedData) {
			replacedData = replacedData.replace(includeTag, this.build[currentFile].parsedData);
		}
		else {
			replacedData = obj.rawData.replace(includeTag, this.build[currentFile].parsedData);
		}
	}

	return replacedData;
};

/**
 * Replace part of a string with something else
 * @param  {Object} obj Object with key value pairs for options
 * @return {String}     Replaced string
 */
exports.replaceWith = function (obj) {
	var replaced = obj.string.substr(0, obj.index) + obj.replacement;

	if (obj.preserve) {
		return replaced + obj.string.substr(obj.index, obj.string.length);
	}

	return replaced;
};

exports.resolveCustomTags = function (data) {
	if (data) {
		var k;

		for (k = 0; k < this.customTags.length; k += 1) {
			var customTagObj = this.customTags[k];
			var replacedData;

			if (replacedData) {
				customTagObj.data = replacedData;
			}
			else {
				customTagObj.data = data;
			}

			replacedData = this.stripTagsInFile(customTagObj);
		}

		return replacedData;
	}
};

/**
 * For stripping a pattern out of a tag
 * @param  {Object} obj Key value pair include tag and pattern to strip
 * @return {String}     String stripped
 */
exports.stripTag = function (obj) {
	return obj.tag.replace(obj.pattern, '');
};

/**
 * Strips tags in a given file
 * @param  {Object} obj Object containing file path, pattern to match and string to replace
 * @return {String}     Replaced data from object keys
 */
exports.stripTagsInFile = function (obj) {
	var replacedData;

	if (obj.pattern.test(obj.data)) {
		var patterns = obj.data.match(obj.pattern);
		var i;

		for (i = 0; i < patterns.length; i += 1) {
			var currentPattern = patterns[i];
			var replacedTag;

			if (obj.replace) {
				replacedTag = (typeof obj.replace === 'function') ? obj.replace(currentPattern) : obj.replace;
			}
			else {
				var index = currentPattern.indexOf(obj.string);

				replacedTag = this.replaceWith({
					string: currentPattern,
					index: index,
					replacement: ''
				});
			}

			if (replacedData) {
				replacedData = replacedData.replace(currentPattern, replacedTag);
			}
			else {
				replacedData = obj.data.replace(currentPattern, replacedTag);
			}
		}

		return replacedData;
	}

	return obj.data;
};

/**
 * Write file wrapper
 * @param  {String} parsedData Data to write into file
 * @return {Object}            Promise to be resolved
 */
exports.writeFile = function (parsedData) {
	var deferred = q.defer();

	fs.writeFile(this.options.build, parsedData, function (err) {
		if (err) {
			throw err;
		}

		deferred.resolve(parsedData);
	});

	return deferred.promise;
};