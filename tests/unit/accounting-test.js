import { test, module } from 'qunit';
import accounting from "accounting";

module("accounting");

test("contains all functions", function(assert) {
  ['format', 'formatColumn', 'formatMoney', 'formatNumber', 'parse', 'toFixed', 'unformat'].forEach(function(method){
    assert.ok(typeof accounting[method] === 'function', 'accounting contains a ' + method + ' method');
  });
});
