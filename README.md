# ivy-codemirror

[![Build Status](https://travis-ci.org/IvyApp/ivy-codemirror.svg?branch=master)](https://travis-ci.org/IvyApp/ivy-codemirror)

An [Ember](http://emberjs.com) component for the excellent
[CodeMirror](http://codemirror.net) editor.

## Installation

As an [ember-cli](http://www.ember-cli.com/) addon:

```sh
npm install --save-dev ivy-codemirror
ember generate ivy-codemirror
```

Or if you aren't using ember-cli, you can use this library as a standalone
[Bower](http://bower.io/) package:

```sh
bower install --save ivy-codemirror
```

...and then add the `ivy-codemirror.js` script to your page.

## Usage

```handlebars
{{ivy-codemirror value=myCode}}
```

There are also a handful of
[CodeMirror options](http://codemirror.net/doc/manual.html#config) you can bind
to as well:

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

### Themes / Modes

By default, only `codemirror.css` (CodeMirror's default theme) is included. To
include more themes, modes, and key maps, add `codemirror` options to `Brocfile.js` inside
your app:

```js
var app = new EmberApp({
  codemirror: {
    modes: ['javascript'],
    keyMaps: ['vim'],
    themes: ['solarized']
  }
});
```

The above example would pull in `mode/javascript/javascript.js`,
`keymap/vim.js`, `theme/solarized.css` from CodeMirror and add them to
`vendor.js` and `vendor.css`, respectively.

## Contributing

Fork this repo, make a new branch, and send a pull request. Make sure your
change is tested or it won't be merged.

To run tests:

```sh
git clone # <this repo>
npm install
npm test
```

Or, to start a test server that continually runs (for development):

```sh
ember test --server
```
