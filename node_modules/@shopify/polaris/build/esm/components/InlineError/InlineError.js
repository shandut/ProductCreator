import React from 'react';
import { AlertCircleIcon } from '@shopify/polaris-icons';
import styles from './InlineError.css.js';
import { Icon } from '../Icon/Icon.js';
import { Text } from '../Text/Text.js';

function InlineError({
  message,
  fieldID
}) {
  if (!message) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", {
    id: errorTextID(fieldID),
    className: styles.InlineError
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.Icon
  }, /*#__PURE__*/React.createElement(Icon, {
    source: AlertCircleIcon
  })), /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "bodyMd"
  }, message));
}
function errorTextID(id) {
  return `${id}Error`;
}

export { InlineError, errorTextID };
