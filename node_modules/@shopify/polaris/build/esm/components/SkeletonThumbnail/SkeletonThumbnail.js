import React from 'react';
import { classNames, variationName } from '../../utilities/css.js';
import styles from './SkeletonThumbnail.css.js';

function SkeletonThumbnail({
  size = 'medium'
}) {
  const className = classNames(styles.SkeletonThumbnail, size && styles[variationName('size', size)]);
  return /*#__PURE__*/React.createElement("div", {
    className: className
  });
}

export { SkeletonThumbnail };
