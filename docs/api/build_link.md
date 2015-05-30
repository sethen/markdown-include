### `buildLink` !heading

#### Description

A method for making markdown style anchor tags.

#### Signature

`buildLink(title: String, anchor: String) => String`

#### Parameters

| Parameter(s)    | Type     | Description                          |
|:---------------:|:--------:|:------------------------------------:|
| `title`         | `String` | Title of markdown style link.        |
| `anchor`        | `String` | Markdown style anchor for linking.   |

#### Example

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.buildLink("My Link String", "#my-link-string"); // [My Link String](#my-link-string)
```

---