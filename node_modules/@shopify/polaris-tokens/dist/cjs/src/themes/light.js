'use strict';

var utils = require('./utils.js');

var metaThemeLightPartial = utils.createMetaThemePartial({});
var metaThemeLight = utils.createMetaTheme(metaThemeLightPartial);

exports.metaThemeLight = metaThemeLight;
exports.metaThemeLightPartial = metaThemeLightPartial;
