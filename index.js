/* eslint-env node */
'use strict';

var path = require('path');

module.exports = {
  init: function() {
    this._super.init && this._super.init.apply(this, arguments);

    if ('codemirror' in this.project.bowerDependencies()) {
      this.ui.writeWarnLine('CodeMirror is now provided by node_module `ivy-codemirror`, please remove it from bower');
    }
  },

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
    addonFiles: [],
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

    // These 2 addons are needed by the custom htmlhandlebars mode, so we need
    // to ensure that they're loaded even if they weren't specified by the app.
    if (this.addonConfig.addonFiles.indexOf('mode/simple.js') === -1) {
      this.addonConfig.addonFiles.push('mode/simple.js');
    }
    if (this.addonConfig.addonFiles.indexOf('mode/multiplex.js') === -1) {
      this.addonConfig.addonFiles.push('mode/multiplex.js');
    }

    this.addonConfig.addonFiles.forEach(function(addonFile) {
      if (path.extname(addonFile) !== '.js') {
        return;
      }

      app.import(path.join('vendor/codemirror/addon', addonFile));
    });

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
        var addonScripts = this.addonConfig.addonFiles.filter(function(addonFile) {
          return path.extname(addonFile) === '.js';
        }).map(function(addonFile) {
          return path.join('addon', addonFile);
        });

        var addonStyles = this.addonConfig.addonFiles.filter(function(addonFile) {
          return path.extname(addonFile) === '.css';
        }).map(function(addonFile) {
          return path.join('addon', addonFile);
        });

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
          import: ['lib/codemirror.css'].concat(addonStyles, themeStyles),
          vendor: [
            'lib/codemirror.js',
            'addon/mode/simple.js',
            'addon/mode/multiplex.js'
          ].concat(addonScripts, modeScripts, keyMapScripts)
        };
      }
    }
  }
};
