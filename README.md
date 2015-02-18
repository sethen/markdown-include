# markdown-include

markdown-include is built using Node.js and allows you to include markdown files into other markdown files using a C style include syntax:

```
#include "markdown-file.md"
#include "another-markdown-file.md"
```

Assuming that `markdown.file.md` contents are `Something in markdown file!` and `another-markdown-file.md` contents are `Something in another markdown file!` it would compile to:

```
Something in markdown file!
Something in another markdown file!
```


# How To Use

markdown-include is very easy to use.  Just include a `markdown.json` file in your project root with your options and run from the command line to compile your documents.

## markdown.json

`markdown.json` can be populated with the following options:

| Option        | Type          | Description                                              |
|:-------------:|:-------------:|:--------------------------------------------------------:|
| `build`       | String        | File path of where everything should be compiled         |
| `files`       | Array         | Array of files to to compile                             |


# How It Works

markdown-include works by recursively going through files based on the tags that are found.  For instance, considering the following in a `_README.md` file:

```
#include "first-file.md"
```

Let's also consider that `first-file.md` contains the following:

```
#include "third-file.md"
```

Let's also consider that `markdown.json` contains the following:

```json
{
	"build" : "README.md",
	"files" : ["_README.md"]
}
```

markdown-include will first read the contents of `_README.md` and look for include tags.  It will find `#include "first-file.md"` first.  From there it will parse the tag, open `first-fild.md` and find include tags in that file.  This process continues until no more include tags are found.  

At that point it will start over in the original file and parse other include tags if they exist.  Along the way, markdown-include will parse each file and keep a record of the contents.  Once the process is finished, a file will be written in `README.md` with all of the compiled content.

As you can see, you only need to reference one file which would be `_README.md`.  We didn't need to add `first-file.md` or `third-file.md`... markdown-include does that compiling for us by making an internal chain.

