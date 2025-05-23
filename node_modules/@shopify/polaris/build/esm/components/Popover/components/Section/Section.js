import React from 'react';
import styles from '../../Popover.css.js';
import { Box } from '../../../Box/Box.js';

function Section({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.Section
  }, /*#__PURE__*/React.createElement(Box, {
    paddingInlineStart: "300",
    paddingInlineEnd: "300",
    paddingBlockStart: "200",
    paddingBlockEnd: "150"
  }, children));
}

export { Section };
