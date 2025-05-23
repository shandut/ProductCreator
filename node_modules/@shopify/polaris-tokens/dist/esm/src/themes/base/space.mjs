import { size } from '../../size.mjs';
import { createVarName } from '../../utils.mjs';

var space = {
  'space-0': {
    value: size[0]
  },
  'space-025': {
    value: size['025']
  },
  'space-050': {
    value: size['050']
  },
  'space-100': {
    value: size[100]
  },
  'space-150': {
    value: size[150]
  },
  'space-200': {
    value: size[200]
  },
  'space-300': {
    value: size[300]
  },
  'space-400': {
    value: size[400]
  },
  'space-500': {
    value: size[500]
  },
  'space-600': {
    value: size[600]
  },
  'space-800': {
    value: size[800]
  },
  'space-1000': {
    value: size[1000]
  },
  'space-1200': {
    value: size[1200]
  },
  'space-1600': {
    value: size[1600]
  },
  'space-2000': {
    value: size[2000]
  },
  'space-2400': {
    value: size[2400]
  },
  'space-2800': {
    value: size[2800]
  },
  'space-3200': {
    value: size[3200]
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
  return "var(" + createVarName(spaceTokenName) + ")";
}

export { space };
