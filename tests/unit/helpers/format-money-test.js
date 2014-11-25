import { test } from 'ember-qunit';
import formatMoney from 'accounting/helpers/format-money';

module('Helpers: format-money');

test("formats money the with the default configuration", function(){
  equal(formatMoney(123.4567, {}), "$123.46");
});

test("formats money the with options passed to the handlebars templace", function(){
  equal(formatMoney(123.4567, { hash: { precision: 2 } }), "$123.46");
  equal(formatMoney(123.4567, { hash: { precision: 2, decimal: ","} }), "$123,46");
  equal(formatMoney(1234.567, { hash: { precision: 2, decimal: ",", thousand: "::"} }), "$1::234,57");
  equal(formatMoney(1234.567, { hash: { precision: 2, symbol: "€", format: "%v %s"} }), "1,234.57 €");
});
