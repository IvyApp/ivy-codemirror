/* jshint node:true */

module.exports = {
  afterInstall: function() {
    return this.addBowerPackagesToProject([
      { name: 'codemirror', target: '~5.15.0' }
    ]);
  },

  normalizeEntityName: function() {
  }
};
