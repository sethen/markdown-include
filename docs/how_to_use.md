# How To Use !heading

markdown-include is very easy to use whether on the command line or in your own node project.  Each can help you compile your markdown files as you see fit.  markdown-include does require that you define a `markdown.json` file with your options for compile.  See below for all of the options available to you.

## From The Command Line !heading

Run from the command line to compile your documents like so:

```
node_modules/bin/cli.js path/to/markdown.json
```

## As A Module !heading

Just require in your node project:

```
var markdownInclude = require('markdown-include');
```

## markdown.json !heading

`markdown.json` can be populated with the following options:

| Option                    | Type    | Description                                                                |
|:-------------------------:|:-------:|:--------------------------------------------------------------------------:|
| `build`                   | String  | File path of where everything should be compiled, like `README.md`.        |
| `files`                   | Array   | Array of files to to compile.                                              |
| `tableOfContents`         | Object  | Object to hold options for table of contents generation.                   |
| `tableOfContents.heading` | String  | Heading for table of contents (use markdown syntax if desired).            |
| `tableOfContents.lead`    | String  | What navigation items in table of contents lead with.  If value is `number` will add numbers before each item and subitem.  If not, will add asterisks.  Refer to markdown syntax to understand the difference. |