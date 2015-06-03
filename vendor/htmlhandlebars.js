// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("bower_components/codemirror/lib/codemirror"), 
      require("bower_components/codemirror/addon/mode/simple"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["bower_components/codemirror/lib/codemirror", 
      "bower_components/codemirror/addon/mode/simple"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  CodeMirror.defineMode("htmlhandlebars", function(config) {
    return CodeMirror.multiplexingMode(
      CodeMirror.getMode(config, "text/html"),
      {open: "{{", close: "}}",
       mode: CodeMirror.getMode(config, "handlebars"),
       parseDelimiters: true});
  });

  CodeMirror.defineMIME("text/x-handlebars-template", "htmlhandlebars");
});
