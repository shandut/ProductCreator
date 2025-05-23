import React from 'react';
import { classNames } from '../../../../utilities/css.js';
import styles from './SecondaryAction.css.js';
import { Button } from '../../../Button/Button.js';
import { Tooltip } from '../../../Tooltip/Tooltip.js';

function SecondaryAction({
  children,
  tone,
  helpText,
  onAction,
  destructive,
  ...rest
}) {
  const buttonMarkup = /*#__PURE__*/React.createElement(Button, Object.assign({
    onClick: onAction,
    tone: destructive ? 'critical' : undefined
  }, rest), children);
  const actionMarkup = helpText ? /*#__PURE__*/React.createElement(Tooltip, {
    preferredPosition: "below",
    content: helpText
  }, buttonMarkup) : buttonMarkup;
  return /*#__PURE__*/React.createElement("div", {
    className: classNames(styles.SecondaryAction, tone === 'critical' && styles.critical)
  }, actionMarkup);
}

export { SecondaryAction };
