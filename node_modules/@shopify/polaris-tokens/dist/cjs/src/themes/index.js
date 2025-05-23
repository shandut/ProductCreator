'use strict';

var utils = require('./utils.js');
var constants = require('./constants.js');
var light = require('./light.js');
var lightHighContrast = require('./light-high-contrast.js');
var lightMobile = require('./light-mobile.js');
var dark = require('./dark.js');

var metaThemes = {
  light: light.metaThemeLight,
  'light-mobile': lightMobile.metaThemeLightMobile,
  'light-high-contrast-experimental': lightHighContrast.metaThemeLightHighContrast,
  'dark-experimental': dark.metaThemeDark
};
var metaThemePartials = {
  light: light.metaThemeLightPartial,
  'light-mobile': lightMobile.metaThemeLightMobilePartial,
  'light-high-contrast-experimental': lightHighContrast.metaThemeLightHighContrastPartial,
  'dark-experimental': dark.metaThemeDarkPartial
};
var metaThemeDefaultPartial = metaThemePartials[constants.themeNameDefault];
var metaThemeDefault = utils.createMetaTheme(metaThemeDefaultPartial);

exports.createMetaTheme = utils.createMetaTheme;
exports.metaThemeDefault = metaThemeDefault;
exports.metaThemeDefaultPartial = metaThemeDefaultPartial;
exports.metaThemePartials = metaThemePartials;
exports.metaThemes = metaThemes;
