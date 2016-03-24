/* jshint node:true */

module.exports = {
  afterInstall: function() {
    return this.addBowerPackagesToProject([
      { name: 'codemirror', target: '~5.13.0' }
    ]);
  },

  normalizeEntityName: function() {
  }
};
