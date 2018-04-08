### `compileFolders` !heading

#### Description

This function processes an entire folder of files and writes the final files to another folder.  It takes a path to your folder to process, the folder to write the final files to and returns a promise.  When the promise is resolved it returns the data to you.  This is exactly the same as running markdown-include in the command line as it runs through the whole life cycle.

#### Signature

`compileFiles(path: String) => Object<Promise>` 

#### Parameters

| Parameter(s)   | Type     | Description                                              |
|:--------------:|:--------:|:--------------------------------------------------------:|
| `inDir`        | `String` | Folder to read the files from to be processed            |
| `outDir`       | `String` | Folder to write the final files to                       |

#### Example

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.compileFolders("folder/to/process", "folder/to/writeTo").then(function (data) {
	// do something with compiled files
});
```

---