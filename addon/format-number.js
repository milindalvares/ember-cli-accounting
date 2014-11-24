import { number } from "./settings";
import { defaults, checkPrecision, isObject } from "./utils";
import unformat from "./unformat";
import toFixed from "./to-fixed";

var numberSettings = number;

/**
 * Format a number, with comma-separated thousands and custom precision/decimal places
 * Alias: `accounting.format()`
 *
 * Localise by overriding the precision and thousand / decimal separators
 * 2nd parameter `precision` can be an object matching `settings.number`
 *
 * ```js
 * accounting.formatNumber(5318008);              // 5,318,008
 * accounting.formatNumber(9876543.21, 3, " "); // 9 876 543.210
 * ```
 *
 * @method formatNumber
 * @for accounting
 * @param number {Number} The number to be formatted.
 * @param precision {Object|Number} The number of decimal digits to use or an object of options that
 *                                contains the items of the signature except the number, for convenience.
 * @param thousand
 * @param decimal
 * @return {String} The given number properly formatted.
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
}

export default formatNumber;
