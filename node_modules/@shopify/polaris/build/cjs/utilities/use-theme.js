'use strict';

var React = require('react');
var polarisTokens = require('@shopify/polaris-tokens');

const ThemeContext = /*#__PURE__*/React.createContext(null);
const ThemeNameContext = /*#__PURE__*/React.createContext(null);
function getTheme(themeName) {
  return polarisTokens.themes[themeName];
}
function useTheme() {
  const theme = React.useContext(ThemeContext);
  if (!theme) {
    throw new Error('No theme was provided. Your application must be wrapped in an <AppProvider> or <ThemeProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.');
  }
  return theme;
}
function useThemeName() {
  const themeName = React.useContext(ThemeNameContext);
  if (!themeName) {
    throw new Error('No themeName was provided. Your application must be wrapped in an <AppProvider> or <ThemeProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.');
  }
  return themeName;
}
function UseTheme(props) {
  const theme = useTheme();
  return props.children(theme);
}

exports.ThemeContext = ThemeContext;
exports.ThemeNameContext = ThemeNameContext;
exports.UseTheme = UseTheme;
exports.getTheme = getTheme;
exports.useTheme = useTheme;
exports.useThemeName = useThemeName;
