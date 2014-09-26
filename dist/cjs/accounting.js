"use strict";
var format = require("./accounting/format")["default"] || require("./accounting/format");
var formatColumn = require("./accounting/format-column")["default"] || require("./accounting/format-column");
var formatMoney = require("./accounting/format-money")["default"] || require("./accounting/format-money");
var formatNumber = require("./accounting/format-number")["default"] || require("./accounting/format-number");
var parse = require("./accounting/parse")["default"] || require("./accounting/parse");
var settings = require("./accounting/settings")["default"] || require("./accounting/settings");
var toFixed = require("./accounting/to-fixed")["default"] || require("./accounting/to-fixed");
var unformat = require("./accounting/unformat")["default"] || require("./accounting/unformat");
var version = require("./accounting/version")["default"] || require("./accounting/version");

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