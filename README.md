# diff-compare


[![NPM](https://nodei.co/npm/diff-compare.png?downloads=true)](https://nodei.co/npm/diff-compare/)
[![NPM](https://nodei.co/npm-dl/diff-compare.png?months=3&height=2)](https://nodei.co/npm/diff-compare/)

[![Join the chat at https://gitter.im/therebelrobot/diff-compare](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/therebelrobot/diff-compare?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)
[![Dependency Status](https://david-dm.org/therebelrobot/diff-compare.svg)](https://david-dm.org/therebelrobot/diff-compare)
[![semver](https://img.shields.io/badge/semver-1.0.2-blue.svg?style=flat)](http://semver.org/)
[![changelog](https://img.shields.io/badge/changelog-KACL-orange.svg?style=flat)](http://keepachangelog.com/)

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

## Changelog
### [Unreleased](https://github.com/therebelrobot/diff-compare/compare/release/v1.0.2...master)
*branch: [`master`](https://github.com/therebelrobot/diff-compare)

| Type | Link | Description |
| ---- | ---- | ----------- |

### [v1.0.2](https://github.com/therebelrobot/diff-compare/compare/release/v1.0.1...release/v1.0.2) | 2015-07-20
*branch: [release/v1.0.2](https://github.com/therebelrobot/diff-compare/tree/release/v1.0.2)*

| Type | Link | Description |
| ---- | ---- | ----------- |
| Added | [`e66bd85`](https://github.com/therebelrobot/diff-compare/commit/e66bd852fd5be81e7764634f8cec218c724cf05b) | Added badges and changelog to Readme |

### [v1.0.1](https://github.com/therebelrobot/diff-compare/compare/release/v1.0.0...release/v1.0.1) | 2015-07-20
*branch: [release/v1.0.1](https://github.com/therebelrobot/diff-compare/tree/release/v1.0.1)*

| Type | Link | Description |
| ---- | ---- | ----------- |
| Added | [`6aa50a7`](https://github.com/therebelrobot/diff-compare/commit/6aa50a72372b62ca1e426f2446073585290b8e9f) | Added badges |
| Changed | [`6aa50a7`](https://github.com/therebelrobot/diff-compare/commit/6aa50a72372b62ca1e426f2446073585290b8e9f) | Refactored build opts keys |
| Fixed | [`a371e21`](https://github.com/therebelrobot/diff-compare/commit/a371e214bc3cf65b541fb0ece0344e631323b030) | Code Climate CLI issue |

### [v1.0.0](https://github.com/therebelrobot/diff-compare/commit/46d3bd2f9f21770970094a8c35bea8e62cf4356d) | 2015-07-14
*branch: [release/v1.0.0](https://github.com/therebelrobot/diff-compare/tree/release/v1.0.0)*

| Type | Link | Description |
| ---- | ---- | ----------- |
| Added | | Initial Release |


## License

  Dual License: BSD + ISC
