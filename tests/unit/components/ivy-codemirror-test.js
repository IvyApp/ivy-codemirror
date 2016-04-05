import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('ivy-codemirror', {
  unit: true
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
