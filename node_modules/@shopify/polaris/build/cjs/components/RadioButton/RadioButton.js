'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var RadioButton_module = require('./RadioButton.css.js');
var Choice = require('../Choice/Choice.js');

function RadioButton({
  ariaDescribedBy: ariaDescribedByProp,
  label,
  labelHidden,
  helpText,
  checked,
  disabled,
  onChange,
  onFocus,
  onBlur,
  id: idProp,
  name: nameProp,
  value,
  fill,
  bleed,
  bleedBlockStart,
  bleedBlockEnd,
  bleedInlineStart,
  bleedInlineEnd,
  tone
}) {
  const uniqId = React.useId();
  const id = idProp ?? uniqId;
  const name = nameProp || id;
  const inputNode = React.useRef(null);
  const handleBlur = () => {
    onBlur && onBlur();
  };
  function handleChange({
    currentTarget
  }) {
    onChange && onChange(currentTarget.checked, id);
  }
  const describedBy = [];
  if (helpText) {
    describedBy.push(Choice.helpTextID(id));
  }
  if (ariaDescribedByProp) {
    describedBy.push(ariaDescribedByProp);
  }
  const ariaDescribedBy = describedBy.length ? describedBy.join(' ') : undefined;
  const inputClassName = css.classNames(RadioButton_module.default.Input, tone && RadioButton_module.default[css.variationName('tone', tone)]);
  const extraChoiceProps = {
    helpText,
    bleed,
    bleedBlockStart,
    bleedBlockEnd,
    bleedInlineStart,
    bleedInlineEnd
  };
  return /*#__PURE__*/React.createElement(Choice.Choice, Object.assign({
    label: label,
    labelHidden: labelHidden,
    disabled: disabled,
    id: id,
    labelClassName: RadioButton_module.default.ChoiceLabel,
    fill: fill
  }, extraChoiceProps, checked ? {
    tone
  } : {}), /*#__PURE__*/React.createElement("span", {
    className: RadioButton_module.default.RadioButton
  }, /*#__PURE__*/React.createElement("input", {
    id: id,
    name: name,
    value: value,
    type: "radio",
    checked: checked,
    disabled: disabled,
    className: inputClassName,
    onChange: handleChange,
    onFocus: onFocus,
    onBlur: handleBlur,
    "aria-describedby": ariaDescribedBy,
    ref: inputNode
  }), /*#__PURE__*/React.createElement("span", {
    className: RadioButton_module.default.Backdrop
  })));
}

exports.RadioButton = RadioButton;
