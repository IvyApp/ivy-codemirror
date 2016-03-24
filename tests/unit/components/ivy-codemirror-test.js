import CodeMirror from 'codemirror';
import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('ivy-codemirror', {
  unit: true
});

test('should update value property when CodeMirror changes', function(assert) {
  const component = this.subject();
  this.render();

  const codeMirror = component.get('codeMirror');

  Ember.run(function() {
    codeMirror.setValue('1 + 1');
    CodeMirror.signal(codeMirror, 'change', codeMirror);
  });

  assert.equal(component.get('value'), '1 + 1', 'value is updated');
});

test('should send valueUpdated action when CodeMirror changes', function(assert) {
  assert.expect(3);

  const targetObject = Ember.Object.extend({
    called: false,
    valueUpdated(value, instance) {
      assert.equal(value, '1 + 1', 'value is passed to valueUpdated');
      assert.ok(instance instanceof CodeMirror, '1 + 1', 'CodeMirror editor instance is passed to valueUpdated');
      assert.equal(arguments.length, 3, '3 arguments are passed to valueUpdated');
    }
  }).create();

  const component = this.subject({ targetObject: targetObject, valueUpdated: "valueUpdated" });
  this.render();

  const codeMirror = component.get('codeMirror');

  Ember.run(function() {
    codeMirror.setValue('1 + 1'); // this triggers a change event
  });
});

test('should update CodeMirror value when value property is changed', function(assert) {
  const component = this.subject();
  this.render();

  const codeMirror = component.get('codeMirror');
  assert.equal(codeMirror.getValue(), '', 'precond - value is empty');

  Ember.run(function() {
    component.set('value', '1 + 1');
  });

  assert.equal(codeMirror.getValue(), '1 + 1', 'value is updated');
});

function optionTest(key, beforeValue, afterValue) {
  test('should update CodeMirror ' + key + ' option when ' + key + ' property changes', function(assert) {
    const component = this.subject();
    this.render();

    const codeMirror = component.get('codeMirror');
    assert.equal(
      codeMirror.getOption(key), beforeValue,
      'precond - initial value of ' + key + ' option is correct');

    Ember.run(function() {
      component.set(key, afterValue);
    });

    assert.equal(
      codeMirror.getOption(key), afterValue,
      key + ' option is updated after ' + key + ' property is changed');
  });

  test('should update CodeMirror ' + key + ' option when bound to a property whose dependencies change', function(assert) {
    const context = Ember.Object.extend({
      computedValue: Ember.computed.readOnly('actualValue')
    }).create({
      actualValue: beforeValue
    });

    const componentOptions = { foo: context };
    componentOptions[key + 'Binding'] = 'foo.computedValue';
    const component = this.subject(componentOptions);
    this.render();

    const codeMirror = component.get('codeMirror');
    assert.equal(
      codeMirror.getOption(key), beforeValue,
      'precond - initial value of ' + key + ' option is correct');

    Ember.run(function() {
      context.set('actualValue', afterValue);
    });

    assert.equal(
      codeMirror.getOption(key), afterValue,
      key + ' option is updated after ' + key + ' property is changed');
  });
}

optionTest('autofocus', false, true);
optionTest('coverGutterNextToScrollbar', false, true);
optionTest('electricChars', true, false);
optionTest('extraKeys', null, 'basic');
optionTest('firstLineNumber', 1, 2);
optionTest('fixedGutter', true, false);
optionTest('historyEventDelay', 1250, 500);
optionTest('indentUnit', 2, 4);
optionTest('indentWithTabs', false, true);
optionTest('keyMap', 'default', 'basic');
optionTest('lineNumbers', false, true);
optionTest('lineWrapping', false, true);
optionTest('mode', null, 'ruby');
optionTest('readOnly', false, true);
optionTest('rtlMoveVisually', true, false);
optionTest('showCursorWhenSelecting', false, true);
optionTest('smartIndent', true, false);
optionTest('tabSize', 4, 2);
optionTest('tabindex', null, 1);
optionTest('theme', 'default', 'twilight');
optionTest('undoDepth', 200, 100);

test('should refresh when isVisible becomes true', function(assert) {
  const component = this.subject();
  this.render();

  const codeMirror = component.get('codeMirror');
  let refreshCalls = 0;

  codeMirror.refresh = function() {
    refreshCalls++;
  };

  Ember.run(function() {
    component.set('isVisible', false);
  });
  assert.equal(refreshCalls, 0);

  Ember.run(function() {
    component.set('isVisible', true);
  });
  assert.equal(refreshCalls, 1);
});
