'use strict';

var React = require('react');
var LegacyCard_module = require('../../LegacyCard.css.js');
var utils = require('../../../Button/utils.js');
var ButtonGroup = require('../../../ButtonGroup/ButtonGroup.js');
var InlineStack = require('../../../InlineStack/InlineStack.js');
var Text = require('../../../Text/Text.js');

function Header({
  children,
  title,
  actions
}) {
  const actionMarkup = actions ? /*#__PURE__*/React.createElement(ButtonGroup.ButtonGroup, null, utils.buttonsFrom(actions, {
    variant: 'plain'
  })) : null;
  const titleMarkup = /*#__PURE__*/React.isValidElement(title) ? title : /*#__PURE__*/React.createElement(Text.Text, {
    variant: "headingSm",
    as: "h2"
  }, title);
  const headingMarkup = actionMarkup || children ? /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    wrap: false,
    gap: "200",
    align: "space-between",
    blockAlign: "center"
  }, titleMarkup, /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    wrap: false,
    gap: "400",
    blockAlign: "center"
  }, actionMarkup, children)) : titleMarkup;
  return /*#__PURE__*/React.createElement("div", {
    className: LegacyCard_module.default.Header
  }, headingMarkup);
}

exports.Header = Header;
