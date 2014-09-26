define(
  ["./unformat","./format-number","./settings","./utils","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var unformat = __dependency1__["default"] || __dependency1__;
    var formatNumber = __dependency2__["default"] || __dependency2__;
    var currency = __dependency3__.currency;
    var defaults = __dependency4__.defaults;
    var checkPrecision = __dependency4__.checkPrecision;
    var isObject = __dependency4__.isObject;
    var checkCurrencyFormat = __dependency4__.checkCurrencyFormat;

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

    __exports__["default"] = formatMoney;
  });