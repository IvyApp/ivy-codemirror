# ivy-codemirror

## 2.1.0 (May 13, 2017)

* [#29](https://github.com/IvyApp/ivy-codemirror/pull/29) CodeMirror addon support
* [#28](https://github.com/IvyApp/ivy-codemirror/pull/28) Remove Bower
* [#27](https://github.com/IvyApp/ivy-codemirror/pull/27) Upgrade to Ember CLI 2.13

## 2.0.4 (May 12, 2017)

* [#24](https://github.com/IvyApp/ivy-codemirror/pull/24) Fix this.import() issue for nested addons

## 2.0.3 (November 9, 2016)

* [#23](https://github.com/IvyApp/ivy-codemirror/pull/23) Upgrade to Ember CLI 2.9.1

## 2.0.2 (June 1, 2016)

* [#19](https://github.com/IvyApp/ivy-codemirror/pull/19) Put back missing params for valueUpdated

## 2.0.1 (May 31, 2016)

* [#18](https://github.com/IvyApp/ivy-codemirror/pull/18) Lazy Fastboot compatibility

## 2.0.0 (May 31, 2016)

* Bump CodeMirror version to 5.15.x.
* Ensure `valueUpdated` is in the `actions` queue. This prevents `value` from
  being changed within `didInsertElement`, which would cause Ember to emit a
  deprecation warning.
* Move CodeMirror initialization into a `code-mirror` service.
* Following DDAU (Data Down, Actions Up), `ivy-codemirror` no longer sets its
  `value` property directly. Instead, it sends the `valueUpdated` action and
  expects the caller to handle changing the value.
* Update value via `didRender` rather than observers.
* Change how options are specified. Instead of setting individual options, such
  as `autofocus`, `mode`, etc., `ivy-codemirror` now accepts an `options`
  property, which is expected to be a hash of options.

## 1.4.0 (March 24, 2016)

* Bump CodeMirror version to 5.13.x.
* Remove `ember-cli-codemirror-shim`.
* Upgrade `ember-cli` to 2.4.2.
* Remove standalone builds.

## 1.3.0 (December 21, 2015)

* [#12](https://github.com/IvyApp/ivy-codemirror/pull/8) Pass all event params to valueUpdated.

## 1.2.0 (August 3, 2015)

* [#8](https://github.com/IvyApp/ivy-codemirror/pull/8) Send valueUpdated action on update of value from input.
* [#7](https://github.com/IvyApp/ivy-codemirror/pull/7) Allow additional key maps to be imported.
* [#5](https://github.com/IvyApp/ivy-codemirror/pull/5) Update codemirror & support Handlebars.
* Upgrade to ember-cli 1.13.6.

## 1.1.0 (May 12, 2015)

* Upgrade to ember-cli 0.2.3.

## 1.0.0 (March 13, 2015)

* Fix initializer error. This was caused by changing the initializer from
  a named export to the default export.
* Upgrade to ember-cli 0.1.5.
* Upgrade to ember 1.9.1 in dummy app.
* Remove unnecessary ember-data dependency in dummy app.
* Remove version suffix from ivy-codemirror.js.
* Fix incorrect main script in standalone bower.json.

## 0.2.0 (December 12, 2014)

* Convert to an ember-cli addon.

## 0.1.1 (September 15, 2014)

* Fix problem with bound properties not updating correctly.

## 0.1.0 (August 23, 2014)

* Initial release.
