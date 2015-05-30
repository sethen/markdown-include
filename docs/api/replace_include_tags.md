### `replaceIncludeTags` !heading

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