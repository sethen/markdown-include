## markdown.json !heading

`markdown.json` can be populated with the following options:

| Option                    | Type    | Description                                                                |
|:-------------------------:|:-------:|:--------------------------------------------------------------------------:|
| `build`                   | String  | File path of where everything should be compiled, like `README.md`.        |
| `files`                   | Array   | Array of files to to compile.                                              |
| `tableOfContents`         | Object  | Object to hold options for table of contents generation.                   |
| `tableOfContents.heading` | String  | Heading for table of contents (use markdown syntax if desired).            |
| `tableOfContents.lead`    | String  | What navigation items in table of contents lead with.  If value is `number` will add numbers before each item and subitem.  If not, will add asterisks.  Refer to markdown syntax to understand the difference. |