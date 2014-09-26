module("toFixed");

test("accounting.toFixed()", function() {
  equal(accounting.toFixed(54321, 5), "54321.00000", 'Performs basic float zero-padding');
  equal(accounting.toFixed(0.615, 2), "0.62", 'Rounds 0.615 to "0.62" instead of "0.61"');
});
