### `writeFile` !heading

#### Description

Writing contents to a file using the file path outlined in `markdown.json`.

#### Signature

`stripTag(parsedData: String) => Object<Promise>` 

#### Parameters

| Parameter(s)      | Type            | Description                            |
|:-----------------:|:---------------:|:--------------------------------------:|
| `parsedData`      | `String`        | String to write                        |

#### Example

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.writeFile('contents').then(function (data) {
	// continue...
});
```

---