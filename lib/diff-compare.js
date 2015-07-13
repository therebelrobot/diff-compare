var diffCompare = module.exports = {
  __whitespace: {
    ' ': true,
    '\t': true,
    '\n': true,
    '\f': true,
    '\r': true
  },
  defaultJunkFunction: function (c) {
    return diffCompare.__whitespace.hasOwnProperty(c)
  },

  stripLinebreaks: function (str) {
    return str.replace(/^[\n\r]*|[\n\r]*$/g, '')
  },

  stringAsLines: function (str) {
    var lfpos = str.indexOf('\n')
    var crpos = str.indexOf('\r')
    var linebreak = ((lfpos > -1 && crpos > -1) || crpos < 0) ? '\n' : '\r'

    var lines = str.split(linebreak)
    for (var i = 0; i < lines.length; i++) {
      lines[i] = diffCompare.stripLinebreaks(lines[i])
    }

    return lines
  },

  // iteration-based reduce implementation
  __reduce: function (func, list, initial) {
    var value, idx
    if (initial != null) {
      value = initial
      idx = 0
    } else if (list) {
      value = list[0]
      idx = 1
    } else {
      return null
    }

    for (; idx < list.length; idx++) {
      value = func(value, list[idx])
    }

    return value
  },

  // comparison function for sorting lists of numeric tuples
  __ntuplecomp: function (a, b) {
    var mlen = Math.max(a.length, b.length)
    for (var i = 0; i < mlen; i++) {
      if (a[i] < b[i]) return -1
      if (a[i] > b[i]) return 1
    }

    return a.length === b.length ? 0 : (a.length < b.length ? -1 : 1)
  },

  __calculate_ratio: function (matches, length) {
    return length ? 2.0 * matches / length : 1.0
  },
  __range: function (start, edge, step) {
    if (arguments.length === 1) {
      edge = start
      start = 0
    }
    edge = edge || 0
    step = step || 1

    for (var ret = [];
      (edge - start) * step > 0; start += step) {
      ret.push(start)
    }
    return ret
  },
  __findIndex: function (array, predicate) {
    if (array === null) {
      throw new TypeError('__findIndex called on null or undefined')
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function')
    }
    var list = Object(array)
    var length = list.length >>> 0
    var arrayArg = arguments[2]
    var value

    for (var i = 0; i < length; i++) {
      value = list[i]
      if (predicate.call(arrayArg, value, i, list)) {
        return i
      }
    }
    return -1
  },

  // returns a function that returns true if a key passed to the returned function
  // is in the dict (js object) provided to this function replaces being able to
  // carry around dict.has_key in python...
  __isindict: function (dict) {
    return function (key) {
      return dict.hasOwnProperty(key)
    }
  },

  // replacement for python's dict.get function -- need easy default values
  __dictget: function (dict, key, defaultValue) {
    return dict.hasOwnProperty(key) ? dict[key] : defaultValue
  },

  SequenceMatcher: function (a, b, isjunk) {
    this.set_seqs = function (a, b) {
      this.set_seq1(a)
      this.set_seq2(b)
    }

    this.set_seq1 = function (a) {
      if (a === this.a) return
      this.a = a
      this.matching_blocks = this.opcodes = null
    }

    this.set_seq2 = function (b) {
      if (b === this.b) return
      this.b = b
      this.matching_blocks = this.opcodes = this.fullbcount = null
      this.__chain_b()
    }

    this.__chain_b = function () {
      var b = this.b
      var n = b.length
      var b2j = this.b2j = {}
      var populardict = {}
      var elt
      for (var i = 0; i < b.length; i++) {
        elt = b[i]
        if (b2j.hasOwnProperty(elt)) {
          var indices = b2j[elt]
          if (n >= 200 && indices.length * 100 > n) {
            populardict[elt] = 1
            delete b2j[elt]
          } else {
            indices.push(i)
          }
        } else {
          b2j[elt] = [i]
        }
      }

      for (elt in populardict) {
        if (populardict.hasOwnProperty(elt)) {
          delete b2j[elt]
        }
      }

      var isjunk = this.isjunk
      var junkdict = {}
      if (isjunk) {
        for (elt in populardict) {
          if (populardict.hasOwnProperty(elt) && isjunk(elt)) {
            junkdict[elt] = 1
            delete populardict[elt]
          }
        }
        for (elt in b2j) {
          if (b2j.hasOwnProperty(elt) && isjunk(elt)) {
            junkdict[elt] = 1
            delete b2j[elt]
          }
        }
      }

      this.isbjunk = diffCompare.__isindict(junkdict)
      this.isbpopular = diffCompare.__isindict(populardict)
    }

    this.find_longest_match = function (alo, ahi, blo, bhi) {
      var a = this.a
      var b = this.b
      var b2j = this.b2j
      var isbjunk = this.isbjunk
      var besti = alo
      var bestj = blo
      var bestsize = 0
      var j = null

      var j2len = {}
      var nothing = []
      var k
      for (var i = alo; i < ahi; i++) {
        var newj2len = {}
        var jdict = diffCompare.__dictget(b2j, a[i], nothing)
        for (var jkey in jdict) {
          if (jdict.hasOwnProperty(jkey)) {
            j = jdict[jkey]
            if (j < blo) continue
            if (j >= bhi) break
            newj2len[j] = k = diffCompare.__dictget(j2len, j - 1, 0) + 1
            if (k > bestsize) {
              besti = i - k + 1
              bestj = j - k + 1
              bestsize = k
            }
          }
        }
        j2len = newj2len
      }

      while (besti > alo && bestj > blo && !isbjunk(b[bestj - 1]) && a[besti - 1] === b[bestj - 1]) {
        besti--
        bestj--
        bestsize++
      }

      while (besti + bestsize < ahi && bestj + bestsize < bhi &&
        !isbjunk(b[bestj + bestsize]) &&
        a[besti + bestsize] === b[bestj + bestsize]) {
        bestsize++
      }

      while (besti > alo && bestj > blo && isbjunk(b[bestj - 1]) && a[besti - 1] === b[bestj - 1]) {
        besti--
        bestj--
        bestsize++
      }

      while (besti + bestsize < ahi && bestj + bestsize < bhi && isbjunk(b[bestj + bestsize]) &&
        a[besti + bestsize] === b[bestj + bestsize]) {
        bestsize++
      }

      return [besti, bestj, bestsize]
    }

    this.get_matching_blocks = function () {
      if (this.matching_blocks != null) return this.matching_blocks
      var la = this.a.length
      var lb = this.b.length

      var queue = [
        [0, la, 0, lb]
      ]
      var matching_blocks = []
      var alo, ahi, blo, bhi, qi, i, j, k, x
      while (queue.length) {
        qi = queue.pop()
        alo = qi[0]
        ahi = qi[1]
        blo = qi[2]
        bhi = qi[3]
        x = this.find_longest_match(alo, ahi, blo, bhi)
        i = x[0]
        j = x[1]
        k = x[2]

        if (k) {
          matching_blocks.push(x)
          if (alo < i && blo < j) {
            queue.push([alo, i, blo, j])
          }
          if (i + k < ahi && j + k < bhi) {
            queue.push([i + k, ahi, j + k, bhi])
          }
        }
      }

      matching_blocks.sort(diffCompare.__ntuplecomp)
      var j1, k1, block, i2, j2, k2
      var i1 = j1 = k1 = block = 0
      var non_adjacent = []
      for (var idx in matching_blocks) {
        if (matching_blocks.hasOwnProperty(idx)) {
          block = matching_blocks[idx]
          i2 = block[0]
          j2 = block[1]
          k2 = block[2]
          if (i1 + k1 === i2 && j1 + k1 === j2) {
            k1 += k2
          } else {
            if (k1) non_adjacent.push([i1, j1, k1])
            i1 = i2
            j1 = j2
            k1 = k2
          }
        }
      }

      if (k1) non_adjacent.push([i1, j1, k1])

      non_adjacent.push([la, lb, 0])
      this.matching_blocks = non_adjacent
      return this.matching_blocks
    }

    this.get_opcodes = function () {
      if (this.opcodes != null) return this.opcodes
      var i = 0
      var j = 0
      var answer = []
      this.opcodes = answer
      var block, ai, bj, size, tag
      var blocks = this.get_matching_blocks()
      for (var idx in blocks) {
        if (blocks.hasOwnProperty(idx)) {
          block = blocks[idx]
          ai = block[0]
          bj = block[1]
          size = block[2]
          tag = ''
          if (i < ai && j < bj) {
            tag = 'replace'
          } else if (i < ai) {
            tag = 'delete'
          } else if (j < bj) {
            tag = 'insert'
          }
          if (tag) answer.push([tag, i, ai, j, bj])
          i = ai + size
          j = bj + size

          if (size) answer.push(['equal', ai, i, bj, j])
        }
      }

      return answer
    }

    this.isjunk = isjunk ? isjunk : diffCompare.defaultJunkFunction
    this.a = this.b = null
    this.set_seqs(a, b)
  },

  __buildDiffObject: function (opcodes, rows) {
    var finalDiff = {
      base: [],
      compare: []
    }
    var i
    for (i = 0; i < rows.length; i++) {
      var originalLineBase = parseInt(rows[i][0], 10)
      if (isNaN(originalLineBase)) {
        originalLineBase = null
      }
      var originalLineCompare = parseInt(rows[i][2], 10)
      if (isNaN(originalLineCompare)) {
        originalLineCompare = null
      }
      finalDiff.base.push({
        originalLine: originalLineBase,
        value: rows[i][1]
      })
      finalDiff.compare.push({
        originalLine: originalLineCompare,
        value: rows[i][3]
      })
    }

    // Set types of lines
    var ii
    for (i = 0; i < opcodes.length; i++) { // every code range
      var type = opcodes[i][0]
      var baseRange = diffCompare.__range(opcodes[i][1], opcodes[i][2])
      var compareRange = diffCompare.__range(opcodes[i][3], opcodes[i][4])
      var originalLine
      for (ii = 0; ii < baseRange.length; ii++) { // each range index
        originalLine = baseRange[ii] + 1
        var baseIndex = diffCompare.__findIndex(finalDiff.base, function (element, index, array) {
          return element.originalLine === originalLine
        })
        finalDiff.base[baseIndex].type = type
        if (type === 'delete') {
          finalDiff.compare[baseIndex].type = type
        }
      }
      for (ii = 0; ii < compareRange.length; ii++) {
        originalLine = compareRange[ii] + 1
        var compareIndex = diffCompare.__findIndex(finalDiff.compare, function (element, index, array) {
          return element.originalLine === originalLine
        })
        finalDiff.compare[compareIndex].type = type
        if (type === 'insert') {
          finalDiff.base[compareIndex].type = type
        }
      }
    }
    return finalDiff
  },
  /**
   * Builds and returns a visual diff view.  The single parameter, `params', should contain
   * the following values:
   *
   * - baseText: the string that will be used as the base input to SequenceMatcher
   * - nextText: the string that will be used as the new text input to SequenceMatcher
   *
   * or
   *
   * - baseTextLines: the array of strings that was used as the base text input to SequenceMatcher
   * - newTextLines: the array of strings that was used as the new text input to SequenceMatcher
   * - opcodes: the array of arrays returned by SequenceMatcher.get_opcodes()
   *
   * and:
   *
   * - contextSize: the number of lines of context to show around differences by default, all lines
   *     are shown
   * - inline: if false, a side-by-side diff view is generated (default) if true, an inline diff view is
   *     generated
   */
  build: function (params) {
    var baseTextLines = params.baseTextLines === undefined ?
      diffCompare.stringAsLines(params.baseText) :
      params.baseTextLines
    var newTextLines = params.newTextLines === undefined ?
      diffCompare.stringAsLines(params.newText) :
      params.newTextLines
    var opcodes = params.opcodes === undefined ?
      (new diffCompare.SequenceMatcher(baseTextLines, newTextLines)).get_opcodes() :
      params.opcodes
    var contextSize = params.contextSize || 999

    if (baseTextLines === null) {
      throw new Error('Cannot build diff view baseTextLines is not defined.')
    }
    if (newTextLines === null) {
      throw new Error('Cannot build diff view newTextLines is not defined.')
    }
    if (!opcodes) {
      throw new Error('Canno build diff view opcodes is not defined.')
    }

    var rows = []
      // var node2

    // /**
    //  * Adds two cells to the given row if the given row corresponds to a real
    //  * line number (based on the line index tidx and the endpoint of the
    //  * range in question tend), then the cells will contain the line number
    //  * and the line of text from textLines at position tidx (with the class of
    //  * the second cell set to the name of the change represented), and tidx + 1 will
    //  * be returned.   Otherwise, tidx is returned, and two empty cells are added
    //  * to the given row.
    //  */
    function addCells (row, tidx, tend, textLines, change) {
      if (tidx < tend) {
        row.push((tidx + 1).toString())
        row.push(textLines[tidx].replace(/\t/g, '\u00a0\u00a0\u00a0\u00a0'))
        return tidx + 1
      } else {
        row.push('')
        row.push('')
        return tidx
      }
    }

    for (var idx = 0; idx < opcodes.length; idx++) {
      var code = opcodes[idx]
      var change = code[0]
      var b = code[1]
      var be = code[2]
      var n = code[3]
      var ne = code[4]
      var rowcnt = Math.max(be - b, ne - n)
      var toprows = []
      var botrows = []
      var i
      for (i = 0; i < rowcnt; i++) {
        // jump ahead if we've alredy provided leading context or if this is the first range
        if (contextSize && opcodes.length > 1 && ((idx > 0 && i === contextSize) || (idx === 0 && i === 0)) && change === 'equal') {
          var jump = rowcnt - ((idx === 0 ? 1 : 2) * contextSize)
          if (jump > 1) {
            var node
            toprows.push(node = [])

            b += jump
            n += jump
            i += jump - 1
            node.push('...')
            node.push('skip')
            node.push('...')
            node.push('skip')

            // skip last lines if they're all equal
            if (idx + 1 === opcodes.length) {
              break
            } else {
              continue
            }
          }
        }

        toprows.push(node = [])
        b = addCells(node, b, be, baseTextLines, change)
        n = addCells(node, n, ne, newTextLines, change)
      }

      for (i = 0; i < toprows.length; i++) rows.push(toprows[i])
      for (i = 0; i < botrows.length; i++) rows.push(botrows[i])
    }

    return diffCompare.__buildDiffObject(opcodes, rows)
  }
}
