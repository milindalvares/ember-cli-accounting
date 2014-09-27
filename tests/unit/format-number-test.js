import formatNumber from "accounting/format-number";

module("formatNumber");

test("formatNumber()", function() {
  // Check custom precision and separators:
  equal(formatNumber(4999.99, 2, ".", ","), "4.999,99", 'Custom precision and decimal/thousand separators are a-ok');

  // check usage with options object parameter:
  equal(formatNumber(5318008, {
    precision : 3,
    thousand : "__",
    decimal : "--"
  }), "5__318__008--000", 'Correctly handles custom precision and separators passed in via second param options object');


  // check rounding:
  equal(formatNumber(0.615, 2), "0.62", 'Rounds 0.615 up to "0.62" with precision of 2');

  // manually and recursively formatted arrays should have same values:
  var numbers = [8008135, [1234, 5678], 1000];
  var formattedManually = [formatNumber(8008135), [formatNumber(1234), formatNumber(5678)], formatNumber(1000)];
  var formattedRecursively = formatNumber(numbers);
  equal(formattedRecursively.toString(), formattedManually.toString(), 'can recursively format multi-dimensional arrays');
});
