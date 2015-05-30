### `processFile` !heading

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