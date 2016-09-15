/**
 * Generic text parser to add rel="noopener"
 */

function parse (input) {
  return input.replace(/(<a|<form)([^>]*)(>)/gi, function(match, p1, p2, p3) {
    // Can't get the regex to reject string with opener
    return p2.toLowerCase().indexOf("noopener") !== -1 ? "" + p1 + p2 + p3 :
      p1 + " rel=\"noopener\"" + p2 + p3;
  })
}

module.exports = parse
