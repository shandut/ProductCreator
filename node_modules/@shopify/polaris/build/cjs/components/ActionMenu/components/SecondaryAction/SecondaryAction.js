'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var SecondaryAction_module = require('./SecondaryAction.css.js');
var Button = require('../../../Button/Button.js');
var Tooltip = require('../../../Tooltip/Tooltip.js');

function SecondaryAction({
  children,
  tone,
  helpText,
  onAction,
  destructive,
  ...rest
}) {
  const buttonMarkup = /*#__PURE__*/React.createElement(Button.Button, Object.assign({
    onClick: onAction,
    tone: destructive ? 'critical' : undefined
  }, rest), children);
  const actionMarkup = helpText ? /*#__PURE__*/React.createElement(Tooltip.Tooltip, {
    preferredPosition: "below",
    content: helpText
  }, buttonMarkup) : buttonMarkup;
  return /*#__PURE__*/React.createElement("div", {
    className: css.classNames(SecondaryAction_module.default.SecondaryAction, tone === 'critical' && SecondaryAction_module.default.critical)
  }, actionMarkup);
}

exports.SecondaryAction = SecondaryAction;
