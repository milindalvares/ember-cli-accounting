import { test, module } from 'qunit';
import formatMoney from 'accounting/format-money';

module('Helpers: format-money');

test("formats money the with the default configuration", function(assert) {
  assert.equal(formatMoney([123.4567], {}), "$123.46");
});

test("formats money the with options passed to the handlebars template", function(assert) {
  assert.equal(formatMoney([123.4567], { precision: 2 }), "$123.46");
  assert.equal(formatMoney([123.4567], { precision: 2, decimal: ","}), "$123,46");
  assert.equal(formatMoney([1234.567], { precision: 2, decimal: ",", thousand: "::"}), "$1::234,57");
  assert.equal(formatMoney([1234.567], { precision: 2, symbol: "€", format: "%v %s"}), "1,234.57 €");
});
