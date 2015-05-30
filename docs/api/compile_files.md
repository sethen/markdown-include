### `compileFiles` !heading

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