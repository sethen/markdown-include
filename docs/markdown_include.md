# markdown-include !heading

markdown-include is built using Node.js and allows you to include markdown files into other markdown files using a C style include syntax.

## Compile your markdown files !heading

markdown-include's main feature is that it allows you to include allows you to include markdown files into other markdown files, like so:

```
#include "markdown-file.md" !ignore
#include "another-markdown-file.md" !ignore
```

Assuming that `markdown.file.md` contents are:

```
Something in markdown file!
```

And assuming that `another-markdown-file.md` contents are: 

```
Something in another markdown file!
``` 

It would compile to:

```
Something in markdown file!
Something in another markdown file!
```

## Make a table of contents !heading

Aside from compiling your markdown files, markdown-include can also build your table of contents.  This works by evaluating the heading tags inside of your files.  Since markdown works on using `#` for headings, this makes it easy to assemble table of contents from them.  The more `#` you have in front of your headings (up to 6) will decide how the table of contents is built.  Use one `#` and it's a top level navigation item... Use two `#` and it would be underneath the previous navigation item and so on.

For each heading that you would like to be included in a table of contents just add ` !heading` to the end of it.

