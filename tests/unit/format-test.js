import formatNumber from "accounting/format-number";
import format from "accounting/format";

module("format");

test("format is an alias of formatNumber", function() {
  equal(formatNumber, format, "formatNumber and format are equivalent");
});
