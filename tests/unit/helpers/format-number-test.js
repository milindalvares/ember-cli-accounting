import { test, module } from 'qunit';
import formatNumber from 'accounting/helpers/format-number';
import callHelper from '../../helpers/call-helper';

module('Helpers: format-number');

test("formats the with the default configuration", function(assert) {
  assert.equal(callHelper(formatNumber, 123.4567, {}), "123");
});

test("formats the with options passed to the handlebars templace", function(assert) {
  assert.equal(callHelper(formatNumber, 123.4567, { precision: 2 }), "123.46");
  assert.equal(callHelper(formatNumber, 123.4567, { precision: 2, decimal: ","}), "123,46");
  assert.equal(callHelper(formatNumber, 1234.567, { precision: 2, decimal: ",", thousand: "::"}), "1::234,57");
});
