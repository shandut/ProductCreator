'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var InlineError_module = require('./InlineError.css.js');
var Icon = require('../Icon/Icon.js');
var Text = require('../Text/Text.js');

function InlineError({
  message,
  fieldID
}) {
  if (!message) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", {
    id: errorTextID(fieldID),
    className: InlineError_module.default.InlineError
  }, /*#__PURE__*/React.createElement("div", {
    className: InlineError_module.default.Icon
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.AlertCircleIcon
  })), /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "bodyMd"
  }, message));
}
function errorTextID(id) {
  return `${id}Error`;
}

exports.InlineError = InlineError;
exports.errorTextID = errorTextID;
