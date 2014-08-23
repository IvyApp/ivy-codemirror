var distES6 = require('broccoli-dist-es6-module');

module.exports = distES6('lib', {
  global: 'ivy.codemirror',
  packageName: 'ivy-codemirror',
  main: 'main',
  shim: {
    'codemirror': 'CodeMirror',
    'ember': 'Ember'
  }
});
