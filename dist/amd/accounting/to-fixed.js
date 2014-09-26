define(
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