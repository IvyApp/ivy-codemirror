import Component from 'ember-component';
import injectService from 'ember-service/inject';
import { bind, once } from 'ember-runloop';

export default Component.extend({
  tagName: 'textarea',

  codeMirror: injectService(),

  becameVisible() {
    this._super(...arguments);

    // Force a refresh on `becameVisible`, since CodeMirror won't render itself
    // onto a hidden element.
    this._codeMirror.refresh();
  },

  didInsertElement() {
    this._super(...arguments);

    this._codeMirror = this.get('codeMirror').fromTextArea(this.get('elementId'), this.get('element'));

    // Send a "valueUpdated" action when CodeMirror triggers a "change" event.
    this.setupCodeMirrorEventHandler('change', this, this.scheduleValueUpdatedAction);

    const events = this.get('events');

    if (events) {
      Object.keys(events).forEach(function(eventName) {
        this.setupCodeMirrorEventHandler(eventName, this, events[eventName]);
      }, this);
    }
  },

  didRender() {
    this._super(...arguments);

    this.updateCodeMirrorOptions();
    this.updateCodeMirrorValue();
  },

  scheduleValueUpdatedAction(codeMirror, changeObj) {
    once(this, this.sendValueUpdatedAction, codeMirror.getValue(), codeMirror, changeObj);
  },

  setupCodeMirrorEventHandler(event, target, method) {
    const callback = bind(target, method);

    this._codeMirror.on(event, callback);

    this.one('willDestroyElement', this, function() {
      this._codeMirror.off(event, callback);
    });
  },

  sendValueUpdatedAction(...args) {
    this.sendAction('valueUpdated', ...args);
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

    this.get('codeMirror').unregisterInstance(this.get('elementId'));

    delete this._codeMirror;
  }
});
