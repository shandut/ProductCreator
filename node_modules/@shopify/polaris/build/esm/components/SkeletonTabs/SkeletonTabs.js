import React from 'react';
import { classNames } from '../../utilities/css.js';
import styles from './SkeletonTabs.css.js';

function SkeletonTabs({
  count = 2,
  fitted = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: classNames(styles.Tabs, fitted && styles.fitted)
  }, [...Array(count).keys()].map(key => {
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      className: classNames(styles.Tab)
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.TabText
    }));
  }));
}

export { SkeletonTabs };
