import CodeMirror from 'codemirror';
import Ember from 'ember';

export default Ember.Component.extend({
  /**
   * The value of the editor.
   *
   * @property value
   * @type {String}
   * @default null
   */
  value: null,

  tagName: 'textarea',

  becameVisible() {
    this._super(...arguments);

    // Force a refresh on `becameVisible`, since CodeMirror won't render itself
    // onto a hidden element.
    this._codeMirror.refresh();
  },

  didInsertElement() {
    this._super(...arguments);

    this._codeMirror = CodeMirror.fromTextArea(this.get('element'));

    // Set up handlers for CodeMirror events.
    this._bindCodeMirrorEvent('change', this, '_updateValue');

    // Private action used by tests. Do not rely on this in your apps.
    this.sendAction('_onReady', this._codeMirror);
  },

  didRender() {
    this._super(...arguments);

    this.updateCodeMirrorOptions();
    this.updateCodeMirrorValue();
  },

  updateCodeMirrorOption(option, value) {
    if (this._codeMirror.getOption(option) !== value) {
      this._codeMirror.setOption(option, value);
    }
  },

  updateCodeMirrorOptions() {
    const options = this.get('options');

    if (options) {
      Object.keys(options).forEach(function(option) {
        this.updateCodeMirrorOption(option, options[option]);
      }, this);
    }
  },

  updateCodeMirrorValue() {
    const value = this.get('value');

    if (value !== this._codeMirror.getValue()) {
      this._codeMirror.setValue(value || '');
    }
  },

  willDestroyElement() {
    this._super(...arguments);

    // Remove the editor and restore the original textarea.
    this._codeMirror.toTextArea();
  },

  /**
   * Bind a handler for `event`, to be torn down in `willDestroyElement`.
   *
   * @private
   * @method _bindCodeMirrorEvent
   */
  _bindCodeMirrorEvent(event, target, method) {
    const callback = Ember.run.bind(target, method);

    this._codeMirror.on(event, callback);

    this.on('willDestroyElement', this, function() {
      this._codeMirror.off(event, callback);
    });
  },

  /**
   * Update the `value` property when a CodeMirror `change` event occurs.
   *
   * @private
   * @method _updateValue
   */
  _updateValue(instance, changeObj) {
    const value = instance.getValue();
    this.set('value', value);
    this.sendAction('valueUpdated', value, instance, changeObj);
  }
});
