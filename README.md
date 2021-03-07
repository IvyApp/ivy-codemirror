# ivy-codemirror

An [Ember](http://emberjs.com) component for the excellent [CodeMirror](http://codemirror.net) editor.

## Ember Addon Deprecation

This Ember addon for CodeMirror has been deprecated. It has not been actively maintained nor is there a need for it to continue to exist or be used in current Ember applications.

Integration with CodeMirror is better done using an [Ember Element Modifier](https://guides.emberjs.com/release/components/template-lifecycle-dom-and-modifiers/). A modifier implementation allows you to directly depend on the npm [codemirror](https://www.npmjs.com/package/codemirror) package and gives more access to and control of the integration with CodeMirror.

### Example ember-modifier CodeMirror Implementation

An example [ember-modifier](https://www.npmjs.com/package/ember-modifier)-backed implementation is detailed below:

**package.json**:

```json
{
  "devDependencies": {
    "@types/codemirror": "^0.0.106",
    "codemirror": "^5.59.2",
    "ember-modifier": "^2.1.1"
  }
}
```

**ember-cli-build.js**:

```javascript
module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    app.import("node_modules/codemirror/lib/codemirror.css");
  })
})
```

**app/modifiers/app-modifiers-code-mirror.ts**:

```typescript
import { action } from "@ember/object";
import { bind } from "@ember/runloop";
import codemirror from "codemirror";
import Modifier from "ember-modifier";

import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/selection/active-line";
import "codemirror/mode/clike/clike";
import "codemirror/mode/go/go";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";

const EXTENSION_REGEXP = /(?:\.([^.]+))?$/;

/**
 * Maps file extensions to loaded, CodeMirror-compatible language modes.
 *
 * **Important:** These CodeMirror modes must be loaded to be useable. See
 * the above imports which load the supported language modes.
 */
const modeMap: Record<string, string> = {
  go: "text/x-go",
  java: "text/x-java",
  js: "javascript",
  py: "python",
};

/**
 * This is a magic CodeMirror mode string to indicate that no highlighting
 * should be used.
 *
 * See https://codemirror.net/doc/manual.html#option_mode.
 */
const DoNotHighlight = "null";

interface Args {
  named: {
    content: string;
    path: string;
    readOnly: boolean;
    onUpdate: (content: string) => void;
    [key: string]: unknown;
  };
  positional: never;
}

export default class CodeMirrorModifier extends Modifier<Args> {
  didInstall() {
    this._setup();
  }

  didUpdateArguments() {
    if (this._editor.getValue() !== this.args.named.content) {
      this._editor.setValue(this.args.named.content);
    }

    this._editor.setOption("readOnly", this.args.named.readOnly);
    this._editor.setOption("mode", this.mode);
  }

  private _editor!: CodeMirror.Editor;

  /**
   * Transforms the given path into an equivalent CodeMirror compatible
   * language mode string by inspecting the extension.
   *
   * If no matching language modes are supported or the file extension cannot be
   * determined, this will return the magic CodeMirror "null" string mode value.
   * The value "null" indicates no highlighting should be applied.
   */
  get mode() {
    if (!this.args.named.path) {
      return DoNotHighlight;
    }

    const extension = EXTENSION_REGEXP.exec(this.args.named.path);

    if (!extension || !extension[1]) {
      return DoNotHighlight;
    }

    return modeMap[extension[1].toLowerCase()] || DoNotHighlight;
  }

  @action
  private _onChange(
    editor: CodeMirror.Editor,
    _changeObject: CodeMirror.EditorChangeLinkedList
  ) {
    this.args.named.onUpdate(editor.getValue());
  }

  private _setup() {
    if (!this.element) {
      throw new Error("CodeMirror modifier has no element");
    }

    const editor: CodeMirror.Editor = codemirror(this.element as HTMLElement, {
      lineNumbers: true,
      matchBrackets: true,
      mode: this.mode,
      readOnly: this.args.named.readOnly,
      styleActiveLine: true,
      theme: "my-custom-theme",
      value: this.args.named.content || "",
      viewportMargin: Infinity,
    });

    editor.on("change", bind(this, this._onChange));

    this._editor = editor;
  }
}
```

**app/templates/caller-example.hbs**:

```handlebars
<div
  {{code-mirror
    content=@file.content
    onUpdate=this.update
    path=@file.path
    readOnly=@file.isSaving
  }}
></div>
```
