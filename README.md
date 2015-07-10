# diff-compare

Work in progress.

A javascript library for diffing text and generating corresponding HTML views.  This is a fork and derivative of [ForbesLindesay/jsdifflib](https://github.com/ForbesLindesay/jsdifflib), which is in turn a fork of [cemerick/jsdifflib](https://github.com/cemerick/jsdifflib)

[![NPM version](https://img.shields.io/npm/v/diff-compare.svg)](http://badge.fury.io/js/diff-compare)

## Installation

    npm install diff-compare

## Overview

diff-compare is a Javascript library that provides:

1. a partial reimplementation of Python’s difflib module (specifically, the SequenceMatcher class)
2. rather than a view generator, as the previous modules have made, this provides a corrected list of items, language agnostic

## Example

```js
var diff = require('diff-compare');

function getDiff(baseTextRaw, newTextRaw) {
  // build the diff view and return a DOM node
  return diff.buildView({
      baseText: baseText,
      newText: newText,
      // set the display titles for each resource
      baseTextName: "Base Text",
      newTextName: "New Text",
      contextSize: 10,
      //set inine to true if you want inline
      //rather than side by side diff
      inline: true
  });
}

document.body.appendChild(getDiff('source', 'destination'));
```

## License

  BSD