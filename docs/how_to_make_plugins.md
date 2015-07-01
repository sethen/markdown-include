# How To Make Plugins !heading

Plugins are now supported as of 0.4.0 of markdown-include.  Adding plugins to markdown-include to facilitate the transformation of custom tags is quite trivial.

Plugins are best used when markdown-include is being required as a module.  If you wish to make this available via the command line, you must require markdown-include in a node module and call it from the command line.

## Tutorial !heading

Let's pretend we want to add a custom tag called `!myTag` that follows the pattern of `#phrase !myTag`.  All we need to do is register the plugin with markdown-include

First, require markdown-include:

```javascript
var markdownInclude = require('markdown-include');
```

Second, register your plugin with with your desired pattern to match and desired replacement.  You can replace your tag with another string to do your desired work:

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.registerPlugin({
	pattern: /^#.+ !myTag/gm,
	replace: 'myString!'
});
```

In the example above, we're just replacing our tag with a string.  If you would rather use a function, you can do this like so (you must return a value to replace with):

```javascript
var markdownInclude = require('markdown-include');
markdownInclude.registerPlugin({
	pattern: /^#.+ !myTag/gm,
	replace: function (tag) {
		// do something with tag...
		return 'myString!'
	}
});
```

`pattern` is the regular expression that should be looked for.  `replace` is your desired replacement for the tag once it's found.

This gives you free range to do whatever you want with the tag you want to replace.  Once the tag is encountered markdown-include will run the function.

After the tag and it's replacement is registered, it's business as usual:

```javascript
markdownInclude.compileFiles('../path/to/markdown.json').then(function () {
	// do something after compiling
});
```

You can also use another form of registering a plugins if it fits your coding style better:

```javascript
markdownInclude.registerPlugin(/^#.+ !myTag/gm, function (tag) {
	return 'my replacement!';
});
```

