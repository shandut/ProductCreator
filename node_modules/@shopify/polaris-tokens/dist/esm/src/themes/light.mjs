import { createMetaThemePartial, createMetaTheme } from './utils.mjs';

var metaThemeLightPartial = createMetaThemePartial({});
var metaThemeLight = createMetaTheme(metaThemeLightPartial);

export { metaThemeLight, metaThemeLightPartial };
