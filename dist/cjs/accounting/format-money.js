"use strict";
var unformat = require("./unformat")["default"] || require("./unformat");
var formatNumber = require("./format-number")["default"] || require("./format-number");
var currency = require("./settings").currency;
var defaults = require("./utils").defaults;
var checkPrecision = require("./utils").checkPrecision;
var isObject = require("./utils").isObject;
var checkCurrencyFormat = require("./utils").checkCurrencyFormat;

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