/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-addon');
var pickFiles = require('broccoli-static-compiler');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
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

  /*
    This build file specifes the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  var bootstrapTree = pickFiles(app.bowerDirectory + '/bootstrap/dist', {
    destDir: '/assets',
    srcDir: '/'
  });

  return app.toTree([bootstrapTree]);
};
