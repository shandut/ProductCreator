import React from 'react';
import styles from './Truncate.css.js';

function Truncate({
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: styles.Truncate
  }, children);
}

export { Truncate };
