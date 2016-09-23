import { currency } from "./settings";
import Ember from 'ember';

var assign = Ember.assign || Ember.merge;

/**
 * Extends an object with a defaults object, similar to underscore's _.defaults
 *
 * Used for abstracting parameter handling from API methods
 */
function defaults(object, defs) {
  var key;
  object = assign({}, object);
  defs = defs || {};
  // Iterate over object non-prototype properties:
  for (key in defs) {
    if (defs.hasOwnProperty(key)) {
      // Replace values with defaults only if undefined (allow empty/zero values):
      if (object[key] == null) {
        object[key] = defs[key];
      }
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
 * Returns the toString representation of an object even when the object 
 * does not support `toString` out of the box, i.e. `EmptyObject`.
 */
function toString(obj) {
  return Object.prototype.toString.call(obj);
}

/**
 * Tests whether supplied parameter is a true object
 */
function isObject(obj) {
  return obj && toString(obj) === '[object Object]';
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
  if ( typeof format === "function" ) {
    format = format();
  }

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
      return currency.format = {
        pos : defaults,
        neg : defaults.replace("%v", "-%v"),
        zero : defaults
      };
    }
  }
  // Otherwise, assume format was fine:
  return format;
}

export {
  defaults,
  checkPrecision,
  isObject,
  checkCurrencyFormat
};

export default {
  defaults: defaults,
  checkPrecision: checkPrecision,
  isObject: isObject,
  checkCurrencyFormat: checkCurrencyFormat,
};
