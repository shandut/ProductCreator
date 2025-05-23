import React from 'react';
import { classNames, variationName, sanitizeCustomProperties } from '../../utilities/css.js';
import styles from './SkeletonDisplayText.css.js';

function SkeletonDisplayText({
  size = 'medium',
  maxWidth
}) {
  const className = classNames(styles.DisplayText, size && styles[variationName('size', size)]);
  const style = {
    '--pc-skeleton-display-text-max-width': maxWidth ?? undefined
  };
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: sanitizeCustomProperties(style)
  });
}

export { SkeletonDisplayText };
