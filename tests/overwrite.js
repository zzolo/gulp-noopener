'use strict'

// Dependencies
var test = require('tape')
var overwrite = require('../src/overwrite.js')

test('overwrite', function (t) {
  t.plan(16)

  t.throws(function() {
    overwrite(1);
  });
  t.throws(function() {
    overwrite({});
  });
  t.throws(function() {
    overwrite([]);
  });
  t.throws(function() {
    overwrite(null);
  });

  t.equal(overwrite('<a>thing</a>'), '<a>thing</a>')
  t.equal(overwrite('<a >thing</a>'), '<a >thing</a>')
  t.equal(overwrite('<a\t>thing</a>'), '<a\t>thing</a>')
  t.equal(overwrite('<a \n\n>thing</a>'), '<a \n\n>thing</a>')

  t.equal(overwrite('<a target="_blank">thing</a>'), '<a rel="noopener" target="_blank">thing</a>')
  t.equal(overwrite('<a target="something" >thing</a>'), '<a rel="noopener" target="something" >thing</a>')
  t.equal(overwrite('<a\t target="_blank">thing</a>'), '<a rel="noopener"\t target="_blank">thing</a>')
  t.equal(overwrite('<a \n\n target="_blank">thing</a>'), '<a rel="noopener" \n\n target="_blank">thing</a>')

  t.equal(overwrite('<a rel="noopener">thing</a>'), '<a rel="noopener">thing</a>')
  t.equal(overwrite('<a rel="noopener"  target="_blank">thing</a>'), '<a rel="noopener"  target="_blank">thing</a>')

  t.equal(overwrite('<form target="_blank"></form>'), '<form rel="noopener" target="_blank"></form>')

  t.equal(overwrite(
    '<a>thing</a><a target="_blank">thing</a><a>thing</a>'),
    '<a>thing</a><a rel="noopener" target="_blank">thing</a><a>thing</a>'
  )
})
