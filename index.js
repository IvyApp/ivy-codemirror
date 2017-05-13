/* eslint-env node */
'use strict';

var path = require('path');

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

  defaultAddonConfig: {
    keyMaps: [],
    modes: [],
    themes: []
  },

  included: function() {
    var app = this._findHost();

    this.addonConfig = Object.assign({}, this.defaultAddonConfig);

    if (app.options.codemirror) {
      Object.assign(this.addonConfig, app.options.codemirror);
    }

    if (process.env.EMBER_CLI_FASTBOOT) {
      return;
    }

    this._super.included.apply(this, arguments);

    app.import('vendor/codemirror/lib/codemirror.js');
    app.import('vendor/codemirror/addon/mode/simple.js');
    app.import('vendor/codemirror/addon/mode/multiplex.js');
    app.import('vendor/htmlhandlebars.js');

    this.addonConfig.modes.forEach(function(mode) {
      app.import(path.join('vendor/codemirror/mode', mode, mode + '.js'));
    });

    this.addonConfig.keyMaps.forEach(function(keyMap) {
      app.import(path.join('vendor/codemirror/keymap', keyMap + '.js'));
    });

    app.import('vendor/ivy-codemirror/shims.js', {
      exports: {
        'codemirror': ['default']
      }
    });
  },

  options: {
    nodeAssets: {
      codemirror: function() {
        var modeScripts = this.addonConfig.modes.map(function(mode) {
          return path.join('mode', mode, mode + '.js');
        });

        var keyMapScripts = this.addonConfig.keyMaps.map(function(keyMap) {
          return path.join('keymap', keyMap + '.js');
        });

        var themeStyles = this.addonConfig.themes.map(function(theme) {
          return path.join('theme', theme + '.css');
        });

        return {
          import: ['lib/codemirror.css'].concat(themeStyles),
          vendor: [
            'lib/codemirror.js',
            'addon/mode/simple.js',
            'addon/mode/multiplex.js'
          ].concat(modeScripts, keyMapScripts)
        };
      }
    }
  }
};
