!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self),n.accounting=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";
var format = _dereq_("./format")["default"] || _dereq_("./format");
var formatColumn = _dereq_("./format-column")["default"] || _dereq_("./format-column");
var formatMoney = _dereq_("./format-money")["default"] || _dereq_("./format-money");
var formatNumber = _dereq_("./format-number")["default"] || _dereq_("./format-number");
var parse = _dereq_("./parse")["default"] || _dereq_("./parse");
var settings = _dereq_("./settings")["default"] || _dereq_("./settings");
var toFixed = _dereq_("./to-fixed")["default"] || _dereq_("./to-fixed");
var unformat = _dereq_("./unformat")["default"] || _dereq_("./unformat");
var version = _dereq_("./version")["default"] || _dereq_("./version");

exports.format = format;
exports.formatColumn = formatColumn;
exports.formatMoney = formatMoney;
exports.formatNumber = formatNumber;
exports.parse = parse;
exports.settings = settings;
exports.toFixed = toFixed;
exports.unformat = unformat;
exports.version = version;exports["default"] = {
  format: format,
  formatColumn: formatColumn,
  formatMoney: formatMoney,
  formatNumber: formatNumber,
  parse: parse,
  settings: settings,
  toFixed: toFixed,
  unformat: unformat,
  version: version
}
},{"./format":5,"./format-column":2,"./format-money":3,"./format-number":4,"./parse":6,"./settings":7,"./to-fixed":8,"./unformat":9,"./version":11}],2:[function(_dereq_,module,exports){
"use strict";
var currency = _dereq_("./settings").currency;
var defaults = _dereq_("./utils").defaults;
var checkPrecision = _dereq_("./utils").checkPrecision;
var isObject = _dereq_("./utils").isObject;
var checkCurrencyFormat = _dereq_("./utils").checkCurrencyFormat;
var formatNumber = _dereq_("./format-number")["default"] || _dereq_("./format-number");
var unformat = _dereq_("./unformat")["default"] || _dereq_("./unformat");

/**
 * Format a list of numbers into an accounting column, padding with whitespace
 * to line up currency symbols, thousand separators and decimals places
 *
 * List should be an array of numbers
 * Second parameter can be an object containing keys that match the params
 *
 * Returns array of accouting-formatted number strings of same length
 *
 * NB: `white-space:pre` CSS rule is required on the list container to prevent
 * browsers from collapsing the whitespace in the output strings.
 */
function formatColumn(list, symbol, precision, thousand, decimal, format) {
  if (!list) return [];

  // Build options object from second param (if object) or all params, extending defaults:
  var opts = defaults(
      (isObject(symbol) ? symbol : {
        symbol : symbol,
        precision : precision,
        thousand : thousand,
        decimal : decimal,
        format : format
      }),
      currency
    );

  // Check format (returns object with pos, neg and zero), only need pos for now:
  var formats = checkCurrencyFormat(opts.format);

  // Whether to pad at start of string or after currency symbol:
  var padAfterSymbol = formats.pos.indexOf("%s") < formats.pos.indexOf("%v");

  // Store value for the length of the longest string in the column:
  var maxLength = 0;

  // Format the list according to options, store the length of the longest string:
  var formatted = list.map(function(val, i) {
    if (Array.isArray(val)) {
      // Recursively format columns if list is a multi-dimensional array:
      return formatColumn(val, opts);
    } else {
      // Clean up the value
      val = unformat(val);

      // Choose which format to use for this value (pos, neg or zero):
      var useFormat = val > 0 ? formats.pos : val < 0 ? formats.neg : formats.zero;

      // Format this value, push into formatted list and save the length:
      var fVal = useFormat.replace('%s', opts.symbol).replace('%v', formatNumber(Math.abs(val), checkPrecision(opts.precision), opts.thousand, opts.decimal));

      if (fVal.length > maxLength) maxLength = fVal.length;
      return fVal;
    }
  });

  // Pad each number in the list and send back the column of numbers:
  return formatted.map(function(val, i) {
    // Only if this is a string (not a nested array, which would have already been padded):
    if (typeof val === "string" && val.length < maxLength) {
      // Depending on symbol position, pad after symbol or at index 0:
      return padAfterSymbol ? val.replace(opts.symbol, opts.symbol+(new Array(maxLength - val.length + 1).join(" "))) : (new Array(maxLength - val.length + 1).join(" ")) + val;
    }
    return val;
  });
};

exports["default"] = formatColumn;
},{"./format-number":4,"./settings":7,"./unformat":9,"./utils":10}],3:[function(_dereq_,module,exports){
"use strict";
var unformat = _dereq_("./unformat")["default"] || _dereq_("./unformat");
var formatNumber = _dereq_("./format-number")["default"] || _dereq_("./format-number");
var currency = _dereq_("./settings").currency;
var defaults = _dereq_("./utils").defaults;
var checkPrecision = _dereq_("./utils").checkPrecision;
var isObject = _dereq_("./utils").isObject;
var checkCurrencyFormat = _dereq_("./utils").checkCurrencyFormat;

/**
 * Format a number into currency
 *
 * Usage: accounting.formatMoney(number, symbol, precision, thousandsSep, decimalSep, format)
 * defaults: (0, "$", 2, ",", ".", "%s%v")
 *
 * Localise by overriding the symbol, precision, thousand / decimal separators and format
 * Second param can be an object matching `settings.currency` which is the easiest way.
 *
 * To do: tidy up the parameters
 */
function formatMoney(number, symbol, precision, thousand, decimal, format) {
  // Resursively format arrays:
  if (Array.isArray(number)) {
    return number.map(function(val){
      return formatMoney(val, symbol, precision, thousand, decimal, format);
    });
  }

  // Clean up number:
  number = unformat(number);

  // Build options object from second param (if object) or all params, extending defaults:
  var opts = defaults(
      (isObject(symbol) ? symbol : {
        symbol : symbol,
        precision : precision,
        thousand : thousand,
        decimal : decimal,
        format : format
      }),
      currency
    ),

    // Check format (returns object with pos, neg and zero):
    formats = checkCurrencyFormat(opts.format),

    // Choose which format to use for this value:
    useFormat = number > 0 ? formats.pos : number < 0 ? formats.neg : formats.zero;

  // Return with currency symbol added:
  return useFormat.replace('%s', opts.symbol).replace('%v', formatNumber(Math.abs(number), checkPrecision(opts.precision), opts.thousand, opts.decimal));
};

exports["default"] = formatMoney;
},{"./format-number":4,"./settings":7,"./unformat":9,"./utils":10}],4:[function(_dereq_,module,exports){
"use strict";
var number = _dereq_("./settings").number;
var defaults = _dereq_("./utils").defaults;
var checkPrecision = _dereq_("./utils").checkPrecision;
var isObject = _dereq_("./utils").isObject;
var unformat = _dereq_("./unformat")["default"] || _dereq_("./unformat");
var toFixed = _dereq_("./to-fixed")["default"] || _dereq_("./to-fixed");

var numberSettings = number;

/**
 * Format a number, with comma-separated thousands and custom precision/decimal places
 * Alias: `accounting.format()`
 *
 * Localise by overriding the precision and thousand / decimal separators
 * 2nd parameter `precision` can be an object matching `settings.number`
 */
function formatNumber(number, precision, thousand, decimal) {
  // Resursively format arrays:
  if (Array.isArray(number)) {
    return number.map(function(val) {
      return formatNumber(val, precision, thousand, decimal);
    });
  }

  // Clean up number:
  number = unformat(number);

  // Build options object from second param (if object) or all params, extending defaults:
  var opts = defaults(
      (isObject(precision) ? precision : {
        precision : precision,
        thousand : thousand,
        decimal : decimal
      }),
      numberSettings
    );

  // Clean up precision
  var usePrecision = checkPrecision(opts.precision);

  // Do some calc:
  var negative = number < 0 ? "-" : "";
  var base = parseInt(toFixed(Math.abs(number || 0), usePrecision), 10) + "";
  var mod = base.length > 3 ? base.length % 3 : 0;

  // Format the number:
  return negative + (mod ? base.substr(0, mod) + opts.thousand : "") + base.substr(mod).replace(/(\d{3})(?=\d)/g, "$1" + opts.thousand) + (usePrecision ? opts.decimal + toFixed(Math.abs(number), usePrecision).split('.')[1] : "");
};

exports["default"] = formatNumber;
},{"./settings":7,"./to-fixed":8,"./unformat":9,"./utils":10}],5:[function(_dereq_,module,exports){
"use strict";
var formatNumber = _dereq_("./format-number")["default"] || _dereq_("./format-number");
/**
 * Alias of formatNumber
 */
exports["default"] = formatNumber;
},{"./format-number":4}],6:[function(_dereq_,module,exports){
"use strict";
var unformat = _dereq_("./unformat")["default"] || _dereq_("./unformat");
/**
 * Alias of `unformat`
 */
exports["default"] = unformat;
},{"./unformat":9}],7:[function(_dereq_,module,exports){
"use strict";
var currency = {
  symbol : "$",     // default currency symbol is '$'
  format : "%s%v",  // controls output: %s = symbol, %v = value (can be object, see docs)
  decimal : ".",    // decimal point separator
  thousand : ",",   // thousands separator
  precision : 2,    // decimal places
  grouping : 3      // digit grouping (not implemented yet)
};
var number = {
  precision : 0,    // default precision on numbers is 0
  grouping : 3,     // digit grouping (not implemented yet)
  thousand : ",",
  decimal : "."
};

exports.currency = currency;
exports.number = number;
},{}],8:[function(_dereq_,module,exports){
"use strict";
var checkPrecision = _dereq_("./utils").checkPrecision;
var number = _dereq_("./settings").number;
var unformat = _dereq_("./unformat")["default"] || _dereq_("./unformat");

/**
 * Implementation of toFixed() that treats floats more like decimals
 *
 * Fixes binary rounding issues (eg. (0.615).toFixed(2) === "0.61") that present
 * problems for accounting- and finance-related software.
 */
exports["default"] = function toFixed(value, precision) {
  precision = checkPrecision(precision, number.precision);
  var power = Math.pow(10, precision);

  // Multiply up by precision, round accurately, then divide and use native toFixed():
  return (Math.round(unformat(value) * power) / power).toFixed(precision);
};
},{"./settings":7,"./unformat":9,"./utils":10}],9:[function(_dereq_,module,exports){
"use strict";
var number = _dereq_("./settings").number;

/**
 * Takes a string/array of strings, removes all formatting/cruft and returns the raw float value
 * Alias: `accounting.parse(string)`
 *
 * Decimal must be included in the regular expression to match floats (defaults to
 * accounting.settings.number.decimal), so if the number uses a non-standard decimal
 * separator, provide it as the second argument.
 *
 * Also matches bracketed negatives (eg. "$ (1.99)" => -1.99)
 *
 * Doesn't throw any errors (`NaN`s become 0) but this may change in future
 */
function unformat(value, decimal) {
  // Recursively unformat arrays:
  if (Array.isArray(value)) {
    return value.map(function(val) {
      return unformat(val, decimal);
    });
  }

  // Fails silently (need decent errors):
  value = value || 0;

  // Return the value as-is if it's already a number:
  if (typeof value === "number") return value;

  // Default decimal point comes from settings, but could be set to eg. "," in opts:
  decimal = decimal || number.decimal;

   // Build regex to strip out everything except digits, decimal point and minus sign:
  var regex = new RegExp("[^0-9-" + decimal + "]", ["g"]),
    unformatted = parseFloat(
      ("" + value)
      .replace(/\((.*)\)/, "-$1") // replace bracketed values with negatives
      .replace(regex, '')         // strip out any cruft
      .replace(decimal, '.')      // make sure decimal point is standard
    );

  // This will fail silently which may cause trouble, let's wait and see:
  return !isNaN(unformatted) ? unformatted : 0;
};


exports["default"] = unformat;
},{"./settings":7}],10:[function(_dereq_,module,exports){
"use strict";
var currency = _dereq_("./settings").currency;
/**
 * Extends an object with a defaults object, similar to underscore's _.defaults
 *
 * Used for abstracting parameter handling from API methods
 */
function defaults(object, defs) {
  var key;
  object = object || {};
  defs = defs || {};
  // Iterate over object non-prototype properties:
  for (key in defs) {
    if (defs.hasOwnProperty(key)) {
      // Replace values with defaults only if undefined (allow empty/zero values):
      if (object[key] == null) object[key] = defs[key];
    }
  }
  return object;
}

/**
 * Check and normalise the value of precision (must be positive integer)
 */
function checkPrecision(val, base) {
  val = Math.round(Math.abs(val));
  return isNaN(val)? base : val;
}

/**
 * Tests whether supplied parameter is a true object
 */
function isObject(obj) {
  return obj && toString.call(obj) === '[object Object]';
}

/**
 * Parses a format string or object and returns format obj for use in rendering
 *
 * `format` is either a string with the default (positive) format, or object
 * containing `pos` (required), `neg` and `zero` values (or a function returning
 * either a string or object)
 *
 * Either string or format.pos must contain "%v" (value) to be valid
 */
function checkCurrencyFormat(format) {
  var defaults = currency.format;

  // Allow function as format parameter (should return string or object):
  if ( typeof format === "function" ) format = format();

  // Format can be a string, in which case `value` ("%v") must be present:
  if ( typeof format === "string" && format.match("%v") ) {

    // Create and return positive, negative and zero formats:
    return {
      pos : format,
      neg : format.replace("-", "").replace("%v", "-%v"),
      zero : format
    };

  // If no format, or object is missing valid positive value, use defaults:
  } else if ( !format || !format.pos || !format.pos.match("%v") ) {

    // If defaults is a string, casts it to an object for faster checking next time:
    if (typeof defaults !== "string") {
      return defaults;
    } else {
      //
      //
      //
      //
      // Dudo que esto funcione, porque no se si se puede modificar el valor original de algo
      // importado. Preguntarlo. Diria que no. Si es que no, hay que buscar un approach totalmente
      // distinto
      //
      //
      //
      //
      //
      return currency.format = {
        pos : defaults,
        neg : defaults.replace("%v", "-%v"),
        zero : defaults
      }
    }
  }
  // Otherwise, assume format was fine:
  return format;
}

exports.defaults = defaults;
exports.checkPrecision = checkPrecision;
exports.isObject = isObject;
exports.checkCurrencyFormat = checkCurrencyFormat;exports["default"] = {
  defaults: defaults,
  checkPrecision: checkPrecision,
  isObject: isObject,
  checkCurrencyFormat: checkCurrencyFormat,
};
},{"./settings":7}],11:[function(_dereq_,module,exports){
"use strict";
exports["default"] = '0.4.1';
},{}]},{},[1])
(1)
});