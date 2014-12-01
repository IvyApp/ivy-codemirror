/* global require, module */

var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

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
app.import('bower_components/bootstrap/dist/css/bootstrap.css');
app.import('bower_components/bootstrap/dist/css/bootstrap.css.map');

module.exports = app.toTree();
