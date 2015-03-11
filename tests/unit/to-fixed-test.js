import { test, module } from 'qunit';
import toFixed from "accounting/to-fixed";

module("toFixed");

test("toFixed()", function(assert) {
  assert.equal(toFixed(54321, 5), "54321.00000", 'Performs basic float zero-padding');
  assert.equal(toFixed(0.615, 2), "0.62", 'Rounds 0.615 to "0.62" instead of "0.61"');
});
