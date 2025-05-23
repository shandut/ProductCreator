'use strict';

// NOTE: Order is important here: smallest -> largest
// Exporting as const means it will be typed as a Tuple instead of string[]
var breakpointsAliases = ['xs', 'sm', 'md', 'lg', 'xl'];

// Convert the Tuple to a union

var breakpoints = {
  'breakpoints-xs': {
    value: '0px',
    description: 'Commonly used for sizing containers (e.g. max-width). See below for media query usage.'
  },
  'breakpoints-sm': {
    value: '490px',
    description: 'Commonly used for sizing containers (e.g. max-width). See below for media query usage.'
  },
  'breakpoints-md': {
    value: '768px',
    description: 'Commonly used for sizing containers (e.g. max-width). See below for media query usage.'
  },
  'breakpoints-lg': {
    value: '1040px',
    description: 'Commonly used for sizing containers (e.g. max-width). See below for media query usage.'
  },
  'breakpoints-xl': {
    value: '1440px',
    description: 'Commonly used for sizing containers (e.g. max-width). See below for media query usage.'
  }
};

exports.breakpoints = breakpoints;
exports.breakpointsAliases = breakpointsAliases;
