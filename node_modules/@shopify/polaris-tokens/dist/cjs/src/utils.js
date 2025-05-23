'use strict';

var _rollupPluginBabelHelpers = require('../_virtual/_rollupPluginBabelHelpers.js');

var _templateObject;
var BASE_FONT_SIZE = 16;
var UNIT_PX = 'px';
var UNIT_EM = 'em';
var UNIT_REM = 'rem';

// https://regex101.com/r/zvY2bu/1
var DIGIT_REGEX = new RegExp(String.raw(_templateObject || (_templateObject = _rollupPluginBabelHelpers.taggedTemplateLiteralLoose(["-?d+(?:.d+|d*)"], ["-?\\d+(?:\\.\\d+|\\d*)"]))));
var UNIT_REGEX = new RegExp(UNIT_PX + "|" + UNIT_EM + "|" + UNIT_REM);
function getUnit(value) {
  if (value === void 0) {
    value = '';
  }
  var unit = value.match(new RegExp(DIGIT_REGEX.source + "(" + UNIT_REGEX.source + ")"));
  return unit && unit[1];
}
function toPx(value) {
  if (value === void 0) {
    value = '';
  }
  var unit = getUnit(value);
  if (!unit) return value;
  if (unit === UNIT_PX) {
    return value;
  }
  if (unit === UNIT_EM || unit === UNIT_REM) {
    return "" + parseFloat(value) * BASE_FONT_SIZE + UNIT_PX;
  }
}
function toPxs(value) {
  return value.replace(new RegExp(DIGIT_REGEX.source + "(" + UNIT_EM + "|" + UNIT_REM + ")", 'g'), function (emOrRem) {
    var _toPx;
    return (_toPx = toPx(emOrRem)) != null ? _toPx : emOrRem;
  });
}
function toEm(value, fontSize) {
  if (value === void 0) {
    value = '';
  }
  if (fontSize === void 0) {
    fontSize = BASE_FONT_SIZE;
  }
  var unit = getUnit(value);
  if (!unit) return value;
  if (unit === UNIT_EM) {
    return value;
  }
  if (unit === UNIT_PX) {
    return "" + parseFloat(value) / fontSize + UNIT_EM;
  }
  if (unit === UNIT_REM) {
    return "" + parseFloat(value) * BASE_FONT_SIZE / fontSize + UNIT_EM;
  }
}
function toRem(value) {
  if (value === void 0) {
    value = '';
  }
  var unit = getUnit(value);
  if (!unit) return value;
  if (unit === UNIT_REM) {
    return value;
  }
  if (unit === UNIT_EM) {
    return "" + parseFloat(value) + UNIT_REM;
  }
  if (unit === UNIT_PX) {
    return "" + parseFloat(value) / BASE_FONT_SIZE + UNIT_REM;
  }
}
function rem(value) {
  return value.replace(new RegExp(DIGIT_REGEX.source + "(" + UNIT_PX + ")", 'g'), function (px) {
    var _toRem;
    return (_toRem = toRem(px)) != null ? _toRem : px;
  });
}
function tokenGroupToRems(metaTokenGroup) {
  return Object.fromEntries(Object.entries(metaTokenGroup).map(function (_ref) {
    var _ref2 = _rollupPluginBabelHelpers.slicedToArray(_ref, 2),
      tokenName = _ref2[0],
      tokenProperties = _ref2[1];
    return [tokenName, Object.assign(Object.assign({}, tokenProperties), {}, {
      value: rem(tokenProperties.value)
    })];
  })
  // We loose the `metaTokenGroup` inference after transforming the object with
  // `Object.fromEntries()` and `Object.entries()`. Thus, we cast the result
  // back to `T` since we are simply converting the `value` from px to rem.
  );
}
function createVarName(tokenName) {
  return "--p-" + tokenName;
}
function createVar(tokenName) {
  return "var(" + createVarName(tokenName) + ")";
}
function getTokenNames(theme) {
  return Object.values(theme).flatMap(function (tokenGroup) {
    return Object.keys(tokenGroup);
  });
}

/**
 * Allowed Polaris token custom properties.
 *
 * Result: ['--p-color-bg', '--p-color-text', etc...]
 */
function getThemeVarNames(theme) {
  return getTokenNames(theme).map(createVarName);
}

/**
 * Alias direction used for composing Polaris `breakpoints` utilities.
 */

/**
 * A collection of directional media conditions for a given Polaris `breakpoints` alias.
 */

/**
 * Media conditions for all Polaris `breakpoints` aliases.
 */

function getMediaConditions(breakpoints) {
  var breakpointEntries = Object.entries(breakpoints);
  var lastBreakpointIndex = breakpointEntries.length - 1;
  return Object.fromEntries(breakpointEntries.map(function (entry, index) {
    var _ref3 = entry,
      _ref4 = _rollupPluginBabelHelpers.slicedToArray(_ref3, 2),
      breakpointsTokenName = _ref4[0],
      breakpoint = _ref4[1];
    var upMediaCondition = getUpMediaCondition(breakpoint);
    var downMediaCondition = getDownMediaCondition(breakpoint);
    var onlyMediaCondition = index === lastBreakpointIndex ? upMediaCondition : upMediaCondition + " and " + getDownMediaCondition(breakpointEntries[index + 1][1]);
    return [breakpointsTokenName, {
      // Media condition for the current breakpoint and up
      up: upMediaCondition,
      // Media condition for current breakpoint and down
      down: downMediaCondition,
      // Media condition for only the current breakpoint
      only: onlyMediaCondition
    }];
  }));
}
function getUpMediaCondition(breakpoint) {
  return "(min-width: " + toEm(breakpoint) + ")";
}

/**
 * Down media condition breakpoints are being subtracted by 0.04px to prevent
 * them from overwriting up media queries. We experimented with multiple offsets
 * and felt that 0.04px would be the safest across different pixel densities,
 * while being representable in ems with 4 decimal places of precision.
 */
function getDownMediaCondition(breakpoint) {
  var _toPx2;
  var offsetBreakpoint = parseFloat((_toPx2 = toPx(breakpoint)) != null ? _toPx2 : '') - 0.04;
  return "(max-width: " + toEm(offsetBreakpoint + "px") + ")";
}
var tokenGroupNamesToRems = ['border', 'breakpoints', 'font', 'height', 'shadow', 'space', 'text', 'width'];

/**
 * Mimics the behavior of an identity function:
 * - Validates the input matches the `MetaThemeShape` type exactly
 * - Converts all `px` values to `rem`
 * - Infers all members
 *
 * @example
 * ```
 * const example = createMetaThemeBase({
 *   color: {
 *     bg: {value: '#fff'},
 *   },
 * })
 * ```
 *
 * Where `typeof example` is inferred as `{ color: { bg: { value: string } } }`
 */
function createMetaThemeBase(metaTheme) {
  return Object.fromEntries(Object.entries(metaTheme).map(function (_ref5) {
    var _ref6 = _rollupPluginBabelHelpers.slicedToArray(_ref5, 2),
      tokenGroupName = _ref6[0],
      tokenGroup = _ref6[1];
    return [tokenGroupName, tokenGroupNamesToRems.includes(tokenGroupName) ? tokenGroupToRems(tokenGroup) : tokenGroup];
  }));
}

exports.createMetaThemeBase = createMetaThemeBase;
exports.createVar = createVar;
exports.createVarName = createVarName;
exports.getMediaConditions = getMediaConditions;
exports.getThemeVarNames = getThemeVarNames;
exports.getTokenNames = getTokenNames;
exports.getUnit = getUnit;
exports.rem = rem;
exports.toEm = toEm;
exports.toPx = toPx;
exports.toPxs = toPxs;
exports.toRem = toRem;
exports.tokenGroupNamesToRems = tokenGroupNamesToRems;
exports.tokenGroupToRems = tokenGroupToRems;
