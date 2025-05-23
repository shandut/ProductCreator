'use strict';

var React = require('react');
var Button = require('./Button.js');

function buttonsFrom(actions, overrides = {}) {
  if (Array.isArray(actions)) {
    return actions.map((action, index) => buttonFrom(action, overrides, index));
  } else {
    const action = actions;
    return buttonFrom(action, overrides);
  }
}
function buttonFrom({
  content,
  onAction,
  plain,
  destructive,
  ...action
}, overrides, key) {
  const plainVariant = plain ? 'plain' : undefined;
  const destructiveVariant = destructive ? 'primary' : undefined;
  const tone = !overrides?.tone && destructive ? 'critical' : overrides?.tone;
  return /*#__PURE__*/React.createElement(Button.Button, Object.assign({
    key: key,
    onClick: onAction,
    tone: tone,
    variant: plainVariant || destructiveVariant
  }, action, overrides), content);
}

exports.buttonFrom = buttonFrom;
exports.buttonsFrom = buttonsFrom;
