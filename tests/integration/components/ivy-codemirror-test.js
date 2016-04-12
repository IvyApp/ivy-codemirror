import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import CodeMirrorService from 'ivy-codemirror/services/code-mirror';
import CodeMirror from 'codemirror';

const FakeCodeMirrorService = CodeMirrorService.extend({
  fromTextArea() {
    return (this.instance = this._super(...arguments));
  }
});

moduleForComponent('ivy-codemirror', 'Integration | Component | ivy-codemirror', {
  integration: true,

  beforeEach() {
    this.register('service:code-mirror', FakeCodeMirrorService);
    this.inject.service('code-mirror', { as: 'codeMirror' });
  }
});

test('it uses the `value` property to set the value of the CodeMirror instance', function(assert) {
  this.set('value', '1');
  this.render(hbs`{{ivy-codemirror value=value}}`);

  assert.equal(this.codeMirror.instance.getValue(), '1');

  this.set('value', '2');
  assert.equal(this.codeMirror.instance.getValue(), '2');
});

test('it sends an "onChange" action when the value of the CodeMirror instance changes', function(assert) {
  this.render(hbs`{{ivy-codemirror onChange=(action (mut value)) value=value}}`);

  this.codeMirror.instance.setValue('2');
  CodeMirror.signal(this.codeMirror.instance, 'change', this.codeMirror.instance);

  assert.equal(this.get('value'), '2');
});

test('it refreshes when the `isVisible` property becomes true', function(assert) {
  this.render(hbs`{{ivy-codemirror isVisible=isVisible}}`);

  let refreshCalled = 0;
  this.codeMirror.instance.refresh = function() {
    refreshCalled++;
  };

  this.set('isVisible', false);
  assert.equal(refreshCalled, 0);

  this.set('isVisible', true);
  assert.equal(refreshCalled, 1);
});

test('it uses the `options` property to set options on the CodeMirror instance', function(assert) {
  this.set('lineNumbers', true);
  this.render(hbs`{{ivy-codemirror options=(hash lineNumbers=lineNumbers)}}`);

  assert.equal(this.codeMirror.instance.getOption('lineNumbers'), true);

  this.set('lineNumbers', false);
  assert.equal(this.codeMirror.instance.getOption('lineNumbers'), false);
});
