import parse from "ember-cli-accounting/parse";
import unformat from "ember-cli-accounting/unformat";

module("parse");

test("parse is an alias of unformat", function() {
  equal(parse, unformat, "parse and unformat are equivalent");
});
