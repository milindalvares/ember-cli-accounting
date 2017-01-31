import { test, module } from 'qunit';
import { currency } from "accounting/settings";
import formatMoney from "accounting/format-money";

var symbol, format;

module("settings", {
  beforeEach(){
    symbol = currency.symbol;
    format = currency.format;
    currency.symbol = "€";
    currency.format = "%v%s";
  },
  afterEach(){
    currency.symbol = symbol;
    currency.format = format;
  }
});

test("settings can be changed", function(assert) {
  assert.equal(formatMoney(123), "123.00€", 'Default settings have been changed');
});
