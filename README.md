# light-dom-selector [![][badge-gzip]][link-npm] [![npm downloads][badge-downloads]][link-npm] [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/kkangil/light-dom-selector/LICENSE) [![npm version](https://img.shields.io/npm/v/light-dom-selector.svg?style=flat)](https://www.npmjs.com/package/light-dom-selector)

[badge-gzip]: https://img.shields.io/bundlephobia/minzip/light-dom-selector.svg?label=gzipped
[badge-downloads]: https://img.shields.io/npm/dt/light-dom-selector.svg
[link-npm]: https://www.npmjs.com/package/light-dom-selector

> Lightweight dom selector by simple symbols that outputs an `SelectorFn` instance.

Support Version IE 6+

## Install

```bash
npm install light-dom-selector
```

```js
// This module is only offered as a ES Module
import $ from "light-dom-selector";

// Common JS
const $ = require("light-dom-selector")
```

## Select Dom

Note: if the dom is not exist, `{element: undefined, constructor: Object}` this is the result.

### getElementById

```js
$("#app")
// => SelectorFn {element: Element, constructor: Object}
```

### getElementsByClassName

```js
$(".app")
// => SelectorFn {element: Element, constructor: Object}
```

### querySelectorAll

```js
$("*.app h1")
// => SelectorFn {element: Element, constructor: Object}
```

### getElementsByName

```js
$("~h1")
// => SelectorFn {element: Element, constructor: Object}
```

### getElementsByTagName

```js
$("@app")
// => SelectorFn {element: Element, constructor: Object}
```

## Event

### on

you can create event by `on` method.

```js
$("#app").on("click", function() {
  /// event
});

$("#app").on("click mouseover", function() {
  /// event
});
```

remove event by `off` method.

```js
function clickFn() {
    console.log(this);
}
$("#app").on("click", clickFn); // addEventListener

$("#app").off("click", clickFn); // removeEventListener
```