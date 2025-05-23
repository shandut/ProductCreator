import React from 'react';
import { Button } from './Button.js';

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
  return /*#__PURE__*/React.createElement(Button, Object.assign({
    key: key,
    onClick: onAction,
    tone: tone,
    variant: plainVariant || destructiveVariant
  }, action, overrides), content);
}

export { buttonFrom, buttonsFrom };
