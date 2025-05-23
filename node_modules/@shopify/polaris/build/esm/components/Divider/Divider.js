import React from 'react';
import styles from './Divider.css.js';

const Divider = ({
  borderColor = 'border-secondary',
  borderWidth = '025'
}) => {
  const borderColorValue = borderColor === 'transparent' ? borderColor : `var(--p-color-${borderColor})`;
  return /*#__PURE__*/React.createElement("hr", {
    className: styles.Divider,
    style: {
      borderBlockStart: `var(--p-border-width-${borderWidth}) solid ${borderColorValue}`
    }
  });
};

export { Divider };
