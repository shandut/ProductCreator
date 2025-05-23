'use strict';

var React = require('react');
var polarisTokens = require('@shopify/polaris-tokens');
var useTheme = require('../../utilities/use-theme.js');
var css = require('../../utilities/css.js');
var ThemeProvider_module = require('./ThemeProvider.css.js');

/**
 * Allowlist of local themes
 * TODO: Replace `as const` with `satisfies ThemeName[]`
 */
const themeNamesLocal = ['light', 'dark-experimental'];
const isThemeNameLocal = name => themeNamesLocal.includes(name);
function ThemeProvider(props) {
  const {
    as: ThemeContainer = 'div',
    children,
    className,
    theme: themeName = polarisTokens.themeNameDefault
  } = props;
  return /*#__PURE__*/React.createElement(useTheme.ThemeNameContext.Provider, {
    value: themeName
  }, /*#__PURE__*/React.createElement(useTheme.ThemeContext.Provider, {
    value: useTheme.getTheme(themeName)
  }, /*#__PURE__*/React.createElement(ThemeContainer, {
    "data-portal-id": props['data-portal-id'],
    className: css.classNames(polarisTokens.createThemeClassName(themeName), ThemeProvider_module.default.themeContainer, className)
  }, children)));
}

exports.ThemeProvider = ThemeProvider;
exports.isThemeNameLocal = isThemeNameLocal;
exports.themeNamesLocal = themeNamesLocal;
