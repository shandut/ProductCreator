'use strict';

var React = require('react');

function isInterface(x) {
  return ! /*#__PURE__*/React.isValidElement(x) && x !== undefined;
}

exports.isInterface = isInterface;
