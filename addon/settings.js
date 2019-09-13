var currency = {
  symbol : "$",     // default currency symbol is '$'
  format : "%s%v",  // controls output: %s = symbol, %v = value (can be object, see docs)
  decimal : ".",    // decimal point separator
  thousand : ",",   // thousands separator
  precision : 2,    // decimal places
  grouping : 3,     // digit grouping (not implemented yet)
  rounded: false,   // rounds number when has no decimals
};
var number = {
  precision : 0,    // default precision on numbers is 0
  grouping : 3,     // digit grouping (not implemented yet)
  thousand : ",",
  decimal : ".",
  rounded: false,   // rounds number when has no decimals
};

export { currency, number };
