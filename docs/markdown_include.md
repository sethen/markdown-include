# markdown-include

markdown-include is built using Node.js and allows you to include markdown files into other markdown files using a C style include syntax:

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

