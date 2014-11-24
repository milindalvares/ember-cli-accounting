import { currency } from "./settings";
import { defaults, checkPrecision, isObject, checkCurrencyFormat } from "./utils";
import formatNumber from "./format-number";
import unformat from "./unformat";

/**
 * Format a list of numbers into an accounting column, padding with whitespace
 * to line up currency symbols, thousand separators and decimals places
 *
 * Second parameter can be an object containing keys that match the params
 *
 * NB: `white-space:pre` CSS rule is required on the list container to prevent
 * browsers from collapsing the whitespace in the output strings.
 *
 * @method formatColumn
 * @for accounting
 * @param list {Array<Number>} An array of numbers to format
 * @param symbol {Object|String} String with the currency symbol or an object of options that
 *                                contains the items of the signature except the list, for convenience
 * @param precision
 * @param thousand
 * @param decimal
 * @param format
 * @return {Array<String>} array of accouting-formatted number strings of same length
 */
function formatColumn(list, symbol, precision, thousand, decimal, format) {
  if (!list) {
    return [];
  }

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
  var formatted = list.map(function(val) {
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

      if (fVal.length > maxLength) {
        maxLength = fVal.length;
      }
      return fVal;
    }
  });

  // Pad each number in the list and send back the column of numbers:
  return formatted.map(function(val) {
    // Only if this is a string (not a nested array, which would have already been padded):
    if (typeof val === "string" && val.length < maxLength) {
      // Depending on symbol position, pad after symbol or at index 0:
      return padAfterSymbol ? val.replace(opts.symbol, opts.symbol+(new Array(maxLength - val.length + 1).join(" "))) : (new Array(maxLength - val.length + 1).join(" ")) + val;
    }
    return val;
  });
}

export default formatColumn;
