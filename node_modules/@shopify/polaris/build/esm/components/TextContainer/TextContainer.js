import React from 'react';
import { classNames, variationName } from '../../utilities/css.js';
import styles from './TextContainer.css.js';

/** @deprecated Use BlockStack instead */
function TextContainer({
  spacing,
  children
}) {
  const className = classNames(styles.TextContainer, spacing && styles[variationName('spacing', spacing)]);
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, children);
}

export { TextContainer };
