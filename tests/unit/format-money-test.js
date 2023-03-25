import { test, module } from 'qunit';
import formatMoney from "accounting/format-money";
import {currency} from "accounting/settings";

// Format param is an object:
const format = {
  pos: "%s %v",
  neg: "%s (%v)",
  zero:"%s  --"
};

module("formatMoney");

test("formatMoney()", function(assert) {
  assert.equal(formatMoney(12345678), "$12,345,678.00", "Default usage with default parameters is ok");
  assert.equal(formatMoney(4999.99, "$ ", 2, ".", ","), "$ 4.999,99", 'custom formatting via straight params works ok');
  assert.equal(formatMoney(5318008, { symbol: "GBP",  format: "%v %s" }), "5,318,008.00 GBP", "`format` parameter is observed in string output");
  assert.equal(formatMoney(1000, { format: "test %v 123 %s test" }), "test 1,000.00 123 $ test", "`format` parameter is observed in string output, despite being rather strange");

  assert.equal(formatMoney(0, { symbol: "GBP",  format:format}), "GBP  --", "`format` parameter provided given as an object with `zero` format, correctly observed in string output");
  assert.equal(formatMoney(1000, { symbol: "GBP",  format:{neg:"--%v %s"}}), "GBP1,000.00", "`format` parameter provided, but only `neg` value provided - positive value should be formatted by default format (%s%v)");

  currency.format = "%s%v";
  formatMoney(0, {format:""});
  assert.equal(typeof currency.format, "object", "`currency.format` default string value should be reformatted to an object, the first time it is used");
});

test("handles negative values", function(assert) {
  assert.equal(formatMoney(-500000, "£ ", 0), "£ -500,000", 'negative values, custom params, works ok');
  assert.equal(formatMoney(-1000, { symbol: "GBP",  format:format}), "GBP (1,000.00)", "`format` parameter provided given as an object with `neg` format, correctly observed in string output");
});

test("handles $-0.00 stripping -", function(assert) {
  assert.equal(formatMoney(-0.0000000567), "$0.00", 'Removes - from -0.00');
});

test("handles specifying precision the simple way", function(assert) {
  assert.equal(formatMoney(80.07785, { precision: 3}), "$80.078", `is $80.078 when moneyString=80.07785 and precision=3`);
});

test("handles minPrecision and maxPrecision", function(assert) {
  let moneyString = '80.0760';
  const options = {
    precision: {
      minPrecision: 2,
      maxPrecision: 4,
    }
  };
  let params = [moneyString];
  let expected = '$80.076';
  assert.equal(formatMoney(params, options), expected, `is ${expected} when moneyString=${moneyString}`);

  moneyString = '0.0750';
  params = [moneyString];
  expected = '$0.075';
  assert.equal(formatMoney(params, options), expected, `is ${expected} when moneyString=${moneyString}`);

  moneyString = '57.6000';
  params = [moneyString];
  expected = '$57.60';
  assert.equal(formatMoney(params, options), expected, `is ${expected} when moneyString=${moneyString}`);
});
