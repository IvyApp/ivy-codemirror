import CodeMirror from 'codemirror';
import Ember from 'ember';

export default Ember.Service.extend({
  fromTextArea(textarea) {
    return CodeMirror.fromTextArea(textarea);
  }
});
