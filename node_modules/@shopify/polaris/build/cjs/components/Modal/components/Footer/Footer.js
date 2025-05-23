'use strict';

var React = require('react');
var utils = require('../../../Button/utils.js');
var InlineStack = require('../../../InlineStack/InlineStack.js');
var Box = require('../../../Box/Box.js');

function Footer({
  primaryAction,
  secondaryActions,
  children
}) {
  const primaryActionButton = primaryAction && utils.buttonsFrom(primaryAction, {
    variant: 'primary'
  }) || null;
  const secondaryActionButtons = secondaryActions && utils.buttonsFrom(secondaryActions) || null;
  const actions = primaryActionButton || secondaryActionButtons ? /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    gap: "200"
  }, secondaryActionButtons, primaryActionButton) : null;
  return /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    gap: "400",
    blockAlign: "center"
  }, /*#__PURE__*/React.createElement(Box.Box, {
    borderColor: "border",
    borderBlockStartWidth: "025",
    padding: "400",
    width: "100%"
  }, /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    gap: "400",
    blockAlign: "center",
    align: "space-between"
  }, /*#__PURE__*/React.createElement(Box.Box, null, children), actions)));
}

exports.Footer = Footer;
