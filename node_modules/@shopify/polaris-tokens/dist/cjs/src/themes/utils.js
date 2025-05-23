'use strict';

var _rollupPluginBabelHelpers = require('../../_virtual/_rollupPluginBabelHelpers.js');
var deepmerge = require('deepmerge');
var utils = require('../utils.js');
var index = require('./base/index.js');

/**
 * Mimics the behavior of an identity function:
 * - Validates the input matches the `MetaThemeShape` type exactly
 * - Converts all `px` values to `rem`
 * - Infers all members
 *
 * @example
 * ```
 * const example = createMetaThemePartial({
 *   color: {
 *     bg: {value: '#fff'},
 *   },
 * })
 * ```
 *
 * Where `typeof example` is inferred as `{ color: { bg: { value: string } } }`
 */
function createMetaThemePartial(metaThemePartial) {
  return Object.fromEntries(Object.entries(metaThemePartial).map(function (_ref) {
    var _ref2 = _rollupPluginBabelHelpers.slicedToArray(_ref, 2),
      tokenGroupName = _ref2[0],
      tokenGroup = _ref2[1];
    return [tokenGroupName, tokenGroup && utils.tokenGroupNamesToRems.includes(tokenGroupName) ? utils.tokenGroupToRems(tokenGroup) : tokenGroup];
  }));
}
function createMetaTheme(metaThemePartial) {
  return deepmerge(index.metaThemeBase, metaThemePartial);
}
function createThemeClassName(themeName) {
  return "p-theme-" + themeName;
}
function createIsTokenName(theme) {
  var tokenNames = new Set(utils.getTokenNames(theme));
  return function (tokenName) {
    return tokenNames.has(tokenName);
  };
}

exports.createIsTokenName = createIsTokenName;
exports.createMetaTheme = createMetaTheme;
exports.createMetaThemePartial = createMetaThemePartial;
exports.createThemeClassName = createThemeClassName;
