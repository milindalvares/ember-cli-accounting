define("accounting",
  ["./accounting/format","./accounting/format-column","./accounting/format-money","./accounting/format-number","./accounting/parse","./accounting/settings","./accounting/to-fixed","./accounting/unformat","./accounting/version","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __dependency7__, __dependency8__, __dependency9__, __exports__) {
    "use strict";
    var format = __dependency1__["default"] || __dependency1__;
    var formatColumn = __dependency2__["default"] || __dependency2__;
    var formatMoney = __dependency3__["default"] || __dependency3__;
    var formatNumber = __dependency4__["default"] || __dependency4__;
    var parse = __dependency5__["default"] || __dependency5__;
    var settings = __dependency6__["default"] || __dependency6__;
    var toFixed = __dependency7__["default"] || __dependency7__;
    var unformat = __dependency8__["default"] || __dependency8__;
    var version = __dependency9__["default"] || __dependency9__;

    __exports__.format = format;
    __exports__.formatColumn = formatColumn;
    __exports__.formatMoney = formatMoney;
    __exports__.formatNumber = formatNumber;
    __exports__.parse = parse;
    __exports__.settings = settings;
    __exports__.toFixed = toFixed;
    __exports__.unformat = unformat;
    __exports__.version = version;__exports__["default"] = {
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
  });
define("accounting/accounting/format-column",
  ["./settings","./utils","./format-number","./unformat","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var currency = __dependency1__.currency;
    var defaults = __dependency2__.defaults;
    var checkPrecision = __dependency2__.checkPrecision;
    var isObject = __dependency2__.isObject;
    var checkCurrencyFormat = __dependency2__.checkCurrencyFormat;
    var formatNumber = __dependency3__["default"] || __dependency3__;
    var unformat = __dependency4__["default"] || __dependency4__;

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

    __exports__["default"] = formatColumn;
  });
define("accounting/accounting/format-money",
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
define("accounting/accounting/format-number",
  ["./settings","./utils","./unformat","./to-fixed","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var number = __dependency1__.number;
    var defaults = __dependency2__.defaults;
    var checkPrecision = __dependency2__.checkPrecision;
    var isObject = __dependency2__.isObject;
    var unformat = __dependency3__["default"] || __dependency3__;
    var toFixed = __dependency4__["default"] || __dependency4__;

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

    __exports__["default"] = formatNumber;
  });
define("accounting/accounting/format",
  ["./format-number","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var formatNumber = __dependency1__["default"] || __dependency1__;
    /**
     * Alias of formatNumber
     */
    __exports__["default"] = formatNumber;
  });
define("accounting/accounting/parse",
  ["./unformat","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var unformat = __dependency1__["default"] || __dependency1__;
    /**
     * Alias of `unformat`
     */
    __exports__["default"] = unformat;
  });
define("accounting/accounting/settings",
  ["exports"],
  function(__exports__) {
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

    __exports__.currency = currency;
    __exports__.number = number;
  });
define("accounting/accounting/to-fixed",
  ["./utils","./settings","./unformat","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var checkPrecision = __dependency1__.checkPrecision;
    var number = __dependency2__.number;
    var unformat = __dependency3__["default"] || __dependency3__;

    /**
     * Implementation of toFixed() that treats floats more like decimals
     *
     * Fixes binary rounding issues (eg. (0.615).toFixed(2) === "0.61") that present
     * problems for accounting- and finance-related software.
     */
    __exports__["default"] = function toFixed(value, precision) {
      precision = checkPrecision(precision, number.precision);
      var power = Math.pow(10, precision);

      // Multiply up by precision, round accurately, then divide and use native toFixed():
      return (Math.round(unformat(value) * power) / power).toFixed(precision);
    };
  });
define("accounting/accounting/unformat",
  ["./settings","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var number = __dependency1__.number;

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


    __exports__["default"] = unformat;
  });
define("accounting/accounting/utils",
  ["./settings","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var currency = __dependency1__.currency;
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

    __exports__.defaults = defaults;
    __exports__.checkPrecision = checkPrecision;
    __exports__.isObject = isObject;
    __exports__.checkCurrencyFormat = checkCurrencyFormat;__exports__["default"] = {
      defaults: defaults,
      checkPrecision: checkPrecision,
      isObject: isObject,
      checkCurrencyFormat: checkCurrencyFormat,
    };
  });
define("accounting/accounting/version",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = '0.4.1';
  });