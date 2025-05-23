import React from 'react';
import { classNames, variationName, getResponsiveProps, getResponsiveValue, sanitizeCustomProperties } from '../../utilities/css.js';
import styles from './Choice.css.js';
import { Text } from '../Text/Text.js';
import { InlineError } from '../InlineError/InlineError.js';

function Choice({
  id,
  label,
  disabled,
  error,
  children,
  labelHidden,
  helpText,
  onClick,
  labelClassName,
  fill,
  bleed,
  bleedBlockStart,
  bleedBlockEnd,
  bleedInlineStart,
  bleedInlineEnd,
  tone
}) {
  const className = classNames(styles.Choice, labelHidden && styles.labelHidden, disabled && styles.disabled, tone && styles[variationName('tone', tone)], labelClassName);
  const labelStyle = {
    // Pass through overrides for bleed values if they're set by the prop
    ...getResponsiveProps('choice', 'bleed-block-end', 'space', bleedBlockEnd || bleed),
    ...getResponsiveProps('choice', 'bleed-block-start', 'space', bleedBlockStart || bleed),
    ...getResponsiveProps('choice', 'bleed-inline-start', 'space', bleedInlineStart || bleed),
    ...getResponsiveProps('choice', 'bleed-inline-end', 'space', bleedInlineEnd || bleed),
    ...Object.fromEntries(Object.entries(getResponsiveValue('choice', 'fill', fill)).map(
    // Map "true" => "100%" and "false" => "auto" for use in
    // inline/block-size calc()
    ([key, value]) => [key, value ? '100%' : 'auto']))
  };
  const labelMarkup =
  /*#__PURE__*/
  // NOTE: Can't use a Box here for a few reasons:
  // - as="label" fails `Element` typecheck (even though the JS works)
  // - Can't pass hard coded values to padding (forced to tokens)
  // - Can't pass negative values to padding
  // - Can't pass margins at all
  React.createElement("label", {
    className: className,
    htmlFor: id,
    onClick: onClick,
    style: sanitizeCustomProperties(labelStyle)
  }, /*#__PURE__*/React.createElement("span", {
    className: styles.Control
  }, children), /*#__PURE__*/React.createElement("span", {
    className: styles.Label
  }, /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "bodyMd"
  }, label)));
  const helpTextMarkup = helpText ? /*#__PURE__*/React.createElement("div", {
    className: styles.HelpText,
    id: helpTextID(id)
  }, /*#__PURE__*/React.createElement(Text, {
    as: "span"
    // `undefined` means color: inherit
    // the nearest ancestor with a specified color is .Descriptions in Choice.scss
    ,
    tone: disabled ? undefined : 'subdued'
  }, helpText)) : null;
  const errorMarkup = error && typeof error !== 'boolean' && /*#__PURE__*/React.createElement("div", {
    className: styles.Error
  }, /*#__PURE__*/React.createElement(InlineError, {
    message: error,
    fieldID: id
  }));
  const descriptionMarkup = helpTextMarkup || errorMarkup ? /*#__PURE__*/React.createElement("div", {
    className: styles.Descriptions
  }, errorMarkup, helpTextMarkup) : null;
  return descriptionMarkup ? /*#__PURE__*/React.createElement("div", null, labelMarkup, descriptionMarkup) : labelMarkup;
}
function helpTextID(id) {
  return `${id}HelpText`;
}

export { Choice, helpTextID };
