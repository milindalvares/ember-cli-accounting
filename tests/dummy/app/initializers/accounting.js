import { currency, number } from "accounting/settings";

export default {
  name: 'accounting.js',
  initialize: function() {
    currency.symbol = "€";
    number.decimal = ",";
    number.thousand = ".";
    currency.format = {
      pos : "%s %v",
      neg : "%s (%v)",
      zero: "%s  -- "
    };
  }
};
