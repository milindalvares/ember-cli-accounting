import { checkPrecision } from "./utils";
import { number } from "./settings";
import unformat from "./unformat";

/**
 * Implementation of toFixed() that treats floats more like decimals
 *
 * Fixes binary rounding issues (eg. (0.615).toFixed(2) === "0.61") that present
 * problems for accounting- and finance-related software.
 */
export default function toFixed(value, precision) {
  precision = checkPrecision(precision, number.precision);
  var power = Math.pow(10, precision);

  // Multiply up by precision, round accurately, then divide and use native toFixed():
  return (Math.round(unformat(value) * power) / power).toFixed(precision);
};
