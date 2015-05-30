### `findHeadingTags` !heading

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