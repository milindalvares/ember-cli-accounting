"use strict";
var checkPrecision = require("./utils").checkPrecision;
var number = require("./settings").number;
var unformat = require("./unformat")["default"] || require("./unformat");

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