import { test } from 'ember-qunit';
import formatNumber from 'accounting/helpers/format-number';

module('Helpers: format-number');

test("formats the with the default configuration", function(){
  equal(formatNumber(123.4567, {}), "123");
});

test("formats the with options passed to the handlebars templace", function(){
  equal(formatNumber(123.4567, { hash: { precision: 2 } }), "123.46");
  equal(formatNumber(123.4567, { hash: { precision: 2, decimal: ","} }), "123,46");
  equal(formatNumber(1234.567, { hash: { precision: 2, decimal: ",", thousand: "::"} }), "1::234,57");
});
