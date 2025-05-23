import { useContext, createContext } from 'react';
import { themes } from '@shopify/polaris-tokens';

const ThemeContext = /*#__PURE__*/createContext(null);
const ThemeNameContext = /*#__PURE__*/createContext(null);
function getTheme(themeName) {
  return themes[themeName];
}
function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('No theme was provided. Your application must be wrapped in an <AppProvider> or <ThemeProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.');
  }
  return theme;
}
function useThemeName() {
  const themeName = useContext(ThemeNameContext);
  if (!themeName) {
    throw new Error('No themeName was provided. Your application must be wrapped in an <AppProvider> or <ThemeProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.');
  }
  return themeName;
}
function UseTheme(props) {
  const theme = useTheme();
  return props.children(theme);
}

export { ThemeContext, ThemeNameContext, UseTheme, getTheme, useTheme, useThemeName };
