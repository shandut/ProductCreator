import React from 'react';
import { classNames } from '../../../../utilities/css.js';
import styles from '../../LegacyStack.css.js';

function Item({
  children,
  fill
}) {
  const className = classNames(styles.Item, fill && styles['Item-fill']);
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, children);
}

export { Item };
