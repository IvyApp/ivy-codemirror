import Component from './component';

export default {
  name: 'ivy-codemirror',

  initialize: function(container) {
    container.register('component:ivy-codemirror', Component);
  }
};
