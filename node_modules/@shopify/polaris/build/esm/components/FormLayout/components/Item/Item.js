import React from 'react';
import { classNames } from '../../../../utilities/css.js';
import styles from '../../FormLayout.css.js';

function Item({
  children,
  condensed = false
}) {
  const className = classNames(styles.Item, condensed ? styles.condensed : styles.grouped);
  return children ? /*#__PURE__*/React.createElement("div", {
    className: className
  }, children) : null;
}

export { Item };
