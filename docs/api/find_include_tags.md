### `findIncludeTags` !heading

#### Description

A method for finding include tags (`#include "my-include.md"`) in a string.

#### Signature

`findIncludeTags(data: String) => Array<String>`

#### Parameters

| Parameter(s)    | Type     | Description                                  |
|:---------------:|:--------:|:--------------------------------------------:|
| `data`          | `String` | Data with `#include "my-include.md"` tags    |

#### Example

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.findIncludeTags('#include "my-include.md"'); // [ '#include "my-include.md"' ]
```

---