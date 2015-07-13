var expect = require('chai').expect
var diff = require('../lib/diff-compare')
var debug = require('trace-debug-log')
debug.enable()
  /* Definitions for JS Standard */
  /* global describe, it */

describe('diff-compare', function () {
  it('should adjust for simple omissions', function (done) {
    var a = ['abc', 'def']
    var b = ['def']

    var a_adjusted = [{
      originalLine: 1,
      value: 'abc',
      type: 'delete'
    }, {
      originalLine: 2,
      value: 'def',
      type: 'equal'
    }]
    var b_adjusted = [{
      originalLine: null,
      value: '',
      type: 'delete'
    }, {
      originalLine: 1,
      value: 'def',
      type: 'equal'
    }]

    var adjusted = diff.build({
      baseTextLines: a,
      newTextLines: b
    })
    expect(adjusted).to.be.an('object')
    expect(adjusted.base).to.be.an('array')
    expect(adjusted.base).to.deep.equal(a_adjusted)
    expect(adjusted.compare).to.be.an('array')
    expect(adjusted.compare).to.deep.equal(b_adjusted)
    done()
  })

  it('should adjust for simple additions', function (done) {

    var a = ['def']
    var b = ['abc', 'def']

    var a_adjusted = [{
      originalLine: null,
      value: '',
      type: 'insert'
    }, {
      originalLine: 1,
      value: 'def',
      type: 'equal'
    }]
    var b_adjusted = [{
      originalLine: 1,
      value: 'abc',
      type: 'insert'
    }, {
      originalLine: 2,
      value: 'def',
      type: 'equal'
    }]

    var adjusted = diff.build({
      baseTextLines: a,
      newTextLines: b
    })
    expect(adjusted).to.be.an('object')
    expect(adjusted.base).to.be.an('array')
    expect(adjusted.base).to.deep.equal(a_adjusted)
    expect(adjusted.compare).to.be.an('array')
    expect(adjusted.compare).to.deep.equal(b_adjusted)
    done()
  })
  it('should adjust for simple changes', function (done) {

    var a = ['acc', 'def']
    var b = ['abc', 'def']

    var a_adjusted = [{
      originalLine: 1,
      value: 'acc',
      type: 'replace'
    }, {
      originalLine: 2,
      value: 'def',
      type: 'equal'
    }]
    var b_adjusted = [{
      originalLine: 1,
      value: 'abc',
      type: 'replace'
    }, {
      originalLine: 2,
      value: 'def',
      type: 'equal'
    }]

    var adjusted = diff.build({
      baseTextLines: a,
      newTextLines: b
    })
    expect(adjusted).to.be.an('object')
    expect(adjusted.base).to.be.an('array')
    expect(adjusted.base).to.deep.equal(a_adjusted)
    expect(adjusted.compare).to.be.an('array')
    expect(adjusted.compare).to.deep.equal(b_adjusted)
    done()
  })
  it('should adjust for multi-line omissions', function (done) {
    var a = ['abc', 'def', 'ghi', 'jkl']
    var b = ['jkl']

    var a_adjusted = [{
      originalLine: 1,
      value: 'abc',
      type: 'delete'
    }, {
      originalLine: 2,
      value: 'def',
      type: 'delete'
    }, {
      originalLine: 3,
      value: 'ghi',
      type: 'delete'
    }, {
      originalLine: 4,
      value: 'jkl',
      type: 'equal'
    }]
    var b_adjusted = [{
      originalLine: null,
      value: '',
      type: 'delete'
    }, {
      originalLine: null,
      value: '',
      type: 'delete'
    }, {
      originalLine: null,
      value: '',
      type: 'delete'
    }, {
      originalLine: 1,
      value: 'jkl',
      type: 'equal'
    }]

    var adjusted = diff.build({
      baseTextLines: a,
      newTextLines: b
    })
    expect(adjusted).to.be.an('object')
    expect(adjusted.base).to.be.an('array')
    expect(adjusted.base).to.deep.equal(a_adjusted)
    expect(adjusted.compare).to.be.an('array')
    expect(adjusted.compare).to.deep.equal(b_adjusted)

    done()
  })
  it('should adjust for multi-line additions', function (done) {
    var a = ['jkl']
    var b = ['abc', 'def', 'ghi', 'jkl']

    var a_adjusted = [{
      originalLine: null,
      value: '',
      type: 'insert'
    }, {
      originalLine: null,
      value: '',
      type: 'insert'
    }, {
      originalLine: null,
      value: '',
      type: 'insert'
    }, {
      originalLine: 1,
      value: 'jkl',
      type: 'equal'
    }]
    var b_adjusted = [{
      originalLine: 1,
      value: 'abc',
      type: 'insert'
    }, {
      originalLine: 2,
      value: 'def',
      type: 'insert'
    }, {
      originalLine: 3,
      value: 'ghi',
      type: 'insert'
    }, {
      originalLine: 4,
      value: 'jkl',
      type: 'equal'
    }]

    var adjusted = diff.build({
      baseTextLines: a,
      newTextLines: b
    })
    expect(adjusted).to.be.an('object')
    expect(adjusted.base).to.be.an('array')
    expect(adjusted.base).to.deep.equal(a_adjusted)
    expect(adjusted.compare).to.be.an('array')
    expect(adjusted.compare).to.deep.equal(b_adjusted)
    done()
  })
  it('should adjust for multiple simple additions', function (done) {

    var a = ['def', 'jkl']
    var b = ['abc', 'def', 'ghi', 'jkl']

    var a_adjusted = [{
      originalLine: null,
      value: '',
      type: 'insert'
    }, {
      originalLine: 1,
      value: 'def',
      type: 'equal'
    }, {
      originalLine: null,
      value: '',
      type: 'insert'
    }, {
      originalLine: 2,
      value: 'jkl',
      type: 'equal'
    }]
    var b_adjusted = [{
      originalLine: 1,
      value: 'abc',
      type: 'insert'
    }, {
      originalLine: 2,
      value: 'def',
      type: 'equal'
    }, {
      originalLine: 3,
      value: 'ghi',
      type: 'insert'
    }, {
      originalLine: 4,
      value: 'jkl',
      type: 'equal'
    }]

    var adjusted = diff.build({
      baseTextLines: a,
      newTextLines: b
    })
    expect(adjusted).to.be.an('object')
    expect(adjusted.base).to.be.an('array')
    expect(adjusted.base).to.deep.equal(a_adjusted)
    expect(adjusted.compare).to.be.an('array')
    expect(adjusted.compare).to.deep.equal(b_adjusted)

    done()
  })

  it('should adjust for multiple simple ommissions', function (done) {

    var a = ['abc', 'def', 'ghi', 'jkl']
    var b = ['def', 'jkl']

    var a_adjusted = [{
      originalLine: 1,
      value: 'abc',
      type: 'delete'
    }, {
      originalLine: 2,
      value: 'def',
      type: 'equal'
    }, {
      originalLine: 3,
      value: 'ghi',
      type: 'delete'
    }, {
      originalLine: 4,
      value: 'jkl',
      type: 'equal'
    }]
    var b_adjusted = [{
      originalLine: null,
      value: '',
      type: 'delete'
    }, {
      originalLine: 1,
      value: 'def',
      type: 'equal'
    }, {
      originalLine: null,
      value: '',
      type: 'delete'
    }, {
      originalLine: 2,
      value: 'jkl',
      type: 'equal'
    }]

    var adjusted = diff.build({
      baseTextLines: a,
      newTextLines: b
    })
    expect(adjusted).to.be.an('object')
    expect(adjusted.base).to.be.an('array')
    expect(adjusted.base).to.deep.equal(a_adjusted)
    expect(adjusted.compare).to.be.an('array')
    expect(adjusted.compare).to.deep.equal(b_adjusted)

    done()
  })
  it('should adjust for multiple simple changes', function (done) {

    var a = ['abc', 'def', 'ggi', 'jkl']
    var b = ['acc', 'def', 'ghi', 'jkl']

    var a_adjusted = [{
      originalLine: 1,
      value: 'abc',
      type: 'replace'
    }, {
      originalLine: 2,
      value: 'def',
      type: 'equal'
    }, {
      originalLine: 3,
      value: 'ggi',
      type: 'replace'
    }, {
      originalLine: 4,
      value: 'jkl',
      type: 'equal'
    }]
    var b_adjusted = [{
      originalLine: 1,
      value: 'acc',
      type: 'replace'
    }, {
      originalLine: 2,
      value: 'def',
      type: 'equal'
    }, {
      originalLine: 3,
      value: 'ghi',
      type: 'replace'
    }, {
      originalLine: 4,
      value: 'jkl',
      type: 'equal'
    }]

    var adjusted = diff.build({
      baseTextLines: a,
      newTextLines: b
    })
    expect(adjusted).to.be.an('object')
    expect(adjusted.base).to.be.an('array')
    expect(adjusted.base).to.deep.equal(a_adjusted)
    expect(adjusted.compare).to.be.an('array')
    expect(adjusted.compare).to.deep.equal(b_adjusted)
    done()
  })
  it('should adjust for multiple simple additions + simple ommissions', function (done) {

    var a = ['def', 'jkl', 'mno', 'pqr', 'stu', 'vwx']
    var b = ['abc', 'def', 'ghi', 'jkl', 'pqr', 'vwx']

    var a_adjusted = [{
      originalLine: null,
      value: '',
      type: 'insert'
    }, {
      originalLine: 1,
      value: 'def',
      type: 'equal'
    }, {
      originalLine: null,
      value: '',
      type: 'insert'
    }, {
      originalLine: 2,
      value: 'jkl',
      type: 'equal'
    }, {
      originalLine: 3,
      value: 'mno',
      type: 'delete'
    }, {
      originalLine: 4,
      value: 'pqr',
      type: 'equal'
    }, {
      originalLine: 5,
      value: 'stu',
      type: 'delete'
    }, {
      originalLine: 6,
      value: 'vwx',
      type: 'equal'
    }]
    var b_adjusted = [{
      originalLine: 1,
      value: 'abc',
      type: 'insert'
    }, {
      originalLine: 2,
      value: 'def',
      type: 'equal'
    }, {
      originalLine: 3,
      value: 'ghi',
      type: 'insert'
    }, {
      originalLine: 4,
      value: 'jkl',
      type: 'equal'
    }, {
      originalLine: null,
      value: '',
      type: 'delete'
    }, {
      originalLine: 5,
      value: 'pqr',
      type: 'equal'
    }, {
      originalLine: null,
      value: '',
      type: 'delete'
    }, {
      originalLine: 6,
      value: 'vwx',
      type: 'equal'
    }]

    var adjusted = diff.build({
      baseTextLines: a,
      newTextLines: b
    })
    expect(adjusted).to.be.an('object')
    expect(adjusted.base).to.be.an('array')
    expect(adjusted.base).to.deep.equal(a_adjusted)
    expect(adjusted.compare).to.be.an('array')
    expect(adjusted.compare).to.deep.equal(b_adjusted)
    done()
  })
  it('should adjust for multiple simple omissions + simple additions', function (done) {

    var a = ['abc', 'def', 'ghi', 'jkl', 'pqr', 'vwx']
    var b = ['def', 'jkl', 'mno', 'pqr', 'stu', 'vwx']

    var a_adjusted = [{
      originalLine: 1,
      value: 'abc',
      type: 'delete'
    }, {
      originalLine: 2,
      value: 'def',
      type: 'equal'
    }, {
      originalLine: 3,
      value: 'ghi',
      type: 'delete'
    }, {
      originalLine: 4,
      value: 'jkl',
      type: 'equal'
    }, {
      originalLine: null,
      value: '',
      type: 'insert'
    }, {
      originalLine: 5,
      value: 'pqr',
      type: 'equal'
    }, {
      originalLine: null,
      value: '',
      type: 'insert'
    }, {
      originalLine: 6,
      value: 'vwx',
      type: 'equal'
    }]
    var b_adjusted = [{
      originalLine: null,
      value: '',
      type: 'delete'
    }, {
      originalLine: 1,
      value: 'def',
      type: 'equal'
    }, {
      originalLine: null,
      value: '',
      type: 'delete'
    }, {
      originalLine: 2,
      value: 'jkl',
      type: 'equal'
    }, {
      originalLine: 3,
      value: 'mno',
      type: 'insert'
    }, {
      originalLine: 4,
      value: 'pqr',
      type: 'equal'
    }, {
      originalLine: 5,
      value: 'stu',
      type: 'insert'
    }, {
      originalLine: 6,
      value: 'vwx',
      type: 'equal'
    }]

    var adjusted = diff.build({
      baseTextLines: a,
      newTextLines: b
    })
    expect(adjusted).to.be.an('object')
    expect(adjusted.base).to.be.an('array')
    expect(adjusted.base).to.deep.equal(a_adjusted)
    expect(adjusted.compare).to.be.an('array')
    expect(adjusted.compare).to.deep.equal(b_adjusted)

    done()
  })
  it('should adjust for multiple simple additions + simple changes', function (done) {

    var a = ['abc', 'ghi', 'mno', 'pqq']
    var b = ['abc', 'def', 'ghi', 'jkl', 'mno', 'pqr']

    var a_adjusted = [{
      originalLine: 1,
      value: 'abc',
      type: 'equal'
    }, {
      originalLine: null,
      value: '',
      type: 'insert'
    }, {
      originalLine: 2,
      value: 'ghi',
      type: 'equal'
    }, {
      originalLine: null,
      value: '',
      type: 'insert'
    }, {
      originalLine: 3,
      value: 'mno',
      type: 'equal'
    }, {
      originalLine: 4,
      value: 'pqq',
      type: 'replace'
    }]
    var b_adjusted = [{
      originalLine: 1,
      value: 'abc',
      type: 'equal'
    }, {
      originalLine: 2,
      value: 'def',
      type: 'insert'
    }, {
      originalLine: 3,
      value: 'ghi',
      type: 'equal'
    }, {
      originalLine: 4,
      value: 'jkl',
      type: 'insert'
    }, {
      originalLine: 5,
      value: 'mno',
      type: 'equal'
    }, {
      originalLine: 6,
      value: 'pqr',
      type: 'replace'
    }]

    var adjusted = diff.build({
      baseTextLines: a,
      newTextLines: b
    })
    expect(adjusted).to.be.an('object')
    expect(adjusted.base).to.be.an('array')
    expect(adjusted.base).to.deep.equal(a_adjusted)
    expect(adjusted.compare).to.be.an('array')
    expect(adjusted.compare).to.deep.equal(b_adjusted)

    done()
  })
  it('should adjust for multiple simple ommissions + simple changes', function (done) {

    var a = ['abc', 'def', 'ghi', 'jkl', 'mno', 'pqr']
    var b = ['abc', 'ghi', 'mno', 'pqq']

    var a_adjusted = [{
      originalLine: 1,
      value: 'abc',
      type: 'equal'
    }, {
      originalLine: 2,
      value: 'def',
      type: 'delete'
    }, {
      originalLine: 3,
      value: 'ghi',
      type: 'equal'
    }, {
      originalLine: 4,
      value: 'jkl',
      type: 'delete'
    }, {
      originalLine: 5,
      value: 'mno',
      type: 'equal'
    }, {
      originalLine: 6,
      value: 'pqr',
      type: 'replace'
    }]
    var b_adjusted = [{
      originalLine: 1,
      value: 'abc',
      type: 'equal'
    }, {
      originalLine: null,
      value: '',
      type: 'delete'
    }, {
      originalLine: 2,
      value: 'ghi',
      type: 'equal'
    }, {
      originalLine: null,
      value: '',
      type: 'delete'
    }, {
      originalLine: 3,
      value: 'mno',
      type: 'equal'
    }, {
      originalLine: 4,
      value: 'pqq',
      type: 'replace'
    }]

    var adjusted = diff.build({
      baseTextLines: a,
      newTextLines: b
    })
    expect(adjusted).to.be.an('object')
    expect(adjusted.base).to.be.an('array')
    expect(adjusted.base).to.deep.equal(a_adjusted)
    expect(adjusted.compare).to.be.an('array')
    expect(adjusted.compare).to.deep.equal(b_adjusted)

    done()
  })
})
