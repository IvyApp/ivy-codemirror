# ivy-codemirror

[![Build Status](https://travis-ci.org/IvyApp/ivy-codemirror.svg?branch=master)](https://travis-ci.org/IvyApp/ivy-codemirror)
[![Ember Observer Score](http://emberobserver.com/badges/ivy-codemirror.svg)](http://emberobserver.com/addons/ivy-codemirror)

An [Ember](http://emberjs.com) component for the excellent [CodeMirror](http://codemirror.net) editor.

## Installation

```sh
ember install ivy-codemirror # install:addon for Ember CLI < 0.2.3
```

If you are using a version of Ember prior to 2.3, you will also need to install the `ember-hash-helper-polyfill` addon:

```sh
ember install ember-hash-helper-polyfill
```

## Usage

This addon provides an `ivy-codemirror` component which wraps a CodeMirror editor. You can set its `value` property to the code that you want to be displayed:

```handlebars
{{ivy-codemirror value=myCode}}
```

### Data Down, Actions Up

In the spirit of [Data Down, Actions Up](https://dockyard.com/blog/2015/10/14/best-practices-data-down-actions-up), the `value` **will not be modified directly**. Instead, when a CodeMirror `change` event occurs, a `valueUpdated` action will be sent, and will be given the new value as an argument. You might implement this action handler like so:

```handlebars
<!-- app/templates/index.hbs -->
{{ivy-codemirror value=myCode valueUpdated=(action "updateMyCode")}}
```

```javascript
// app/controllers/index.js
import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    updateMyCode(newCode) {
      this.set('myCode', newCode);
    }
  }
});
```

However, for this simple use case, Ember provides the built-in `mut` helper. You could use this helper in your template instead of writing the action handler yourself, like so:

```handlebars
<!-- app/templates/index.hbs -->
{{ivy-codemirror value=myCode valueUpdated=(action (mut myCode))}}
```

### Options

`ivy-codemirror` also allows passing [options](http://codemirror.net/doc/manual.html#config) to CodeMirror via the `options` property. The easiest way to do this is via Ember's built-in `hash` helper, like so:

```handlebars
{{ivy-codemirror options=(hash lineNumbers=true mode="javascript")}}
```

### Themes

By default, only CodeMirror's default theme (found in `codemirror.css`) is included. Additional themes can be included by specifying them in your `ember-cli-build.js` file:

```js
var app = new EmberApp({
  codemirror: {
    themes: ['solarized', 'twilight']
  }
});
```

The example above would include `themes/solarized.css` and `themes/twilight.css` into `vendor.css`.

### Modes & Key Maps

In addition to themes, you can also include language modes and key maps via the `modes` and `keyMaps` options, respectively:

```js
var app = new EmberApp({
  codemirror: {
    modes: ['javascript'],
    keyMaps: ['vim']
  }
});
```

The example above would include `mode/javascript/javascript.js` and `keymap/vim.js` into `vendor.js`.

### Addons

In addition to the above, you can also include any CodeMirror addon files like so:

```js
var app = new EmberApp({
  codemirror: {
    addonFiles: ['lint/lint.css', 'lint/lint.js']
  }
});
```

The above example would add `lint/lint.css` to `vendor.css` and `lint/lint.js` to `vendor.js`.

## Contributing

Fork this repo, make a new branch, and send a pull request. Make sure your change is tested or it won't be merged.

To run tests:

```sh
git clone # <this repo>
yarn install
yarn test
```

Or, to start a test server that continually runs (for development):

```sh
ember test --server
```
