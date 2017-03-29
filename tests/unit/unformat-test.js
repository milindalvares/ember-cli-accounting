import { test, module } from 'qunit';
import unformat from "accounting/unformat";
import { number } from "accounting/settings";

module("unformat");

test("unformat()", function(assert) {
	assert.equal(unformat("$12,345,678.90 USD"), 12345678.9, 'Can unformat currency to float');
	assert.equal(unformat(1234567890), 1234567890, 'Returns same value when passed an integer');
	assert.equal(unformat("string"), 0, 'Returns 0 for a string with no numbers');
	assert.equal(unformat({joss:1}), 0, 'Returns 0 for object');

	assert.equal(unformat('Bs.123.56'), 123.56, 'Can unformat Bs.');
	assert.equal(unformat('Rs. 123.56'), 123.56, 'Can unformat Rs.');
	assert.equal(unformat('\u2212123.56'), -123.56, 'Can unformat minus sign');

	number.decimal = ',';
	assert.equal(unformat("100,00"), 100, 'Uses decimal separator from settings');
	assert.equal(unformat("¤1.000,00"), 1000, 'Uses decimal separator from settings');
	number.decimal = '.';
});

