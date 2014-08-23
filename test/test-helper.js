emq.globalize();

setResolver(Ember.DefaultResolver.extend({
  testSubjects: {
    'component:ivy-codemirror': ivy.codemirror.Component
  },

  resolve: function(fullName) {
    return this.testSubjects[fullName] || this._super.apply(this, arguments);
  }
}).create());

document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');
