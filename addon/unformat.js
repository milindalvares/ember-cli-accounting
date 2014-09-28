import { number } from "./settings";

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
  if (typeof value === "number") {
    return value;
  }

  // Default decimal point comes from settings, but could be set to eg. "," in opts:
  decimal = decimal || number.decimal;

   // Build regex to strip out everything except digits, decimal point and minus sign:
  var regex = new RegExp("[^0-9-" + decimal + "]", ["g"]);
  var unformatted = parseFloat(
    ("" + value)
    .replace(/\((.*)\)/, "-$1") // replace bracketed values with negatives
    .replace(regex, '')         // strip out any cruft
    .replace(decimal, '.')      // make sure decimal point is standard
  );

  // This will fail silently which may cause trouble, let's wait and see:
  return !isNaN(unformatted) ? unformatted : 0;
}


export default unformat;
