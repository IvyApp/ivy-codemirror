/* global CodeMirror */
import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('ivy-codemirror');

test('should update value property when CodeMirror changes', function() {
  var component = this.subject();
  this.append();

  var codeMirror = component.get('codeMirror');

  Ember.run(function() {
    codeMirror.setValue('1 + 1');
    CodeMirror.signal(codeMirror, 'change', codeMirror);
  });

  equal(component.get('value'), '1 + 1', 'value is updated');
});

test('should update CodeMirror value when value property is changed', function() {
  var component = this.subject();
  this.append();

  var codeMirror = component.get('codeMirror');
  equal(codeMirror.getValue(), '', 'precond - value is empty');

  Ember.run(function() {
    component.set('value', '1 + 1');
  });

  equal(codeMirror.getValue(), '1 + 1', 'value is updated');
});

function optionTest(key, beforeValue, afterValue) {
  test('should update CodeMirror ' + key + ' option when ' + key + ' property changes', function() {
    var component = this.subject();
    this.append();

    var codeMirror = component.get('codeMirror');
    equal(codeMirror.getOption(key), beforeValue,
          'precond - initial value of ' + key + ' option is correct');

    Ember.run(function() {
      component.set(key, afterValue);
    });

    equal(codeMirror.getOption(key), afterValue,
          key + ' option is updated after ' + key + ' property is changed');
  });

  test('should update CodeMirror ' + key + ' option when bound to a property whose dependencies change', function() {
    var context = Ember.Object.createWithMixins({
      actualValue: beforeValue,
      computedValue: Ember.computed.readOnly('actualValue')
    });

    var componentOptions = { foo: context };
    componentOptions[key + 'Binding'] = 'foo.computedValue';
    var component = this.subject(componentOptions);
    this.append();

    var codeMirror = component.get('codeMirror');
    equal(codeMirror.getOption(key), beforeValue,
          'precond - initial value of ' + key + ' option is correct');

    Ember.run(function() {
      context.set('actualValue', afterValue);
    });

    equal(codeMirror.getOption(key), afterValue,
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

test('should refresh when isVisible becomes true', function() {
  var component = this.subject();
  this.append();

  var codeMirror = component.get('codeMirror'),
      refreshCalls = 0;

  codeMirror.refresh = function() {
    refreshCalls++;
  };

  Ember.run(function() {
    component.set('isVisible', false);
  });
  equal(refreshCalls, 0);

  Ember.run(function() {
    component.set('isVisible', true);
  });
  equal(refreshCalls, 1);
});
