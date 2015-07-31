/* jshint node: true */
/* global require, module */

var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
var pickFiles = require('broccoli-static-compiler');

/*
  This Brocfile specifes the options for the dummy test app of this
  addon, located in `/tests/dummy`

  This Brocfile does *not* influence how the addon or the app using it
  behave. You most likely want to be modifying `./index.js` or app's Brocfile
*/

var app = new EmberAddon({
  codemirror: {
    modes: [
      'apl', 'asterisk', 'clike', 'clojure', 'cobol', 'coffeescript',
      'commonlisp', 'css', 'cypher', 'd', 'diff', 'django', 'dtd', 'dylan',
      'ecl', 'eiffel', 'erlang', 'fortran', 'gas', 'gfm', 'gherkin', 'go',
      'groovy', 'haml', 'haskell', 'haxe', 'htmlembedded', 'htmlmixed', 'http',
      'idl', 'jade', 'javascript', 'jinja2', 'julia', 'kotlin', 'livescript',
      'lua', 'markdown', 'mirc', 'mllike', 'modelica', 'nginx', 'ntriples',
      'octave', 'pascal', 'pegjs', 'perl', 'php', 'pig', 'properties',
      'puppet', 'python', 'q', 'r', 'rpm', 'rst', 'ruby', 'rust', 'sass',
      'scheme', 'shell', 'sieve', 'slim', 'smalltalk', 'smarty', 'smartymixed',
      'solr', 'sparql', 'sql', 'stex', 'tcl', 'textile', 'tiddlywiki', 'tiki',
      'toml', 'tornado', 'turtle', 'vb', 'vbscript', 'velocity', 'verilog',
      'xml', 'xquery', 'yaml', 'z80'
    ],

    keyMaps: ['emacs', 'sublime', 'vim'],

    themes: [
      '3024-day', '3024-night', 'ambiance-mobile', 'ambiance', 'base16-dark',
      'base16-light', 'blackboard', 'cobalt', 'eclipse', 'elegant',
      'erlang-dark', 'lesser-dark', 'mbo', 'mdn-like', 'midnight', 'monokai',
      'neat', 'neo', 'night', 'paraiso-dark', 'paraiso-light',
      'pastel-on-dark', 'rubyblue', 'solarized', 'the-matrix',
      'tomorrow-night-eighties', 'twilight', 'vibrant-ink', 'xq-dark',
      'xq-light'
    ]
  }
});

var bootstrapTree = pickFiles(app.bowerDirectory + '/bootstrap/dist', {
  destDir: '/assets',
  srcDir: '/'
});

module.exports = app.toTree([bootstrapTree]);
