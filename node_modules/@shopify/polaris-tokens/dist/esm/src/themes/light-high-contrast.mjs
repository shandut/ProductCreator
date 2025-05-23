import { gray } from '../colors.mjs';
import { createMetaThemePartial, createMetaTheme } from './utils.mjs';

var metaThemeLightHighContrastPartial = createMetaThemePartial({
  color: {
    'color-text': {
      value: gray[16]
    },
    'color-text-secondary': {
      value: gray[16]
    },
    'color-text-brand': {
      value: gray[16]
    },
    'color-icon-secondary': {
      value: gray[14]
    },
    'color-border': {
      value: gray[12]
    },
    'color-input-border': {
      value: gray[14]
    },
    'color-border-secondary': {
      value: gray[12]
    },
    'color-bg-surface-secondary': {
      value: gray[6]
    }
  },
  shadow: {
    'shadow-bevel-100': {
      value: '0px 1px 0px 0px rgba(26, 26, 26, 0.07), 0px 1px 0px 0px rgba(208, 208, 208, 0.40) inset, 1px 0px 0px 0px #CCC inset, -1px 0px 0px 0px #CCC inset, 0px -1px 0px 0px #999 inset'
    }
  }
});
var metaThemeLightHighContrast = createMetaTheme(metaThemeLightHighContrastPartial);

export { metaThemeLightHighContrast, metaThemeLightHighContrastPartial };
