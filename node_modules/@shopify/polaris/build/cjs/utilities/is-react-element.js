'use strict';

var React = require('react');

function isReactElement(x) {
  return /*#__PURE__*/React.isValidElement(x) && x !== undefined;
}

exports.isReactElement = isReactElement;
