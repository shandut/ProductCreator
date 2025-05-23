'use strict';

var size = require('../../size.js');
var utils = require('../../utils.js');

var space = {
  'space-0': {
    value: size.size[0]
  },
  'space-025': {
    value: size.size['025']
  },
  'space-050': {
    value: size.size['050']
  },
  'space-100': {
    value: size.size[100]
  },
  'space-150': {
    value: size.size[150]
  },
  'space-200': {
    value: size.size[200]
  },
  'space-300': {
    value: size.size[300]
  },
  'space-400': {
    value: size.size[400]
  },
  'space-500': {
    value: size.size[500]
  },
  'space-600': {
    value: size.size[600]
  },
  'space-800': {
    value: size.size[800]
  },
  'space-1000': {
    value: size.size[1000]
  },
  'space-1200': {
    value: size.size[1200]
  },
  'space-1600': {
    value: size.size[1600]
  },
  'space-2000': {
    value: size.size[2000]
  },
  'space-2400': {
    value: size.size[2400]
  },
  'space-2800': {
    value: size.size[2800]
  },
  'space-3200': {
    value: size.size[3200]
  },
  'space-button-group-gap': {
    value: createVar('space-200')
  },
  'space-card-gap': {
    value: createVar('space-400')
  },
  'space-card-padding': {
    value: createVar('space-400')
  },
  'space-table-cell-padding': {
    value: createVar('space-150')
  }
};
function createVar(spaceTokenName) {
  return "var(" + utils.createVarName(spaceTokenName) + ")";
}

exports.space = space;
