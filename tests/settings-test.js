var symbol, format;

module("settings", {
  setup: function(){
    symbol = accounting.settings.currency.symbol;
    format = accounting.settings.currency.format;
    accounting.settings.currency.symbol = "€"
    accounting.settings.currency.format = "%v%s"
  },
  teardown: function(){
    accounting.settings.currency.symbol = symbol;
    accounting.settings.currency.format = format;
  }
});

test("settings can be changed", function() {
  equal(accounting.formatMoney(123), "123.00€", 'Default settings have been changed');
});
