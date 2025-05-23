'use strict';

var React = require('react');
var index = require('./utils/index.js');

const DropZoneContext = /*#__PURE__*/React.createContext({
  disabled: false,
  focused: false,
  size: 'extraLarge',
  type: 'file',
  measuring: false,
  allowMultiple: index.defaultAllowMultiple
});

exports.DropZoneContext = DropZoneContext;
