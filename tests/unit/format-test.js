import { test, module } from 'qunit';
import formatNumber from "accounting/format-number";
import format from "accounting/format";

module("format");

test("format is an alias of formatNumber", function(assert) {
  assert.equal(formatNumber, format, "formatNumber and format are equivalent");
});

