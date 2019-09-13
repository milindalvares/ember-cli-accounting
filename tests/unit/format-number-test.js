import { test, module } from 'qunit';
import formatNumber from "accounting/format-number";

module("formatNumber");

test("formatNumber()", function(assert) {
  // Check custom precision and separators:
  assert.equal(formatNumber(4999.99, 2, ".", ","), "4.999,99", 'Custom precision and decimal/thousand separators are a-ok');
  assert.equal(formatNumber(2378.0000, 2, ".", ",", true), "2.378", 'Define round base values and remove all decimal places');
  assert.equal(formatNumber(1568.0010, 2, ".", ",", true), "1.568", 'Remove all decimal places if they dont appear in precision');
  assert.equal(formatNumber(3251.0001, 3, ".", ",", true), "3.251", 'Remove all decimal places if they dont appear in precision');
  assert.equal(formatNumber(2342.030, 2, ".", ",", true), "2.342,03", 'Remove all decimal places if they dont appear in precision');

  // check usage with options object parameter:
  assert.equal(formatNumber(5318008, {
    precision : 3,
    thousand : "__",
    decimal : "--"
  }), "5__318__008--000", 'Correctly handles custom precision and separators passed in via second param options object');


  // check rounding:
  assert.equal(formatNumber(0.615, 2), "0.62", 'Rounds 0.615 up to "0.62" with precision of 2');

  // manually and recursively formatted arrays should have same values:
  var numbers = [8008135, [1234, 5678], 1000];
  var formattedManually = [formatNumber(8008135), [formatNumber(1234), formatNumber(5678)], formatNumber(1000)];
  var formattedRecursively = formatNumber(numbers);
  assert.equal(formattedRecursively.toString(), formattedManually.toString(), 'can recursively format multi-dimensional arrays');
});

test("handles -0.00 stripping -", function(assert) {
  assert.equal(formatNumber(-0.0000000567, 2), "0.00", 'Removes - from -0.00');
});
