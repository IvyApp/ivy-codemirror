/* eslint-env node */
'use strict';

module.exports = {
  name: 'ivy-codemirror',

  /*
   * Temporary workaround while there is a proper API for discovering
   * assets within an in-repo-engine.
   *
   * For more info see the following issues:
   *
   * - https://github.com/dgeb/ember-engines/issues/226
   * - https://github.com/miguelcobain/ember-leaflet/issues/106
   * - https://github.com/ember-cli/ember-cli/pull/5877
   *
   * Solution copied from ember-run-raf https://github.com/runspired/ember-run-raf/pull/14/files
   */
  _findHost: function() {
    var current = this;
    var app;

    // Keep iterating upward until we don't have a grandparent.
    // Has to do this grandparent check because at some point we hit the project.
    do {
      app = current.app || app;
    } while (current.parent.parent && (current = current.parent));

    return app;
  },

  included: function() {
    var app = this._findHost();

    var options = app.options.codemirror || {};
    var modes = options.modes || [];
    var keyMaps = options.keyMaps || [];
    var themes = options.themes || [];

    if (!process.env.EMBER_CLI_FASTBOOT) {
      app.import(app.bowerDirectory + '/codemirror/lib/codemirror.css');
      app.import(app.bowerDirectory + '/codemirror/lib/codemirror.js');
      app.import(app.bowerDirectory + '/codemirror/addon/mode/simple.js');
      app.import(app.bowerDirectory + '/codemirror/addon/mode/multiplex.js');
      app.import('vendor/htmlhandlebars.js');

      modes.forEach(function(mode) {
        app.import(app.bowerDirectory + '/codemirror/mode/' + mode + '/' + mode + '.js');
      });

      keyMaps.forEach(function(keyMap) {
        app.import(app.bowerDirectory + '/codemirror/keymap/' + keyMap + '.js');
      });

      themes.forEach(function(theme) {
        app.import(app.bowerDirectory + '/codemirror/theme/' + theme + '.css');
      });

      app.import('vendor/ivy-codemirror/shims.js', {
        exports: {
          'codemirror': ['default']
        }
      });
    }
  }
};
