import formatColumn from "ember-cli-accounting/format-column";

module("formatColumn");

test("formatColumn()", function() {
  // standard usage:
  var list = [123, 12345];
  equal(formatColumn(list, "$ ", 0).toString(), (["$    123", "$ 12,345"]).toString(), "formatColumn works as expected");


  // multi-dimensional array (formatColumn should be applied recursively):
  var list2 = [[1, 100], [900, 9]];
  equal(formatColumn(list2).toString(), ([["$  1.00", "$100.00"], ["$900.00", "$  9.00"]]).toString(), "formatcolumn works on multi-dimensional array");


  // random numbers, must come back same length:
  var column = formatColumn([Math.random(), Math.random() * 1000, Math.random() * 10000000]);
  ok((column[0].length === column[2].length && column[1].length === column[2].length), "formatColumn() with 3 random numbers returned strings of matching length");


  // random numbers, must come back same length:
  var column2 = formatColumn([Math.random(), Math.random() * 1000, Math.random() * 10000000], {
    format: '(%v] --++== %s',
    thousand: ')(',
    decimal: ')[',
    precision: 3
  });
  ok((column2[0].length === column2[2].length && column2[1].length === column2[2].length), "formatColumn() with 3 random numbers returned strings of matching length, even with a weird custom `format` parameter");

});
