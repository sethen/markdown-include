### `stripTag` !heading

#### Description

Method for stripping tags in a string.

#### Signature

`stripTag(Object<tag: String, pattern, String) => String` 

#### Parameters

| Parameter(s)      | Type            | Description                            |
|:-----------------:|:---------------:|:--------------------------------------:|
| `obj.tag`         | `String`        | String with tag in it                  |
| `obj.pattern`     | `String`        | Pattern to replace in tag              |

#### Example

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.stripTag('### Custom Tag !myCustomTag'); // ### Custom Tag
```

---