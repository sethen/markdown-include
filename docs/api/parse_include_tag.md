### `parseIncludeTag` !heading

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