import React from 'react';
import styles from '../../List.css.js';

function Item({
  children
}) {
  return /*#__PURE__*/React.createElement("li", {
    className: styles.Item
  }, children);
}

export { Item };
