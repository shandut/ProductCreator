import { gray, whiteAlpha } from '../colors.mjs';
import { createMetaThemePartial, createMetaTheme } from './utils.mjs';

var metaThemeDarkPartial = createMetaThemePartial({
  color: {
    'color-scheme': {
      value: 'dark'
    },
    'color-bg': {
      value: gray[16]
    },
    'color-bg-surface': {
      value: gray[15]
    },
    'color-bg-fill': {
      value: gray[15]
    },
    'color-icon': {
      value: gray[8]
    },
    'color-icon-secondary': {
      value: gray[11]
    },
    'color-icon-disabled': {
      value: gray[14]
    },
    'color-text': {
      value: gray[8]
    },
    'color-text-secondary': {
      value: gray[11]
    },
    'color-text-disabled': {
      value: gray[14]
    },
    'color-bg-surface-secondary-active': {
      value: whiteAlpha[9]
    },
    'color-bg-surface-secondary-hover': {
      value: whiteAlpha[6]
    },
    'color-bg-fill-transparent': {
      value: whiteAlpha[8]
    },
    'color-bg-fill-brand': {
      value: gray[1]
    },
    'color-text-brand-on-bg-fill': {
      value: gray[15]
    },
    'color-bg-surface-hover': {
      value: gray[14]
    },
    'color-bg-fill-hover': {
      value: whiteAlpha[5]
    },
    'color-bg-fill-transparent-hover': {
      value: whiteAlpha[9]
    },
    'color-bg-fill-brand-hover': {
      value: gray[5]
    },
    'color-bg-surface-selected': {
      value: gray[13]
    },
    'color-bg-fill-selected': {
      value: gray[13]
    },
    'color-bg-fill-transparent-selected': {
      value: whiteAlpha[11]
    },
    'color-bg-fill-brand-selected': {
      value: gray[9]
    },
    'color-bg-surface-active': {
      value: gray[13]
    },
    'color-bg-fill-active': {
      value: gray[13]
    },
    'color-bg-fill-transparent-active': {
      value: whiteAlpha[10]
    },
    'color-bg-fill-brand-active': {
      value: gray[4]
    },
    'color-bg-fill-secondary': {
      value: whiteAlpha[7]
    },
    'color-bg-fill-secondary-hover': {
      value: whiteAlpha[8]
    },
    'color-bg-fill-secondary-selected': {
      value: whiteAlpha[10]
    },
    'color-bg-surface-brand-selected': {
      value: gray[14]
    },
    'color-border-secondary': {
      value: gray[14]
    },
    'color-bg-surface-tertiary': {
      value: whiteAlpha[7]
    },
    'color-icon-brand': {
      value: gray[14]
    },
    'color-bg-fill-disabled': {
      value: whiteAlpha[5]
    },
    'color-text-brand-on-bg-fill-disabled': {
      value: gray[12]
    },
    'color-bg-fill-brand-disabled': {
      value: whiteAlpha[11]
    },
    'color-bg-fill-tertiary': {
      value: gray[15]
    },
    'color-tooltip-tail-down-border': {
      value: 'rgba(60, 60, 60, 1)'
    },
    'color-tooltip-tail-up-border': {
      value: 'rgba(71, 71, 71, 1)'
    }
  },
  shadow: {
    'shadow-bevel-100': {
      value: '1px 0px 0px 0px rgba(204, 204, 204, 0.08) inset, -1px 0px 0px 0px rgba(204, 204, 204, 0.08) inset, 0px -1px 0px 0px rgba(204, 204, 204, 0.08) inset, 0px 1px 0px 0px rgba(204, 204, 204, 0.16) inset'
    }
  }
});
var metaThemeDark = createMetaTheme(metaThemeDarkPartial);

export { metaThemeDark, metaThemeDarkPartial };
