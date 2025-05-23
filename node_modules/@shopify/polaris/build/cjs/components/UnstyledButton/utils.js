'use strict';

var React = require('react');
var UnstyledButton = require('./UnstyledButton.js');

function unstyledButtonFrom({
  content,
  onAction,
  ...action
}, overrides, key) {
  return /*#__PURE__*/React.createElement(UnstyledButton.UnstyledButton, Object.assign({
    key: key,
    onClick: onAction
  }, action, overrides), content);
}

exports.unstyledButtonFrom = unstyledButtonFrom;
