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
