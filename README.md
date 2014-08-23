# ivy-codemirror

An [Ember][1] component for the excellent [CodeMirror][2] editor.

## Installation

```sh
$ npm install ivy-codemirror
```

or...

```sh
$ bower install ivy-codemirror
```

Then include the script(s) into your application.

### npm + browserify

```js
require('ivy-codemirror');
```

### amd

Register `ivy-codemirror` as a [package][3], then:

```js
define(['ivy-codemirror'], ...)
```

### named-amd

You ought to know what you're doing if this is the case.

### globals

```html
<script src="bower_components/ivy-codemirror/dist/globals/main.js"></script>
```

You'll also need to install the initializer to make the `ivy-codemirror`
component available in your templates:

```js
App = Ember.Application.create(/* ... */);
App.initializer(ivy.codemirror.initializer);
```

## Usage

```handlebars
{{ivy-codemirror value=myCode}}
```

There are also a handful of [CodeMirror options][4] you can bind to as well:

  * `autofocus`
  * `coverGutterNextToScrollbar`
  * `electricChars`
  * `extraKeys`
  * `firstLineNumber`
  * `fixedGutter`
  * `historyEventDelay`
  * `indentUnit`
  * `indentWithTabs`
  * `keyMap`
  * `lineNumbers`
  * `lineWrapping`
  * `mode`
  * `readOnly`
  * `rtlMoveVisually`
  * `showCursorWhenSelecting`
  * `smartIndent`
  * `tabSize`
  * `tabindex`
  * `theme`
  * `undoDepth`

## Contributing

```sh
$ git clone # <this repo>
$ npm install
$ npm test

# during dev
$ broccoli serve
# new tab
$ testem
```

Fork this repo, make a new branch, and send a pull request. Make sure your
change is tested or it won't be merged.

[1]: http://emberjs.com
[2]: http://codemirror.net
[3]: http://requirejs.org/docs/api.html#packages
[4]: http://codemirror.net/doc/manual.html#config
