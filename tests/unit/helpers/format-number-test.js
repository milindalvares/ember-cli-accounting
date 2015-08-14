import { test, module } from 'qunit';
import formatNumber from 'accounting/format-number';

module('Helpers: format-number');

test("formats the with the default configuration", function(assert) {
  assert.equal(formatNumber([123.4567], {}), "123");
});

test("formats the with options passed to the handlebars templact", function(assert) {
  assert.equal(formatNumber([123.4567], { precision: 2 }), "123.46");
  assert.equal(formatNumber([123.4567], { precision: 2, decimal: ","}), "123,46");
  assert.equal(formatNumber([1234.567], { precision: 2, decimal: ",", thousand: "::"}), "1::234,57");
});
