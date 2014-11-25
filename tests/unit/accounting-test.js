import accounting from "accounting";

module("accounting");

test("contains all functions", function() {
  ['format', 'formatColumn', 'formatMoney', 'formatNumber', 'parse', 'toFixed', 'unformat'].forEach(function(method){
    ok(typeof accounting[method] === 'function', 'accounting contains a ' + method + ' method');
  });
});
