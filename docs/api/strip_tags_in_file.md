### `stripTagsInFile` !heading

#### Description

Strips tags in a given file.

#### Signature

`stripTag(Object<data: String, pattern: String, string: String, replace: String|Function>) => String` 

#### Parameters

| Parameter(s)      | Type                | Description                            |
|:-----------------:|:-------------------:|:--------------------------------------:|
| `obj.data`        | `String`            | Data with tags to strip                |
| `obj.pattern`     | `String`            | Pattern to look for                    |
| `obj.string`      | `String`            | String to replace                      |
| `obj.replace`     | `String|Function`   | String or function to replace with     |

#### Example

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.stripTagsInFile({
	data: 'String with tags !ignore',
	pattern: <RegExp>,
	string: '!ignore'
});
```

---