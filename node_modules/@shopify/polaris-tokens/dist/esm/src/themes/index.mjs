import { createMetaTheme } from './utils.mjs';
import { themeNameDefault } from './constants.mjs';
import { metaThemeLight, metaThemeLightPartial } from './light.mjs';
import { metaThemeLightHighContrast, metaThemeLightHighContrastPartial } from './light-high-contrast.mjs';
import { metaThemeLightMobile, metaThemeLightMobilePartial } from './light-mobile.mjs';
import { metaThemeDark, metaThemeDarkPartial } from './dark.mjs';

var metaThemes = {
  light: metaThemeLight,
  'light-mobile': metaThemeLightMobile,
  'light-high-contrast-experimental': metaThemeLightHighContrast,
  'dark-experimental': metaThemeDark
};
var metaThemePartials = {
  light: metaThemeLightPartial,
  'light-mobile': metaThemeLightMobilePartial,
  'light-high-contrast-experimental': metaThemeLightHighContrastPartial,
  'dark-experimental': metaThemeDarkPartial
};
var metaThemeDefaultPartial = metaThemePartials[themeNameDefault];
var metaThemeDefault = createMetaTheme(metaThemeDefaultPartial);

export { createMetaTheme, metaThemeDefault, metaThemeDefaultPartial, metaThemePartials, metaThemes };
