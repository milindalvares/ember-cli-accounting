import { test, module } from 'qunit';
import parse from "accounting/parse";
import unformat from "accounting/unformat";

module("parse");

test("parse is an alias of unformat", function(assert) {
  assert.equal(parse, unformat, "parse and unformat are equivalent");
});
