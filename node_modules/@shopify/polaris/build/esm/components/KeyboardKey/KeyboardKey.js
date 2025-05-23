import React from 'react';
import { classNames } from '../../utilities/css.js';
import styles from './KeyboardKey.css.js';

function KeyboardKey({
  children = '',
  size
}) {
  const key = !size && children.length > 1 ? children.toLowerCase() : children.toUpperCase();
  const className = classNames(styles.KeyboardKey, size && styles[size]);
  return /*#__PURE__*/React.createElement("kbd", {
    className: className
  }, key);
}

export { KeyboardKey };
