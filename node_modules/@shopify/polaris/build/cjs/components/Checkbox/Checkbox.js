'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../utilities/css.js');
var context = require('../../utilities/listbox/context.js');
var Checkbox_module = require('./Checkbox.css.js');
var Choice = require('../Choice/Choice.js');
var InlineError = require('../InlineError/InlineError.js');
var Icon = require('../Icon/Icon.js');

const Checkbox = /*#__PURE__*/React.forwardRef(function Checkbox({
  ariaControls,
  ariaDescribedBy: ariaDescribedByProp,
  label,
  labelHidden,
  checked = false,
  helpText,
  disabled,
  id: idProp,
  name,
  value,
  error,
  onChange,
  onFocus,
  onBlur,
  labelClassName,
  fill,
  bleed,
  bleedBlockStart,
  bleedBlockEnd,
  bleedInlineStart,
  bleedInlineEnd,
  tone
}, ref) {
  const inputNode = React.useRef(null);
  const uniqId = React.useId();
  const id = idProp ?? uniqId;
  const isWithinListbox = React.useContext(context.WithinListboxContext);
  React.useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputNode.current) {
        inputNode.current.focus();
      }
    }
  }));
  const handleBlur = () => {
    onBlur && onBlur();
  };
  const handleOnClick = () => {
    if (onChange == null || inputNode.current == null || disabled) {
      return;
    }
    onChange(inputNode.current.checked, id);
    inputNode.current.focus();
  };
  const describedBy = [];
  if (error && typeof error !== 'boolean') {
    describedBy.push(InlineError.errorTextID(id));
  }
  if (helpText) {
    describedBy.push(Choice.helpTextID(id));
  }
  if (ariaDescribedByProp) {
    describedBy.push(ariaDescribedByProp);
  }
  const ariaDescribedBy = describedBy.length ? describedBy.join(' ') : undefined;
  const wrapperClassName = css.classNames(Checkbox_module.default.Checkbox, error && Checkbox_module.default.error);
  const isIndeterminate = checked === 'indeterminate';
  const isChecked = !isIndeterminate && Boolean(checked);
  const indeterminateAttributes = isIndeterminate ? {
    indeterminate: 'true',
    'aria-checked': 'mixed'
  } : {
    'aria-checked': isChecked
  };
  const iconSource = /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 16 16",
    shapeRendering: "geometricPrecision",
    textRendering: "geometricPrecision"
  }, /*#__PURE__*/React.createElement("path", {
    className: css.classNames(checked && Checkbox_module.default.checked),
    d: "M1.5,5.5L3.44655,8.22517C3.72862,8.62007,4.30578,8.64717,4.62362,8.28044L10.5,1.5",
    transform: "translate(2 2.980376)",
    opacity: "0",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    pathLength: "1"
  }));
  const inputClassName = css.classNames(Checkbox_module.default.Input, isIndeterminate && Checkbox_module.default['Input-indeterminate'], tone && Checkbox_module.default[css.variationName('tone', tone)]);
  const extraChoiceProps = {
    helpText,
    error,
    bleed,
    bleedBlockStart,
    bleedBlockEnd,
    bleedInlineStart,
    bleedInlineEnd
  };
  return /*#__PURE__*/React.createElement(Choice.Choice, Object.assign({
    id: id,
    label: label,
    labelHidden: labelHidden,
    disabled: disabled,
    labelClassName: css.classNames(Checkbox_module.default.ChoiceLabel, labelClassName),
    fill: fill,
    tone: tone
  }, extraChoiceProps), /*#__PURE__*/React.createElement("span", {
    className: wrapperClassName
  }, /*#__PURE__*/React.createElement("input", Object.assign({
    ref: inputNode,
    id: id,
    name: name,
    value: value,
    type: "checkbox",
    checked: isChecked,
    disabled: disabled,
    className: inputClassName,
    onBlur: handleBlur,
    onChange: noop,
    onClick: handleOnClick,
    onFocus: onFocus,
    "aria-invalid": error != null,
    "aria-controls": ariaControls,
    "aria-describedby": ariaDescribedBy,
    role: isWithinListbox ? 'presentation' : 'checkbox'
  }, indeterminateAttributes)), /*#__PURE__*/React.createElement("span", {
    className: Checkbox_module.default.Backdrop,
    onClick: stopPropagation,
    onKeyUp: stopPropagation
  }), /*#__PURE__*/React.createElement("span", {
    className: css.classNames(Checkbox_module.default.Icon, !isIndeterminate && Checkbox_module.default.animated)
  }, isIndeterminate ? /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.MinusIcon
  }) : iconSource)));
});
function noop() {}
function stopPropagation(event) {
  event.stopPropagation();
}

exports.Checkbox = Checkbox;
