var debug = require('trace-debug-log')
var _ = require('lodash')
var diffChars = require('diff').diffChars

module.exports = function _diffCompare(original_text, compare_text, opts) {
  opts = opts || {}
  var threshold = opts.threshold || 0.5

  var results = []
  var annotations = [{
      omissions: [],
      changes: [],
      inert: []
    }, {
      additions: [],
      changes: [],
      inert: []
    }]
    // Omissions and changes, original_text > compare_text
  _.forEach(original_text, function _forEachOriginal(line, index) {
    if (line !== compare_text[index]) {
      var offset = 0
      var found = false
      for (var i = index; i < original_text.length; i++) {
        // diff check
        var diff = diffChars(original_text[i],compare_text[index])
        debug(diff)
        // simple omission check
        if (!found && original_text[i] !== compare_text[index]) {
          offset++
        }
        else if (!found && original_text[i] === compare_text[index]) {
          found = true
          for (var ii = 0; ii < offset; ii++) {
            compare_text.splice(index, 0, '');
            annotations[0].omissions.push(index+ii)
            annotations[1].inert.push(index+ii)

          }
        }
      }
    }
    // see if line is present

    // if not, scan for if present later
    // if not, scan for if changed
    // if not scan for if change later
  })
  // Additions, original_text > compare_text
  _.forEach(compare_text, function _forEachCompare(line, index){
    if (line !== original_text[index]) {
      var offset = 0
      var found = false
      for (var i = index; i < compare_text.length; i++) {
        // simple omission check
        if (!found && compare_text[i] !== original_text[index]) {
          offset++
        }
        else if (!found && compare_text[i] === original_text[index]) {
          found = true
          for (var ii = 0; ii < offset; ii++) {
            original_text.splice(index, 0, '');
            annotations[1].additions.push(index+ii)
            annotations[0].inert.push(index+ii)
          }
        }
      }
    }
  })
  debug(original_text, compare_text, annotations)

  return {
    results: [original_text, compare_text],
    annotations: annotations
  }
}

