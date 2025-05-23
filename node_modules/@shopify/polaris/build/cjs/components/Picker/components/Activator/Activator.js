'use strict';

var polarisIcons = require('@shopify/polaris-icons');
var React = require('react');
var css = require('../../../../utilities/css.js');
var Activator_module = require('./Activator.css.js');
var BlockStack = require('../../../BlockStack/BlockStack.js');
var Text = require('../../../Text/Text.js');
var Icon = require('../../../Icon/Icon.js');

const Activator = /*#__PURE__*/React.forwardRef(({
  disabled,
  label,
  placeholder,
  selected,
  onClick
}, ref) => {
  return /*#__PURE__*/React.createElement("button", {
    ref: ref,
    disabled: disabled,
    onClick: onClick,
    className: css.classNames(Activator_module.default.Activator, disabled && Activator_module.default.disabled),
    type: "button"
  }, /*#__PURE__*/React.createElement(BlockStack.BlockStack, {
    as: "span",
    gap: "100"
  }, label && /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "bodySm",
    alignment: "start",
    tone: "subdued"
  }, label), (selected !== '' || placeholder) && /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "bodyMd",
    alignment: "start",
    tone: selected ? undefined : 'subdued'
  }, selected || placeholder)), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon.Icon, {
    tone: "subdued",
    source: polarisIcons.SelectIcon
  })));
});
Activator.displayName = 'Activator';

exports.Activator = Activator;
