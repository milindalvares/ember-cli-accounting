define(
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