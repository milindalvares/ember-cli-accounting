import unformat from "accounting/unformat";
import { number } from "accounting/settings";

module("unformat");

test("unformat()", function() {
	equal(unformat("$12,345,678.90 USD"), 12345678.9, 'Can unformat currency to float');
	equal(unformat(1234567890), 1234567890, 'Returns same value when passed an integer');
	equal(unformat("string"), 0, 'Returns 0 for a string with no numbers');
	equal(unformat({joss:1}), 0, 'Returns 0 for object');

	number.decimal = ',';
	equal(unformat("100,00"), 100, 'Uses decimal separator from settings');
	equal(unformat("¤1.000,00"), 1000, 'Uses decimal separator from settings');
	number.decimal = '.';
});

