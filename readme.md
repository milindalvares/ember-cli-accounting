# Ember-cli-accounting ![travis-badge](https://travis-ci.org/cibernox/ember-cli-accounting.svg?branch=master)

This is a port of the great [accounting.js](https://github.com/openexchangerates/accounting.js) library to
ES6 modules that integrates seamlessly with ember-cli.

## Instalation

Just add like any other ember-cli addon:

`npm install ember-cli-accounting --save-dev`

## Usage

You no longer need to access the global accounting, you can import only what you need:

```js
import formatMoney from "accounting/format-money"
```

Althoug you can import everything as expected:

```js
import accounting from "accounting"
```

## Differences with accounting.js

Although this is almost a 1:1 port of accountant.js, there is a few differences:

* Each function of accountant.js lives in its own module, so you can only import those functions you want to use.
* Removed some polifills for `Array.isArray`, `Array.prototype.map` and `Object.prototype.toString`. 
They are not required in modern browsers, and ember.js (unless you opt-out with `EXTEND_PROTOTYPES = false`) already provides polifills for those functions.
* More tests than the original.
* Enforced jshint. Cleaner code.

## Versioning

At the time of writting, this addon bundles the same funcionality than accounting version 0.4.1.
This addon's version don't match accounting's version. However, you can check accounting's version easily:

```js
import version from "accounting/version";

console.log(version) // => "0.4.1"
```

I'll try to keep it always up to date with any bugfix or new feature in the original library.

## Documentation

This library does not make any change in the public api of accounting.js, so you can read the official
documentation [here](http://openexchangerates.github.io/accounting.js/)
