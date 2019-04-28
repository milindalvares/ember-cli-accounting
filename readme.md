# Ember-cli-accounting ![travis-badge](https://travis-ci.org/cibernox/ember-cli-accounting.svg?branch=master)

This is a port of the great [accounting.js](https://github.com/openexchangerates/accounting.js) library to
ES6 modules that integrates seamlessly with ember-cli.

## Installation

Just add like any other ember-cli addon:

* `ember install ember-cli-accounting`

## Ember compatiblity

Version 1.0.0 and beyond use `Ember.Helper` and helper's autoregistration, and are only compatible 
with Ember 1.13 and Ember 2.0+

Version 0.1.X requires HTMLBars, to works with ember 1.10+, including 1.13, but not with Ember 2.0

If you are in an older than 1.10 use version 0.0.4

## Usage

### Accounting functions

You no longer need to access the global accounting, you can import only what you need:

```js
import formatMoney from "accounting/format-money"
```

Although you can import everything as expected:

```js
import accounting from "accounting"
```

### Handlebars helpers

This addon also registers 2 handy helpers in your application: `format-number` and `format-money`.

You can set options using bound or unbound options like this:

```hbs
{{format-money price symbol=selectedCurrency format="%v %s"}} <!-- "123.45 £" -->
```

Any option not set will have the usual default value:

```hbs
{{format-number "1234.567" precision=2}} <!-- "1,234.57" -->
```

### Config default options

You can use an initializer to set some default values at initializations and avoid having to 
repeat over and over the options in the helpers.

Use something like this:
```js
// app/initializers/accounting.js
import { currency, number } from "accounting/settings";

export default {
  name: 'accounting.js',
  initialize: function() {
    currency.symbol = "€";
    number.decimal = ",";
    number.thousand = ".";
  }
};
```

## Differences with accounting.js

Although this is almost a 1:1 port of accountant.js, there is a few differences:

* Each function of accountant.js lives in its own module, so you can only import those functions you want to use.
* Removed some polyfills for `Array.isArray`, `Array.prototype.map` and `Object.prototype.toString`.
They are not required in modern browsers, and ember.js (unless you opt-out with `EXTEND_PROTOTYPES = false`) already provides polyfills for those functions.
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
