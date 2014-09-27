import formatNumber from "ember-cli-accounting/format-number";
import format from "ember-cli-accounting/format";

module("format");

test("format is an alias of formatNumber", function() {
  equal(formatNumber, format, "formatNumber and format are equivalent");
});
