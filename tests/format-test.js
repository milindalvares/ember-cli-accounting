module("format");

test("format is an alias of formatNumber", function() {
  equal(accounting.formatNumber, accounting.format, "formatNumber and format are equivalent")
});
