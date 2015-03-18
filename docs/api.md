## API !heading

When using as a module, markdown-include offers an API for you to work with markdown files as detailed below:

### `buildLinkString(str)`

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.buildLinkString("My Link String"); // my-link-string
```

| Parameter(s)    | Type     | Returns  | Description                                                            |
|:---------------:|:--------:|:---------|:----------------------------------------------------------------------:|
| `string`        | `String` | `String` | File path of where everything should be compiled, like `README.md`.    |

---
