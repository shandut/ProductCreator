import React from 'react';
import { classNames } from '../../../../utilities/css.js';
import { clamp } from '../../../../utilities/clamp.js';
import sharedStyles from '../../RangeSlider.css.js';
import styles from './SingleThumb.css.js';
import { invertNumber } from '../../utilities/invertNumber.js';
import { Text } from '../../../Text/Text.js';
import { Labelled, helpTextID } from '../../../Labelled/Labelled.js';

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
  const clampedValue = clamp(value, min, max);
  const describedBy = [];
  if (error) {
    describedBy.push(`${id}Error`);
  }
  if (helpText) {
    describedBy.push(helpTextID(id));
  }
  const ariaDescribedBy = describedBy.length ? describedBy.join(' ') : undefined;
  const sliderProgress = (clampedValue - min) * 100 / (max - min);
  const outputFactor = invertNumber((sliderProgress - 50) / 100);
  const cssVars = {
    '--pc-range-slider-min': min,
    '--pc-range-slider-max': max,
    '--pc-range-slider-current': clampedValue,
    '--pc-range-slider-progress': `${sliderProgress}%`,
    '--pc-range-slider-output-factor': `${outputFactor}`
  };
  const outputMarkup = !disabled && output && /*#__PURE__*/React.createElement("output", {
    htmlFor: id,
    className: styles.Output
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.OutputBubble
  }, /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "headingSm",
    alignment: "center"
  }, clampedValue)));
  const prefixMarkup = prefix && /*#__PURE__*/React.createElement("div", {
    className: styles.Prefix
  }, prefix);
  const suffixMarkup = suffix && /*#__PURE__*/React.createElement("div", {
    className: styles.Suffix
  }, suffix);
  const className = classNames(styles.SingleThumb, sharedStyles.RangeSlider, error && styles.error, disabled && styles.disabled);

  /* eslint-disable @shopify/react-require-autocomplete */
  return /*#__PURE__*/React.createElement(Labelled, {
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
    className: classNames(styles.InputWrapper, sharedStyles['Track--dashed-after'])
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: styles.Input,
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

export { SingleThumb };
