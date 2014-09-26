module("unformat");

test("accounting.unformat()", function() {
	equal(accounting.unformat("$12,345,678.90 USD"), 12345678.9, 'Can unformat currency to float');
	equal(accounting.unformat(1234567890), 1234567890, 'Returns same value when passed an integer');
	equal(accounting.unformat("string"), 0, 'Returns 0 for a string with no numbers');
	equal(accounting.unformat({joss:1}), 0, 'Returns 0 for object');

	accounting.settings.number.decimal = ',';
	equal(accounting.unformat("100,00"), 100, 'Uses decimal separator from settings');
	equal(accounting.unformat("¤1.000,00"), 1000, 'Uses decimal separator from settings');
	accounting.settings.number.decimal = '.';
});

