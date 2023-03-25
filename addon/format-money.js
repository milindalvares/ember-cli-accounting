import unformat from "./unformat";
import formatNumber from "./format-number";
import { currency } from "./settings";
import { defaults, checkPrecision, isObject, checkCurrencyFormat } from "./utils";
import toFixed from "./to-fixed";

/**
 * Format a number into currency
 *
 * Usage: accounting.formatMoney(number, symbol, precision, thousandsSep, decimalSep, format)
 * defaults: (0, "$", 2, ",", ".", "%s%v")
 *
 * Localise by overriding the symbol, precision, thousand / decimal separators and format
 * Second param can be an object matching `settings.currency` which is the easiest way.
 *
 * ```js
 * // Default usage:
 * accounting.formatMoney(12345678); // $12,345,678.00
 *
 * // European formatting (custom symbol and separators), can also use options object as second parameter:
 * accounting.formatMoney(4999.99, "€", 2, ".", ","); // €4.999,99
 *
 * // Negative values can be formatted nicely:
 * accounting.formatMoney(-500000, "£ ", 0); // £ -500,000
 *
 * // Simple `format` string allows control of symbol position (%v = value, %s = symbol):
 * accounting.formatMoney(5318008, { symbol: "GBP",  format: "%v %s" }); // 5,318,008.00 GBP
 * ```
 *
 * @method formatMoney
 * @for accounting
 * @param {Number}        number Number to be formatted.
 * @param {Object|String} [symbol="$"] String with the currency symbol. For conveniency if can be an object containing all the options of the method.
 * @param {Integer}       [precision=2] Number of decimal digits
 * @param {String}        [thousand=','] String with the thousands separator.
 * @param {String}        [decimal="."] String with the decimal separator.
 * @param {String}        [format="%s%v"] String with the format to apply, where %s is the currency symbol and %v is the value.
 * @param {Boolean}       [rounded=false] Used to remove all trailing zeros.
 * @return {String} The given number properly formatted as money.
 */
function formatMoney(number, symbol, precision, thousand, decimal, format, rounded) {
  // Resursively format arrays:
  if (Array.isArray(number)) {
    return number.map(function(val){
      return formatMoney(val, symbol, precision, thousand, decimal, format, rounded);
    });
  }

  // Clean up number:
  number = unformat(number);

  // Build options object from second param (if object) or all params, extending defaults:
  const opts = defaults(
      (isObject(symbol) ? symbol : {
        symbol : symbol,
        precision : precision,
        thousand : thousand,
        decimal : decimal,
        format : format,
        rounded : rounded
      }),
      currency
    );

  // Check format (returns object with pos, neg and zero):
  const formats = checkCurrencyFormat(opts.format);

  // Clean up precision
  const usePrecision = checkPrecision(opts.precision);

  // fixedNumber's value is not really used, just used to determine negative or not
  const fixedNumber = toFixed(number || 0, usePrecision);
  // Choose which format to use for this value:
  const useFormat = fixedNumber > 0 ? formats.pos : fixedNumber < 0 ? formats.neg : formats.zero;

  // Return with currency symbol added:
  return useFormat.replace('%s', opts.symbol).replace('%v', formatNumber(Math.abs(number), checkPrecision(opts.precision), opts.thousand, opts.decimal, opts.rounded));
}

export default formatMoney;
