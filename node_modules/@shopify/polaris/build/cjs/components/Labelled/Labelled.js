'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var Labelled_module = require('./Labelled.css.js');
var InlineError = require('../InlineError/InlineError.js');
var Label = require('../Label/Label.js');
var utils = require('../Button/utils.js');
var Text = require('../Text/Text.js');

function Labelled({
  id,
  label,
  error,
  action,
  helpText,
  children,
  labelHidden,
  requiredIndicator,
  disabled,
  readOnly,
  ...rest
}) {
  const className = css.classNames(labelHidden && Labelled_module.default.hidden, disabled && Labelled_module.default.disabled, readOnly && Labelled_module.default.readOnly);
  const actionMarkup = action ? /*#__PURE__*/React.createElement("div", {
    className: Labelled_module.default.Action
  }, utils.buttonFrom(action, {
    variant: 'plain'
  })) : null;
  const helpTextMarkup = helpText ? /*#__PURE__*/React.createElement("div", {
    className: Labelled_module.default.HelpText,
    id: helpTextID(id),
    "aria-disabled": disabled
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    tone: "subdued",
    variant: "bodyMd",
    breakWord: true
  }, helpText)) : null;
  const errorMarkup = error && typeof error !== 'boolean' && /*#__PURE__*/React.createElement("div", {
    className: Labelled_module.default.Error
  }, /*#__PURE__*/React.createElement(InlineError.InlineError, {
    message: error,
    fieldID: id
  }));
  const labelMarkup = label ? /*#__PURE__*/React.createElement("div", {
    className: Labelled_module.default.LabelWrapper
  }, /*#__PURE__*/React.createElement(Label.Label, Object.assign({
    id: id,
    requiredIndicator: requiredIndicator
  }, rest, {
    hidden: false
  }), label), actionMarkup) : null;
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, labelMarkup, children, errorMarkup, helpTextMarkup);
}
function helpTextID(id) {
  return `${id}HelpText`;
}

exports.labelID = Label.labelID;
exports.Labelled = Labelled;
exports.helpTextID = helpTextID;
