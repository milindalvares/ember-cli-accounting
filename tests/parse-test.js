module("parse");

test("parse is an alias of unformat", function() {
  equal(accounting.formatNumber, accounting.format, "parse and unformat are equivalent")
});
