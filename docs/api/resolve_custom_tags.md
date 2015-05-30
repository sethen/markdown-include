### `resolveCustomTags` !heading

#### Description

Method for resolving custom tags.  Looks in `customTags` object attached to markdown include module.

#### Signature

`resolveCustomTags(data: String) => String` 

#### Parameters

| Parameter(s)      | Type            | Description                            |
|:-----------------:|:---------------:|:--------------------------------------:|
| `data`            | `String`        | String with custom tags                |


#### Example

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.resolveCustomTags('### Custom Tag !myCustomTag');
```

---