var debug = require('trace-debug-log')
var _ = require('lodash')
var diffChars = require('diff').diffChars

module.exports = function _diffCompare(original_text, compare_text, opts) {
  opts = opts || {}
  var threshold = opts.threshold || 0.8

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
        var change_orig = []
        var change_compare = []
        var reconstructed_orig = ''
        var reconstructed_compare = ''
        _.forEach(diff, function _forEachDiff(part, index){
          if(!part.added && !part.removed){
            reconstructed_orig += part.value
            reconstructed_compare += part.value
          }
          else if(part.added){
            reconstructed_compare += part.value
            change_compare.push(_.range(reconstructed_compare.length-1-part.value.length,reconstructed_compare.length-1))
          }
          else if(part.removed){
            reconstructed_orig += part.value
            change_orig.push(_.range(reconstructed_orig.length-1-part.value.length,reconstructed_orig.length-1))
          }
        })
        change_orig = _.flatten(change_orig)
        change_compare = _.flatten(change_compare)
        console.log('char changes',change_orig,change_compare)


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

