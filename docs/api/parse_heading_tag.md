### `parseHeadingTag` !heading

#### Description

Parses a heading tag based on the amount of asterisks present before it (`### Heading`)

#### Signature

`parseHeadingTag(headingTag: String) => Object<count: Number, headingTag: String>`

#### Parameters

| Parameter(s)    | Type     | Description                                  |
|:---------------:|:--------:|:--------------------------------------------:|
| `headingTag`    | `String` | Heading tag to parse                         |

#### Example

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.parseHeadingTag('### Heading'); // { count: 3, headingTag: 'Heading' }
```

---