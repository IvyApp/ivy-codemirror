import CodeMirror from 'codemirror';
import Service from 'ember-service';

export default Service.extend({
  init() {
    this._super(...arguments);
    this._instances = Object.create(null);
  },

  fromTextArea(id, textarea) {
    return this.registerInstance(id, CodeMirror.fromTextArea(textarea));
  },

  instanceFor(id) {
    return this._instances[id];
  },

  registerInstance(id, instance) {
    this._instances[id] = instance;

    return instance;
  },

  signal(emitter, type, ...values) {
    CodeMirror.signal(emitter, type, ...values);
  },

  unregisterInstance(id) {
    delete this._instances[id];
  }
});
