import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import CodeMirror from 'codemirror';

moduleForComponent('ivy-codemirror', 'Integration | Component | ivy-codemirror', {
  integration: true
});

test('it sets value on the CodeMirror editor', function(assert) {
  this.render(hbs`{{ivy-codemirror _onReady=(action (mut codeMirror)) value=value}}`);

  const codeMirror = this.get('codeMirror');

  this.set('value', 'foo');
  assert.equal(codeMirror.getValue(), 'foo');

  this.set('value', 'bar');
  assert.equal(codeMirror.getValue(), 'bar');
});

test('it sends an "onChange" action when CodeMirror "change" events occur', function(assert) {
  this.render(hbs`{{ivy-codemirror _onReady=(action (mut codeMirror)) onChange=(action (mut value))}}`);

  const codeMirror = this.get('codeMirror');

  codeMirror.setValue('foo');
  CodeMirror.signal(codeMirror, 'change', codeMirror);
  assert.equal(this.get('value'), 'foo');

  codeMirror.setValue('bar');
  CodeMirror.signal(codeMirror, 'change', codeMirror);
  assert.equal(this.get('value'), 'bar');
});

test('it refreshes when isVisible becomes true', function(assert) {
  this.render(hbs`{{ivy-codemirror _onReady=(action (mut codeMirror)) isVisible=isVisible}}`);

  const codeMirror = this.get('codeMirror');

  let refreshCalls = 0;
  codeMirror.refresh = function() {
    refreshCalls++;
  };

  this.set('isVisible', false);
  assert.equal(refreshCalls, 0);

  this.set('isVisible', true);
  assert.equal(refreshCalls, 1);
});

test('it sets options on the CodeMirror editor', function(assert) {
  this.render(hbs`{{ivy-codemirror _onReady=(action (mut codeMirror)) options=(hash lineNumbers=lineNumbers)}}`);

  const codeMirror = this.get('codeMirror');

  this.set('lineNumbers', true);
  assert.equal(codeMirror.getOption('lineNumbers'), true);

  this.set('lineNumbers', false);
  assert.equal(codeMirror.getOption('lineNumbers'), false);
});
