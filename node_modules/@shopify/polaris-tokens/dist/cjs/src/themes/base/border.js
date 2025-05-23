'use strict';

var size = require('../../size.js');

var border = {
  'border-radius-0': {
    value: size.size[0]
  },
  'border-radius-050': {
    value: size.size['050']
  },
  'border-radius-100': {
    value: size.size[100]
  },
  'border-radius-150': {
    value: size.size[150]
  },
  'border-radius-200': {
    value: size.size[200]
  },
  'border-radius-300': {
    value: size.size[300]
  },
  'border-radius-400': {
    value: size.size[400]
  },
  'border-radius-500': {
    value: size.size[500]
  },
  'border-radius-750': {
    value: size.size[750]
  },
  'border-radius-full': {
    value: '9999px'
  },
  'border-width-0': {
    value: size.size['0']
  },
  'border-width-0165': {
    value: size.size['0165']
  },
  'border-width-025': {
    value: size.size['025']
  },
  'border-width-050': {
    value: size.size['050']
  },
  'border-width-100': {
    value: size.size[100]
  }
};

exports.border = border;
