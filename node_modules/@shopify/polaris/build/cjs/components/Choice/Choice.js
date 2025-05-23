'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var Choice_module = require('./Choice.css.js');
var Text = require('../Text/Text.js');
var InlineError = require('../InlineError/InlineError.js');

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
  const className = css.classNames(Choice_module.default.Choice, labelHidden && Choice_module.default.labelHidden, disabled && Choice_module.default.disabled, tone && Choice_module.default[css.variationName('tone', tone)], labelClassName);
  const labelStyle = {
    // Pass through overrides for bleed values if they're set by the prop
    ...css.getResponsiveProps('choice', 'bleed-block-end', 'space', bleedBlockEnd || bleed),
    ...css.getResponsiveProps('choice', 'bleed-block-start', 'space', bleedBlockStart || bleed),
    ...css.getResponsiveProps('choice', 'bleed-inline-start', 'space', bleedInlineStart || bleed),
    ...css.getResponsiveProps('choice', 'bleed-inline-end', 'space', bleedInlineEnd || bleed),
    ...Object.fromEntries(Object.entries(css.getResponsiveValue('choice', 'fill', fill)).map(
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
    style: css.sanitizeCustomProperties(labelStyle)
  }, /*#__PURE__*/React.createElement("span", {
    className: Choice_module.default.Control
  }, children), /*#__PURE__*/React.createElement("span", {
    className: Choice_module.default.Label
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "bodyMd"
  }, label)));
  const helpTextMarkup = helpText ? /*#__PURE__*/React.createElement("div", {
    className: Choice_module.default.HelpText,
    id: helpTextID(id)
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span"
    // `undefined` means color: inherit
    // the nearest ancestor with a specified color is .Descriptions in Choice.scss
    ,
    tone: disabled ? undefined : 'subdued'
  }, helpText)) : null;
  const errorMarkup = error && typeof error !== 'boolean' && /*#__PURE__*/React.createElement("div", {
    className: Choice_module.default.Error
  }, /*#__PURE__*/React.createElement(InlineError.InlineError, {
    message: error,
    fieldID: id
  }));
  const descriptionMarkup = helpTextMarkup || errorMarkup ? /*#__PURE__*/React.createElement("div", {
    className: Choice_module.default.Descriptions
  }, errorMarkup, helpTextMarkup) : null;
  return descriptionMarkup ? /*#__PURE__*/React.createElement("div", null, labelMarkup, descriptionMarkup) : labelMarkup;
}
function helpTextID(id) {
  return `${id}HelpText`;
}

exports.Choice = Choice;
exports.helpTextID = helpTextID;
