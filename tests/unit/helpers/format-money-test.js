import { test } from 'ember-qunit';
import formatMoney from 'accounting/helpers/format-money';
import callHelper from '../../helpers/call-helper';

module('Helpers: format-money');

test("formats money the with the default configuration", function(){
  equal(callHelper(formatMoney, 123.4567, {}), "$123.46");
});

test("formats money the with options passed to the handlebars templace", function(){
  equal(callHelper(formatMoney, 123.4567, { precision: 2 }), "$123.46");
  equal(callHelper(formatMoney, 123.4567, { precision: 2, decimal: ","}), "$123,46");
  equal(callHelper(formatMoney, 1234.567, { precision: 2, decimal: ",", thousand: "::"}), "$1::234,57");
  equal(callHelper(formatMoney, 1234.567, { precision: 2, symbol: "€", format: "%v %s"}), "1,234.57 €");
});
