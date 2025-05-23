'use strict';

var utils$1 = require('../utils.js');
var utils = require('./utils.js');

var buttonShadow = "0 0 0 " + utils$1.createVar('border-width-025') + " " + utils$1.createVar('color-border') + " inset";
var metaThemeLightMobilePartial = utils.createMetaThemePartial({
  color: {
    'color-button-gradient-bg-fill': {
      value: 'none'
    }
  },
  shadow: {
    'shadow-100': {
      value: 'none'
    },
    'shadow-bevel-100': {
      value: 'none'
    },
    'shadow-button': {
      value: buttonShadow
    },
    'shadow-button-hover': {
      value: buttonShadow
    },
    'shadow-button-inset': {
      value: buttonShadow
    },
    'shadow-button-primary': {
      value: 'none'
    },
    'shadow-button-primary-hover': {
      value: 'none'
    },
    'shadow-button-primary-inset': {
      value: 'none'
    },
    'shadow-button-primary-critical': {
      value: 'none'
    },
    'shadow-button-primary-critical-hover': {
      value: 'none'
    },
    'shadow-button-primary-critical-inset': {
      value: 'none'
    },
    'shadow-button-primary-success': {
      value: 'none'
    },
    'shadow-button-primary-success-hover': {
      value: 'none'
    },
    'shadow-button-primary-success-inset': {
      value: 'none'
    }
  },
  space: {
    'space-card-gap': {
      value: utils$1.createVar('space-200')
    }
  },
  text: {
    // heading-2xl
    'text-heading-2xl-font-size': {
      value: utils$1.createVar('font-size-800')
    },
    // heading-xl
    'text-heading-xl-font-size': {
      value: utils$1.createVar('font-size-550')
    },
    'text-heading-xl-font-line-height': {
      value: utils$1.createVar('font-line-height-700')
    },
    // heading-lg
    'text-heading-lg-font-size': {
      value: utils$1.createVar('font-size-450')
    },
    // heading-md
    'text-heading-md-font-size': {
      value: utils$1.createVar('font-size-400')
    },
    // heading-sm
    'text-heading-sm-font-size': {
      value: utils$1.createVar('font-size-350')
    },
    // body-lg
    'text-body-lg-font-size': {
      value: utils$1.createVar('font-size-450')
    },
    'text-body-lg-font-line-height': {
      value: utils$1.createVar('font-line-height-700')
    },
    // body-md
    'text-body-md-font-size': {
      value: utils$1.createVar('font-size-400')
    },
    'text-body-md-font-line-height': {
      value: utils$1.createVar('font-line-height-600')
    },
    // body-sm
    'text-body-sm-font-size': {
      value: utils$1.createVar('font-size-350')
    },
    'text-body-sm-font-line-height': {
      value: utils$1.createVar('font-line-height-500')
    },
    // body-xs
    'text-body-xs-font-size': {
      value: utils$1.createVar('font-size-300')
    },
    'text-body-xs-font-line-height': {
      value: utils$1.createVar('font-line-height-400')
    }
  }
});
var metaThemeLightMobile = utils.createMetaTheme(metaThemeLightMobilePartial);

exports.metaThemeLightMobile = metaThemeLightMobile;
exports.metaThemeLightMobilePartial = metaThemeLightMobilePartial;
