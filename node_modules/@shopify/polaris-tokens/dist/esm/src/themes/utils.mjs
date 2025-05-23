import { slicedToArray as _slicedToArray } from '../../_virtual/_rollupPluginBabelHelpers.mjs';
import deepmerge from 'deepmerge';
import { getTokenNames, tokenGroupNamesToRems, tokenGroupToRems } from '../utils.mjs';
import { metaThemeBase } from './base/index.mjs';

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
    var _ref2 = _slicedToArray(_ref, 2),
      tokenGroupName = _ref2[0],
      tokenGroup = _ref2[1];
    return [tokenGroupName, tokenGroup && tokenGroupNamesToRems.includes(tokenGroupName) ? tokenGroupToRems(tokenGroup) : tokenGroup];
  }));
}
function createMetaTheme(metaThemePartial) {
  return deepmerge(metaThemeBase, metaThemePartial);
}
function createThemeClassName(themeName) {
  return "p-theme-" + themeName;
}
function createIsTokenName(theme) {
  var tokenNames = new Set(getTokenNames(theme));
  return function (tokenName) {
    return tokenNames.has(tokenName);
  };
}

export { createIsTokenName, createMetaTheme, createMetaThemePartial, createThemeClassName };
