# ivy-codemirror

[![Build Status](https://travis-ci.org/IvyApp/ivy-codemirror.svg?branch=master)](https://travis-ci.org/IvyApp/ivy-codemirror)
[![Ember Observer Score](http://emberobserver.com/badges/ivy-codemirror.svg)](http://emberobserver.com/addons/ivy-codemirror)

An [Ember](http://emberjs.com) component for the excellent
[CodeMirror](http://codemirror.net) editor.

## Installation

```sh
ember install ivy-codemirror # install:addon for Ember CLI < 0.2.3
```

If you are using a version of Ember prior to 2.3, you will also need to install
the `ember-hash-helper-polyfill` addon:

```sh
ember install ember-hash-helper-polyfill
```

## Usage

```handlebars
{{ivy-codemirror value=myCode}}
```

### Options

`ivy-codemirror` also allows passing
[options](http://codemirror.net/doc/manual.html#config) to CodeMirror via the
`options` property. The easiest way to do this is via Ember's built-in `hash`
helper, like so:

```handlebars
{{ivy-codemirror options=(hash lineNumbers=true mode="javascript")}}
```

### Themes / Modes

By default, only `codemirror.css` (CodeMirror's default theme) is included. To
include more themes, modes, and key maps, add `codemirror` options to `ember-cli-build.js` inside
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
