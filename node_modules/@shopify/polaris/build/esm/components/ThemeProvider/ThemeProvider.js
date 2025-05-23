import React from 'react';
import { createThemeClassName, themeNameDefault } from '@shopify/polaris-tokens';
import { ThemeNameContext, ThemeContext, getTheme } from '../../utilities/use-theme.js';
import { classNames } from '../../utilities/css.js';
import styles from './ThemeProvider.css.js';

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
    theme: themeName = themeNameDefault
  } = props;
  return /*#__PURE__*/React.createElement(ThemeNameContext.Provider, {
    value: themeName
  }, /*#__PURE__*/React.createElement(ThemeContext.Provider, {
    value: getTheme(themeName)
  }, /*#__PURE__*/React.createElement(ThemeContainer, {
    "data-portal-id": props['data-portal-id'],
    className: classNames(createThemeClassName(themeName), styles.themeContainer, className)
  }, children)));
}

export { ThemeProvider, isThemeNameLocal, themeNamesLocal };
