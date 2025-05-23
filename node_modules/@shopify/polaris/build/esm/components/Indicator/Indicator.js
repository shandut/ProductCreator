import React from 'react';
import { classNames } from '../../utilities/css.js';
import styles from './Indicator.css.js';

function Indicator({
  pulse = true
}) {
  const className = classNames(styles.Indicator, pulse && styles.pulseIndicator);
  return /*#__PURE__*/React.createElement("span", {
    className: className
  });
}

export { Indicator };
