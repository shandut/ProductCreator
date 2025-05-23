'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../../../utilities/css.js');
var context = require('../../../../utilities/combobox/context.js');
var context$1 = require('../../../../utilities/listbox/context.js');
var TextOption_module = require('./TextOption.css.js');
var Checkbox = require('../../../Checkbox/Checkbox.js');
var Box = require('../../../Box/Box.js');
var InlineStack = require('../../../InlineStack/InlineStack.js');
var Icon = require('../../../Icon/Icon.js');

const TextOption = /*#__PURE__*/React.memo(function TextOption({
  children,
  selected,
  disabled
}) {
  const {
    allowMultiple
  } = React.useContext(context.ComboboxListboxOptionContext);
  const isAction = React.useContext(context$1.ActionContext);
  const textOptionClassName = css.classNames(TextOption_module.default.TextOption, selected && !allowMultiple && TextOption_module.default.selected, disabled && TextOption_module.default.disabled, allowMultiple && TextOption_module.default.allowMultiple, isAction && TextOption_module.default.isAction);
  const optionMarkup = selected ? /*#__PURE__*/React.createElement(Box.Box, {
    width: "100%"
  }, /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    wrap: false,
    align: "space-between",
    gap: "200"
  }, children, /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    align: "end"
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.CheckIcon
  })))) : /*#__PURE__*/React.createElement(React.Fragment, null, children);
  return /*#__PURE__*/React.createElement("div", {
    className: textOptionClassName
  }, /*#__PURE__*/React.createElement("div", {
    className: TextOption_module.default.Content
  }, allowMultiple && !isAction ? /*#__PURE__*/React.createElement("div", {
    className: TextOption_module.default.Checkbox
  }, /*#__PURE__*/React.createElement(Checkbox.Checkbox, {
    disabled: disabled,
    checked: selected,
    label: children
  })) : optionMarkup));
});

exports.TextOption = TextOption;
