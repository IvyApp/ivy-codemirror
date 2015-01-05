/* jshint node:true */

var autoRegister = require('broccoli-ember-auto-register');
var compileES6 = require('broccoli-es6-concatenator');
var es3Safe = require('broccoli-es3-safe-recast');
var iife = require('broccoli-iife');
var mergeTrees = require('broccoli-merge-trees');
var packageInfo = require('../package.json');
var pickFiles = require('broccoli-static-compiler');
var replace = require('broccoli-replace');

var addonTree = pickFiles('../addon', {
  destDir: packageInfo.name,
  files: ['**/*.js'],
  srcDir: '/'
});

var registryTree = pickFiles(addonTree, {
  destDir: '/',
  files: ['components/**/*.js'],
  srcDir: packageInfo.name
});
registryTree = autoRegister(registryTree, {
  moduleName: packageInfo.name + '-shim',
  modulePrefix: packageInfo.name,
  outputFile: 'registry.js'
});

var loaderTree = pickFiles('../bower_components', {
  destDir: '/',
  files: ['loader.js'],
  srcDir: '/loader.js'
});

var glueTree = pickFiles('.', {
  destDir: '/',
  files: ['glue.js'],
  srcDir: '/'
});

var jsTree = mergeTrees([addonTree, glueTree, loaderTree, registryTree]);

var es6Tree = compileES6(jsTree, {
  ignoredModules: ['codemirror', 'ember'],
  inputFiles: [packageInfo.name + '/**/*.js'],
  legacyFilesToAppend: ['registry.js', 'glue.js'],
  loaderFile: 'loader.js',
  outputFile: '/' + packageInfo.name + '.js',
  wrapInEval: false
});
es6Tree = es3Safe(es6Tree);
es6Tree = iife(es6Tree);

var packagingTree = pickFiles('package_manager_files', {
  destDir: '/',
  srcDir: '/'
});

var distTree = mergeTrees([es6Tree, packagingTree]);
distTree = replace(distTree, {
  files: ['**/*.js', '**/*.json'],
  patterns: [
    { match: /VERSION_STRING_PLACEHOLDER/g, replacement: packageInfo.version }
  ]
});

module.exports = distTree;
