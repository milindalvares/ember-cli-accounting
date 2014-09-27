import parse from "accounting/parse";
import unformat from "accounting/unformat";

module("parse");

test("parse is an alias of unformat", function() {
  equal(parse, unformat, "parse and unformat are equivalent");
});
