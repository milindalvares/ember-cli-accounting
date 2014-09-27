import { currency } from "ember-cli-accounting/settings";
import formatMoney from "ember-cli-accounting/format-money";

var symbol, format;

module("settings", {
  setup: function(){
    symbol = currency.symbol;
    format = currency.format;
    currency.symbol = "€";
    currency.format = "%v%s";
  },
  teardown: function(){
    currency.symbol = symbol;
    currency.format = format;
  }
});

test("settings can be changed", function() {
  equal(formatMoney(123), "123.00€", 'Default settings have been changed');
});
