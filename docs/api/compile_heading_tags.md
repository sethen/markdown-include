### `compileHeadingTags` !heading

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