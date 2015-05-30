### `processIncludeTags` !heading

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