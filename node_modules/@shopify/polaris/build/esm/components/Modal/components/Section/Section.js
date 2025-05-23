import React from 'react';
import { classNames } from '../../../../utilities/css.js';
import styles from './Section.css.js';
import { Box } from '../../../Box/Box.js';

function Section({
  children,
  flush = false,
  subdued = false,
  titleHidden = false
}) {
  const className = classNames(styles.Section, titleHidden && styles.titleHidden);
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.createElement(Box, Object.assign({
    as: "section",
    padding: flush ? '0' : '400'
  }, titleHidden && {
    paddingInlineEnd: '0'
  }, subdued && {
    background: 'bg-surface-tertiary'
  }), children));
}

export { Section };
