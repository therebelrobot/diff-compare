# diff-compare


[![NPM](https://nodei.co/npm/diff-compare.png?downloads=true)](https://nodei.co/npm/diff-compare/)
[![NPM](https://nodei.co/npm-dl/diff-compare.png?months=3&height=2)](https://nodei.co/npm/diff-compare/)

[![Join the chat at https://gitter.im/therebelrobot/diff-compare](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/therebelrobot/diff-compare?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)
[![Dependency Status](https://david-dm.org/therebelrobot/diff-compare.svg)](https://david-dm.org/therebelrobot/diff-compare)
[![Code Climate](https://codeclimate.com/github/therebelrobot/diff-compare/badges/gpa.svg)](https://codeclimate.com/github/therebelrobot/diff-compare)
[![Test Coverage](https://codeclimate.com/github/therebelrobot/diff-compare/badges/coverage.svg)](https://codeclimate.com/github/therebelrobot/diff-compare)

A javascript library for diffing text and generating corrected and annotated text.  This is a fork and derivative of
[ForbesLindesay/jsdifflib](https://github.com/ForbesLindesay/jsdifflib), which is in turn a fork of [cemerick/jsdifflib](https://github.com/cemerick/jsdifflib)

## Installation

    npm install diff-compare

## Overview

diff-compare is a Javascript library that provides:

1. a partial reimplementation of Python’s difflib module (specifically, the SequenceMatcher class)
2. rather than a view generator, as the previous modules have made, this provides a corrected list of items, language agnostic

## Example

```js
var diff = require('diff-compare');

var adjustedText = diff.build({
  baseText: baseText,
  newText: newText
})

```

## License

  Dual License: BSD + ISC
