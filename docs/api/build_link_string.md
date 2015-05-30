### `buildLinkString` !heading

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