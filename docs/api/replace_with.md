### `replaceWith` !heading

#### Description

Utility method for transforming a string.

#### Signature

`replaceWith(Object<string: String, index: Number, preserve: Boolean, replacement: String>) => String`

#### Parameters

| Parameter(s)      | Type            | Description                            |
|:-----------------:|:---------------:|:--------------------------------------:|
| `obj.string`      | `String`        | String to transform                    |
| `obj.index`       | `Number`        | Index to start transformation to end   |
| `obj.preserve`    | `Boolean`       | Preserve original string               |
| `obj.replacement` | `String`        | String to use for replacement          |


#### Example

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.replaceWith({
	string: "string",
	index: 4,
	replacement: "myString"
}); // 'somemyString'
```

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.replaceWith({
	string: "string",
	index: 4,
	preserve: true,
	replacement: "myString"
}); // 'somemyStringthing'
```

---