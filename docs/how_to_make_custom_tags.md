# How To Make Custom Tags !heading

Custom tags are now supported as of 0.3.2 of markdown-include.  Adding custom tags to your documentation is quite easy to do.

Custom tags can only be used when markdown-include is being required as a module.  If you wish to make this available via the command line, you must require markdown-include in a node module and call it from the command line.

## Tutorial !heading

Let's pretend we want to add a custom tag called `!myTag` that follows the pattern of `#phrase !myTag`.  We need to register the custom tag with markdown-include in it's `customTags` array.

First, require markdown-include:

```javascript
var markdownInclude = require('markdown-include');
```

Second, register your tag with your desired replacement.  You can replace your tag with either another string or use a function to do your desired work.  This is done with objects added to an array, like so:

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.customTags.push({
	pattern: /^#.+ !myTag/gm,
	replacement: 'myString!'
});
```

`pattern` is the regular expression that should be looked for.  `replacement` is your desired replacement for the tag once it's found.  In the example above, we're just replacing our tag with a string.  If you would rather use a function, you can do this like so:

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.customTags.push({
	pattern: /^#.+ !myTag/gm,
	replacement: function (tag) {
		// do something with tag...
	}
});
```

This gives you free range to do whatever you want with the tag in question.  Once the tag is encountered markdown-include will run the function.

After the tag and it's replacement is registed, it's business as usual:

```javascript
markdownInclude.compileFiles('../path/to/markdown.json').then(function () {
	// do something after compiling
});
```

