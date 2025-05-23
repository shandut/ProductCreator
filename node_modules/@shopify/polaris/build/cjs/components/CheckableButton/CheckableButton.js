'use strict';

var React = require('react');
var CheckableButton_module = require('./CheckableButton.css.js');
var Checkbox = require('../Checkbox/Checkbox.js');
var Text = require('../Text/Text.js');

const CheckableButton = /*#__PURE__*/React.forwardRef(function CheckableButton({
  accessibilityLabel,
  label = '',
  onToggleAll,
  selected,
  disabled,
  ariaLive
}, ref) {
  const checkBoxRef = React.useRef(null);
  function focus() {
    checkBoxRef?.current?.focus();
  }
  React.useImperativeHandle(ref, () => {
    return {
      focus
    };
  });
  return /*#__PURE__*/React.createElement("div", {
    className: CheckableButton_module.default.CheckableButton,
    onClick: onToggleAll
  }, /*#__PURE__*/React.createElement("div", {
    className: CheckableButton_module.default.Checkbox
  }, /*#__PURE__*/React.createElement(Checkbox.Checkbox, {
    label: accessibilityLabel,
    labelHidden: true,
    checked: selected,
    disabled: disabled,
    onChange: onToggleAll,
    ref: checkBoxRef
  })), label ? /*#__PURE__*/React.createElement("span", {
    className: CheckableButton_module.default.Label,
    "aria-live": ariaLive
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "bodySm",
    fontWeight: "medium"
  }, label)) : null);
});

exports.CheckableButton = CheckableButton;
