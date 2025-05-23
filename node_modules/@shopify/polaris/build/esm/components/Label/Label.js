import React from 'react';
import { classNames } from '../../utilities/css.js';
import styles from './Label.css.js';
import { Text } from '../Text/Text.js';

function labelID(id) {
  return `${id}Label`;
}
function Label({
  children,
  id,
  hidden,
  requiredIndicator
}) {
  const className = classNames(styles.Label, hidden && styles.hidden);
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.createElement("label", {
    id: labelID(id),
    htmlFor: id,
    className: classNames(styles.Text, requiredIndicator && styles.RequiredIndicator)
  }, /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "bodyMd"
  }, children)));
}

export { Label, labelID };
