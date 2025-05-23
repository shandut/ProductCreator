import React from 'react';
import styles from './MessageIndicator.css.js';

function MessageIndicator({
  children,
  active
}) {
  const indicatorMarkup = active && /*#__PURE__*/React.createElement("div", {
    className: styles.MessageIndicator
  });
  return /*#__PURE__*/React.createElement("div", {
    className: styles.MessageIndicatorWrapper
  }, indicatorMarkup, children);
}

export { MessageIndicator };
