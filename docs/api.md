## API !heading

When using as a module, markdown-include offers an API for you to work with markdown files as detailed below:

### `buildLinkString(str)`

| Parameter(s)    | Type     | Returns  | Description                                                            |
|:---------------:|:--------:|:---------|:----------------------------------------------------------------------:|
| `string`        | `String` | `String` | File path of where everything should be compiled, like `README.md`.    |

#### Description

A method for taking strings and building friendly markdown links.  This is mostly used internally for building the table of contents.

#### Example

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.buildLinkString("My Link String"); // my-link-string
```

---

### `compileFiles(path)`

| Parameter(s)   | Type     | Returns   | Description                                                            |
|:--------------:|:--------:|:------------------|:----------------------------------------------------------------------:|
| `path`        | `String` | `Object (Promise)` | Compiles files when given the path to `markdown.json`    |

#### Description

This is probably the most important method in markdown-include.  It takes a path to your markdown.json file, reads your options and returns a promise.  When the promise is resolved it returns the data to you.  This is exactly the same as running markdown-include in the command line as it runs through the whole lifecycle.

#### Example

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.compileFiles("path/to/markdown.json").then(function (data) {
	// do something with compiled files
});
```

