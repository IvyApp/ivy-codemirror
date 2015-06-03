/* jshint node: true */
/* global require, module */

var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
var pickFiles = require('broccoli-static-compiler');

var app = new EmberAddon({
  codemirror: {
    modes: [
      'apl', 'asciiarmor', 'asn.1', 'asterisk', 'clike', 'cobol', 'clojure',
      'cmake', 'coffeescript', 'commonlisp', 'cypher', 'python', 'css', 'sql',
      'd', 'dart', 'diff', 'django', 'dockerfile', 'dtd', 'dylan', 'ebnf',
      'ecl', 'eiffel', 'htmlembedded', 'erlang', 'forth', 'fortran', 'mllike',
      'gas', 'gherkin', 'gfm', 'go', 'groovy', 'haml', 'haskell', 'haxe',
      'htmlmixed', 'http', 'idl', 'jade', 'javascript', 'jinja2', 'julia',
      'kotlin', 'livescript', 'lua', 'markdown', 'mirc', 'mathematica',
      'modelica', 'mumps', 'nginx', 'ntriples', 'octave', 'pascal', 'pegjs',
      'perl', 'php', 'pig', 'properties', 'puppet', 'q', 'r', 'rst', 'rpm',
      'ruby', 'rust', 'sass', 'scheme', 'shell', 'sieve', 'slim', 'smalltalk',
      'smarty', 'solr', 'soy', 'sparql', 'spreadsheet', 'stex', 'verilog',
      'tcl', 'textile', 'tiddlywiki', 'tiki', 'toml', 'tornado', 'troff',
      'ttcn', 'ttcn-cfg', 'turtle', 'vb', 'vbscript', 'velocity', 'xml',
      'xquery', 'yaml', 'z80'
    ],

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

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

var bootstrapTree = pickFiles(app.bowerDirectory + '/bootstrap/dist', {
  destDir: '/assets',
  srcDir: '/'
});

module.exports = app.toTree([bootstrapTree]);
