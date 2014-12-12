import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  lineNumbers: true,
  lineWrapping: false,
  mode: 'javascript',
  readOnly: false,
  smartIndent: true,
  tabSize: 4,
  theme: 'ambiance',
  value: config.APP.codeSample,

  modes: Ember.A([
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
  ]),

  themes: Ember.A([
    '3024-day', '3024-night', 'ambiance-mobile', 'ambiance', 'base16-dark',
    'base16-light', 'blackboard', 'cobalt', 'eclipse', 'elegant',
    'erlang-dark', 'lesser-dark', 'mbo', 'mdn-like', 'midnight', 'monokai',
    'neat', 'neo', 'night', 'paraiso-dark', 'paraiso-light',
    'pastel-on-dark', 'rubyblue', 'solarized', 'the-matrix',
    'tomorrow-night-eighties', 'twilight', 'vibrant-ink', 'xq-dark',
    'xq-light'
  ])
});
