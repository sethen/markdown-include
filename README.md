# Table of Contents

* [markdown-include](#markdown-include)
  * [Compile your markdown files](#compile-your-markdown-files)
  * [Make a table of contents](#make-a-table-of-contents)
* [How To Install](#how-to-install)
* [How To Use From The Command Line](#how-to-use-from-the-command-line)
  * [markdown.json](#markdown-json)
* [How To Use As A Module](#how-to-use-as-a-module)
  * [API](#api)
    * [`buildLink`](#buildlink)
    * [`buildLinkString`](#buildlinkstring)
    * [`compileFiles`](#compilefiles)
    * [`compileHeadingTags`](#compileheadingtags)
    * [`findHeadingTags`](#findheadingtags)
    * [`findIncludeTags`](#findincludetags)
    * [`parseHeadingTag`](#parseheadingtag)
    * [`parseIncludeTag`](#parseincludetag)
    * [`processFile`](#processfile)
    * [`processIncludeTags`](#processincludetags)
    * [`replaceIncludeTags`](#replaceincludetags)
    * [`replaceWith`](#replacewith)
    * [`resolveCustomTags`](#resolvecustomtags)
    * [`stripTag`](#striptag)
    * [`stripTagsInFile`](#striptagsinfile)
    * [`writeFile`](#writefile)
* [How To Make Plugins](#how-to-make-plugins)
  * [Tutorial](#tutorial)
* [How It Works](#how-it-works)


# markdown-include

[![Build Status](https://travis-ci.org/sethen/markdown-include.svg?branch=master)](https://travis-ci.org/sethen/markdown-include)

markdown-include is built using Node.js and allows you to include markdown files into other markdown files using a C style include syntax.

## Compile your markdown files

markdown-include's main feature is that it allows you to include markdown files into other markdown files.  For example, you could place the following into a markdown file:

```
#include "markdown-file.md"
#include "another-markdown-file.md"
```

And assuming that `markdown.file.md` contents are:

```
Something in markdown file!
```

And assuming that `another-markdown-file.md` contents are: 

```
Something in another markdown file!
``` 

It would compile to:

```
Something in markdown file!
Something in another markdown file!
```

Pretty neat, huh?

## Make a table of contents

Aside from compiling your markdown files, markdown-include can also build your table of contents.  This works by evaluating the heading tags inside of your files.  Since markdown works on using `#` for making HTML headings, this makes it easy to assemble table of contents from them.  The more `#` you have in front of your headings (up to 6) will decide how the table of contents is built.  Use one `#` and it's a top level navigation item... Use two `#` and it would be underneath the previous navigation item and so on.

For each heading that you would like to be included in a table of contents just add ` !heading` to the end of it.


# How To Install

markdown-include is available on npm for easy installation:

```
npm install markdown-include
```

Use the `-g` flag if you wish to install markdown-include globally on your system.  Use the `--save` flag to save in your `package.json` file in your local project.


# How To Use From The Command Line

markdown-include is very easy to use whether on the command line or in your own node project.  Each can help you compile your markdown files as you see fit.  markdown-include does require that you define a `markdown.json` file with your options for compile.  See below for all of the options available to you.

Run from the command line to compile your documents like so:

```
node_modules/bin/cli.js path/to/markdown.json
```


## markdown.json

`markdown.json` can be populated with the following options:

| Option                    | Type    | Description                                                                |
|:-------------------------:|:-------:|:--------------------------------------------------------------------------:|
| `build`                   | String  | File path of where everything should be compiled, like `README.md`.        |
| `files`                   | Array   | Array of files to to compile.                                              |
| `tableOfContents`         | Object  | Object to hold options for table of contents generation.                   |
| `tableOfContents.heading` | String  | Heading for table of contents (use markdown syntax if desired).            |
| `tableOfContents.lead`    | String  | What navigation items in table of contents lead with.  If value is `number` will add numbers before each item and subitem.  If not, will add asterisks.  Refer to markdown syntax to understand the difference. |
# How To Use As A Module

Just require in your node project:

```
var markdownInclude = require('markdown-include');
```

From there, you can use markdown-include's API to fit your needs.


## API

When using as a module, markdown-include offers an API for you to work with markdown files as detailed below:

---

### `buildLink`

#### Description

A method for making markdown style anchor tags.

#### Signature

`buildLink(title: String, anchor: String) => String`

#### Parameters

| Parameter(s)    | Type     | Description                          |
|:---------------:|:--------:|:------------------------------------:|
| `title`         | `String` | Title of markdown style link.        |
| `anchor`        | `String` | Markdown style anchor for linking.   |

#### Example

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.buildLink("My Link String", "#my-link-string"); // [My Link String](#my-link-string)
```

---
### `buildLinkString`

#### Description

A method for taking strings and building friendly markdown links.  This is mostly used internally for building the table of contents.

#### Signature

`buildLinkString(str: String) => String`

#### Parameters

| Parameter(s)    | Type     | Description                                                            |
|:---------------:|:--------:|:----------------------------------------------------------------------:|
| `str`           | `String` | File path of where everything should be compiled, like `README.md`.    |

#### Example

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.buildLinkString("My Link String"); // my-link-string
```

---
### `compileFiles`

#### Description

This is probably the most important method in markdown-include.  It takes a path to your markdown.json file, reads your options and returns a promise.  When the promise is resolved it returns the data to you.  This is exactly the same as running markdown-include in the command line as it runs through the whole lifecycle.

#### Signature

`compileFiles(path: String) => Object<Promise>` 

#### Parameters

| Parameter(s)   | Type     | Description                                              |
|:--------------:|:--------:|:--------------------------------------------------------:|
| `path`         | `String` | Compiles files when given the path to `markdown.json`    |

#### Example

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.compileFiles("path/to/markdown.json").then(function (data) {
	// do something with compiled files
});
```

---
### `compileHeadingTags`

#### Description

A method for compiling heading tags (`!heading`) in a given file.

#### Signature

`compileHeadingTags(file: String)`

#### Parameters

| Parameter(s)    | Type     | Description                          |
|:---------------:|:--------:|:------------------------------------:|
| `file`          | `String` | File with `!heading` tags            |

#### Example

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.compileHeadingTags("my_file.md");
```

---
### `findHeadingTags`

#### Description

A method for finding heading tags (`!heading`) in a string.

#### Signature

`findHeadingTags(data: String) => Array<String>`

#### Parameters

| Parameter(s)    | Type     | Description                          |
|:---------------:|:--------:|:------------------------------------:|
| `data`          | `String` | Data with `!heading` tags            |

#### Example

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.findHeadingTags("### A Heading !heading"); // [ "### A Heading !heading" ]
```

---
### `findIncludeTags`

#### Description

A method for finding include tags (`#include "my-include.md"`) in a string.

#### Signature

`findIncludeTags(data: String) => Array<String>`

#### Parameters

| Parameter(s)    | Type     | Description                                  |
|:---------------:|:--------:|:--------------------------------------------:|
| `data`          | `String` | Data with `#include "my-include.md"` tags    |

#### Example

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.findIncludeTags('#include "my-include.md"'); // [ '#include "my-include.md"' ]
```

---
### `parseHeadingTag`

#### Description

Parses a heading tag based on the amount of asterisks present before it (`### Heading`)

#### Signature

`parseHeadingTag(headingTag: String) => Object<count: Number, headingTag: String>`

#### Parameters

| Parameter(s)    | Type     | Description                                  |
|:---------------:|:--------:|:--------------------------------------------:|
| `headingTag`    | `String` | Heading tag to parse                         |

#### Example

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.parseHeadingTag('### Heading'); // { count: 3, headingTag: 'Heading' }
```

---
### `parseIncludeTag`

#### Description

Parses a include tag (`#include "my-include.md"`)

#### Signature

`parseIncludeTag(tag: String) => String`

#### Parameters

| Parameter(s)    | Type     | Description                                  |
|:---------------:|:--------:|:--------------------------------------------:|
| `tag`           | `String` | Heading tag to parse                         |

#### Example

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.parseIncludeTag('#include "my-include.md"'); // "my-include.md"
```

---
### `processFile`

#### Description

Processes a file and adds it to the build object for compiling.

#### Signature

`processFile(file: String, currentFile: String)`

#### Parameters

| Parameter(s)    | Type     | Description                                                           |
|:---------------:|:--------:|:---------------------------------------------------------------------:|
| `file`          | `String` | File for processing                                                   |
| `currentFile`   | `String` | Current file include file was found in for additional processing      |

#### Example

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.processFile('another-include.md', 'my-include.md');
```

---
### `processIncludeTags`

#### Description

Processes a file and adds it to the build object for compiling.

#### Signature

`processIncludeTags(file: String, currentFile: String, tags: Array<String>) => Array<String>`

#### Parameters

| Parameter(s)    | Type            | Description                                                           |
|:---------------:|:---------------:|:---------------------------------------------------------------------:|
| `file`          | `String`        | File for processing                                                   |
| `currentFile`   | `String`        | Current file include file was found in for additional processing      |
| `tags`          | `Array<String>` | Current file include file was found in for additional processing      |

#### Example

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.processIncludeTags('another-include.md', 'my-include.md', ['one-include.md']); // ['one-include.md']
```

---
### `replaceIncludeTags`

#### Description

Replaces include tags in given file with actual data (file must be added to build object first with `processFile`).

#### Signature

`replaceIncludeTags(file: String) => String`

#### Parameters

| Parameter(s)    | Type            | Description                        |
|:---------------:|:---------------:|:----------------------------------:|
| `file`          | `String`        | File to replace include tags       |

#### Example

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.replaceIncludeTags('my-include.md'); // 'Content in my-include.md!'
```

---
### `replaceWith`

#### Description

Utility method for transforming a string.

#### Signature

`replaceWith(Object<string: String, index: Number, preserve: Boolean, replacement: String>) => String`

#### Parameters

| Parameter(s)      | Type            | Description                            |
|:-----------------:|:---------------:|:--------------------------------------:|
| `obj.string`      | `String`        | String to transform                    |
| `obj.index`       | `Number`        | Index to start transformation to end   |
| `obj.preserve`    | `Boolean`       | Preserve original string               |
| `obj.replacement` | `String`        | String to use for replacement          |


#### Example

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.replaceWith({
	string: "string",
	index: 4,
	replacement: "myString"
}); // 'somemyString'
```

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.replaceWith({
	string: "string",
	index: 4,
	preserve: true,
	replacement: "myString"
}); // 'somemyStringthing'
```

---
### `resolveCustomTags`

#### Description

Method for resolving custom tags.  Looks in `customTags` object attached to markdown include module.

#### Signature

`resolveCustomTags(data: String) => String` 

#### Parameters

| Parameter(s)      | Type            | Description                            |
|:-----------------:|:---------------:|:--------------------------------------:|
| `data`            | `String`        | String with custom tags                |


#### Example

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.resolveCustomTags('### Custom Tag !myCustomTag');
```

---
### `stripTag`

#### Description

Method for stripping tags in a string.

#### Signature

`stripTag(Object<tag: String, pattern: String>) => String` 

#### Parameters

| Parameter(s)      | Type            | Description                            |
|:-----------------:|:---------------:|:--------------------------------------:|
| `obj.tag`         | `String`        | String with tag in it                  |
| `obj.pattern`     | `String`        | Pattern to replace in tag              |

#### Example

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.stripTag('### Custom Tag !myCustomTag'); // ### Custom Tag
```

---
### `stripTagsInFile`

#### Description

Strips tags in a given file.

#### Signature

`stripTag(Object<data: String, pattern: String, string: String, replace: String|Function>) => String` 

#### Parameters

| Parameter(s)      | Type                | Description                            |
|:-----------------:|:-------------------:|:--------------------------------------:|
| `obj.data`        | `String`            | Data with tags to strip                |
| `obj.pattern`     | `String`            | Pattern to look for                    |
| `obj.string`      | `String`            | String to replace                      |
| `obj.replace`     | `String|Function`   | String or function to replace with     |

#### Example

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.stripTagsInFile({
	data: 'String with tags !ignore',
	pattern: <RegExp>,
	string: '!ignore'
});
```

---
### `writeFile`

#### Description

Writing contents to a file using the file path outlined in `markdown.json`.

#### Signature

`stripTag(parsedData: String) => Object<Promise>` 

#### Parameters

| Parameter(s)      | Type            | Description                            |
|:-----------------:|:---------------:|:--------------------------------------:|
| `parsedData`      | `String`        | String to write                        |

#### Example

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.writeFile('contents').then(function (data) {
	// continue...
});
```

---
# How To Make Plugins

Plugins are now supported as of 0.4.0 of markdown-include.  Adding plugins to markdown-include to facilitate the transformation of custom tags is quite trivial.

Plugins are best used when markdown-include is being required as a module.  If you wish to make this available via the command line, you must require markdown-include in a node module and call it from the command line.

## Tutorial

Let's pretend we want to add a custom tag called `!myTag` that follows the pattern of `#phrase !myTag`.  All we need to do is register the plugin with markdown-include

First, require markdown-include:

```javascript
var markdownInclude = require('markdown-include');
```

Second, register your plugin with with your desired pattern to match and desired replacement.  You can replace your tag with another string to do your desired work:

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.registerPlugin({
	pattern: /^#.+ !myTag/gm,
	replace: 'myString!'
});
```

In the example above, we're just replacing our tag with a string.  If you would rather use a function, you can do this like so (you must return a value to replace with):

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.registerPlugin({
	pattern: /^#.+ !myTag/gm,
	replace: function (tag) {
		// do something with tag...
		return 'myString!'
	}
});
```

`pattern` is the regular expression that should be looked for.  `replace` is your desired replacement for the tag once it's found.

This gives you free range to do whatever you want with the tag you want to replace.  Once the tag is encountered markdown-include will run the function.

After the tag and it's replacement is registered, it's business as usual:

```javascript
markdownInclude.compileFiles('../path/to/markdown.json').then(function () {
	// do something after compiling
});
```

You can also use another form of registering a plugins if it fits your coding style better:

```javascript
markdownInclude.registerPlugin(/^#.+ !myTag/gm, function (tag) {
	return 'my replacement!';
});
```


# How It Works

markdown-include works by recursively going through files based on the tags that are found.  For instance, consider the following in a `_README.md` file:

```
#include "first-file.md"
```

Let's also consider that `first-file.md` contains the following:

```
#include "third-file.md"
```

Let's also consider that `markdown.json` contains the following:

```json
{
	"build" : "README.md",
	"files" : ["_README.md"]
}
```

markdown-include will first read the contents of `_README.md` and look for include tags.  It will find `#include "first-file.md"` first.  From there it will parse the tag, open `first-fild.md` and find include tags in that file.  This process continues until no more include tags are found.  

At that point it will start over in the original file and parse other include tags if they exist.  Along the way, markdown-include will parse each file and keep a record of the contents.  Once the process is finished, a file will be written in `README.md` with all of the compiled content.

As you can see, you only need to reference one file which would be `_README.md`.  We didn't need to add `first-file.md` or `third-file.md`... markdown-include does that compiling for us by making an internal chain.

**NOTE**:  You must provide markdown-include with the entire file path you're trying to find in your working directory.  For example, if `first-file.md` and `third-file.md` were in the `docs` directory together and `first-file.md` was trying to include `third-file.md` you would need to do the following in `first-file.md`:

```
#include "docs/third-file.md"
```

This is because markdown-include doesn't make any assumptions about where your files are.  Use the correct paths or you could run into errors!