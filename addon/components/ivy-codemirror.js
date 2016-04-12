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
    this.setupCodeMirrorEventHandler('change', this, this.codeMirrorOnChange);

    // Private action used by tests. Do not rely on this in your apps.
    this.sendAction('_onReady', this._codeMirror);
  },

  didRender() {
    this._super(...arguments);

    this.updateCodeMirrorOptions();
    this.updateCodeMirrorValue();
  },

  codeMirrorOnChange(codeMirror, changeObj) {
    const value = codeMirror.getValue();

    this.set('value', value);
    this.sendAction('valueUpdated', value, codeMirror, changeObj);
  },

  setupCodeMirrorEventHandler(event, target, method) {
    const callback = Ember.run.bind(target, method);

    this._codeMirror.on(event, callback);

    this.one('willDestroyElement', this, function() {
      this._codeMirror.off(event, callback);
    });
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

    delete this._codeMirror;
  }
});
