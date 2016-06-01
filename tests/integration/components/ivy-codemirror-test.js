import CodeMirror from 'codemirror';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('ivy-codemirror', 'Integration | Component | ivy-codemirror', {
  integration: true,

  beforeEach() {
    this.inject.service('code-mirror', { as: 'codeMirror' });
  }
});

test('it uses the `value` property to set the value of the CodeMirror instance', function(assert) {
  this.set('value', '1');
  this.render(hbs`{{ivy-codemirror id="ivy-codemirror-tests" value=value}}`);
  const instance = this.codeMirror.instanceFor('ivy-codemirror-tests');

  assert.equal(instance.getValue(), '1');

  this.set('value', '2');
  assert.equal(instance.getValue(), '2');
});

test('it sends a "valueUpdated" action when the value of the CodeMirror instance changes', function(assert) {
  assert.expect(1);

  this.on('valueUpdated', function(value) {
    assert.strictEqual(value, '2');
  });

  this.render(hbs`{{ivy-codemirror id="ivy-codemirror-tests" valueUpdated=(action "valueUpdated") value=value}}`);
  const instance = this.codeMirror.instanceFor('ivy-codemirror-tests');

  instance.setValue('2');
});

test('it maps a CodeMirror "change" event to an action via the `events` property', function(assert) {
  assert.expect(2);

  this.on('onChange', function(instance, changeObj) {
    assert.ok(instance instanceof CodeMirror, '1st argument is the CodeMirror instance');
    assert.propEqual(changeObj, {
      from: { ch: 0, line: 0 },
      origin: 'setValue',
      removed: [''],
      text: ['2'],
      to: { ch: 0, line: 0 }
    }, '2nd argument is the change object');
  });

  this.render(hbs`{{ivy-codemirror events=(hash change=(action "onChange")) id="ivy-codemirror-tests" value=value}}`);
  const instance = this.codeMirror.instanceFor('ivy-codemirror-tests');

  instance.setValue('2');
});

test('it refreshes when the `isVisible` property becomes true', function(assert) {
  this.render(hbs`{{ivy-codemirror id="ivy-codemirror-tests" isVisible=isVisible}}`);
  const instance = this.codeMirror.instanceFor('ivy-codemirror-tests');

  let refreshCalled = 0;
  instance.refresh = function() { refreshCalled++; };

  this.set('isVisible', false);
  assert.equal(refreshCalled, 0);

  this.set('isVisible', true);
  assert.equal(refreshCalled, 1);
});

test('it uses the `options` property to set options on the CodeMirror instance', function(assert) {
  this.set('lineNumbers', true);
  this.render(hbs`{{ivy-codemirror id="ivy-codemirror-tests" options=(hash lineNumbers=lineNumbers)}}`);
  const instance = this.codeMirror.instanceFor('ivy-codemirror-tests');

  assert.equal(instance.getOption('lineNumbers'), true);

  this.set('lineNumbers', false);
  assert.equal(instance.getOption('lineNumbers'), false);
});
