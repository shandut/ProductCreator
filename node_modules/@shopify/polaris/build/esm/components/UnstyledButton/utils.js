import React from 'react';
import { UnstyledButton } from './UnstyledButton.js';

function unstyledButtonFrom({
  content,
  onAction,
  ...action
}, overrides, key) {
  return /*#__PURE__*/React.createElement(UnstyledButton, Object.assign({
    key: key,
    onClick: onAction
  }, action, overrides), content);
}

export { unstyledButtonFrom };
