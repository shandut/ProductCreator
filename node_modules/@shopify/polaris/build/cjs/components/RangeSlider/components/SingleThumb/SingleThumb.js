'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var clamp = require('../../../../utilities/clamp.js');
var RangeSlider_module = require('../../RangeSlider.css.js');
var SingleThumb_module = require('./SingleThumb.css.js');
var invertNumber = require('../../utilities/invertNumber.js');
var Text = require('../../../Text/Text.js');
var Labelled = require('../../../Labelled/Labelled.js');

function SingleThumb(props) {
  const {
    id,
    error,
    helpText,
    value,
    min,
    max,
    disabled,
    output,
    prefix,
    suffix,
    label,
    labelAction,
    labelHidden,
    step,
    onBlur,
    onFocus
  } = props;
  const clampedValue = clamp.clamp(value, min, max);
  const describedBy = [];
  if (error) {
    describedBy.push(`${id}Error`);
  }
  if (helpText) {
    describedBy.push(Labelled.helpTextID(id));
  }
  const ariaDescribedBy = describedBy.length ? describedBy.join(' ') : undefined;
  const sliderProgress = (clampedValue - min) * 100 / (max - min);
  const outputFactor = invertNumber.invertNumber((sliderProgress - 50) / 100);
  const cssVars = {
    '--pc-range-slider-min': min,
    '--pc-range-slider-max': max,
    '--pc-range-slider-current': clampedValue,
    '--pc-range-slider-progress': `${sliderProgress}%`,
    '--pc-range-slider-output-factor': `${outputFactor}`
  };
  const outputMarkup = !disabled && output && /*#__PURE__*/React.createElement("output", {
    htmlFor: id,
    className: SingleThumb_module.default.Output
  }, /*#__PURE__*/React.createElement("div", {
    className: SingleThumb_module.default.OutputBubble
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "headingSm",
    alignment: "center"
  }, clampedValue)));
  const prefixMarkup = prefix && /*#__PURE__*/React.createElement("div", {
    className: SingleThumb_module.default.Prefix
  }, prefix);
  const suffixMarkup = suffix && /*#__PURE__*/React.createElement("div", {
    className: SingleThumb_module.default.Suffix
  }, suffix);
  const className = css.classNames(SingleThumb_module.default.SingleThumb, RangeSlider_module.default.RangeSlider, error && SingleThumb_module.default.error, disabled && SingleThumb_module.default.disabled);

  /* eslint-disable @shopify/react-require-autocomplete */
  return /*#__PURE__*/React.createElement(Labelled.Labelled, {
    id: id,
    label: label,
    error: error,
    action: labelAction,
    labelHidden: labelHidden,
    helpText: helpText
  }, /*#__PURE__*/React.createElement("div", {
    className: className,
    style: cssVars
  }, prefixMarkup, /*#__PURE__*/React.createElement("div", {
    className: css.classNames(SingleThumb_module.default.InputWrapper, RangeSlider_module.default['Track--dashed-after'])
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: SingleThumb_module.default.Input,
    id: id,
    name: id,
    min: min,
    max: max,
    step: step,
    value: clampedValue,
    disabled: disabled,
    onChange: handleChange,
    onFocus: onFocus,
    onBlur: onBlur,
    "aria-valuemin": min,
    "aria-valuemax": max,
    "aria-valuenow": clampedValue,
    "aria-invalid": Boolean(error),
    "aria-describedby": ariaDescribedBy
  }), outputMarkup), suffixMarkup));
  /* eslint-enable @shopify/react-require-autocomplete */

  function handleChange(event) {
    const {
      onChange
    } = props;
    onChange && onChange(parseFloat(event.currentTarget.value), id);
  }
}

exports.SingleThumb = SingleThumb;
