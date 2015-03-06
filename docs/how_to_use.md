# How To Use !heading

markdown-include is very easy to use.  Just include a `markdown.json` file in your project root with your options and run from the command line to compile your documents like so:

```
node path/to/markdown-include.js path/to/markdown.json
```

## markdown.json !heading

`markdown.json` can be populated with the following options:

| Option                    | Type          | Description                                                                |
|:-------------------------:|:-------------:|:--------------------------------------------------------------------------:|
| `build`                   | String        | File path of where everything should be compiled, like `README.md`         |
| `files`                   | Array         | Array of files to to compile                                               |
| `tableOfContents`         | Object        | Object to hold options for table of contents generation                    |
| `tableOfContents.heading` | String        | Heading for table of contents (use markdown syntax if desired)             |