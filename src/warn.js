/**
 * Parse dom and warn and create warnings about noopener
 */
'use strict'

// Dependencies
var domtosource = require("domtosource");

// Main function
function warn (input) {
  if (typeof input !== "string" || input === null || input === undefined) {
    throw new Error("Input into gulp-noopener must be a string.  Saw: " + input);
  }

  // domtosource wants a non-empty string, but that seems a bit much
  input = input === "" ? " " : input;

  // Find and check
  var results = domtosource.find(input, "a, form");
  var filtered = results.filter(function(r) {
    return r.el && r.el.attr("target") && !r.el.attr("rel");
  });

  return filtered && filtered.length > 0 ? filtered : undefined;
}

module.exports = warn
