

// Dependencies
var test = require('tape');
var parser = require("../src/parser.js");

test('parser', function(t) {
  t.plan(9);

  t.equal(parser("<a>thing</a>"), "<a rel=\"noopener\">thing</a>");
  t.equal(parser("<a >thing</a>"), "<a rel=\"noopener\" >thing</a>");
  t.equal(parser("<a\t>thing</a>"), "<a rel=\"noopener\"\t>thing</a>");
  t.equal(parser("<a \n\n>thing</a>"), "<a rel=\"noopener\" \n\n>thing</a>");

  t.equal(parser("<a target=\"_blank\">thing</a>"), "<a rel=\"noopener\" target=\"_blank\">thing</a>");

  t.equal(parser("<a rel=\"noopener\">thing</a>"), "<a rel=\"noopener\">thing</a>");
  t.equal(parser("<a rel=\"noopener\"  target=\"_blank\">thing</a>"), "<a rel=\"noopener\"  target=\"_blank\">thing</a>");

  t.equal(parser("<form></form>"), "<form rel=\"noopener\"></form>");

  t.equal(parser(
    "<a>thing</a><a>thing</a><a>thing</a>"),
    "<a rel=\"noopener\">thing</a><a rel=\"noopener\">thing</a><a rel=\"noopener\">thing</a>"
  );
});
