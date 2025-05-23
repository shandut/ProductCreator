import React from 'react';
import { useSection } from '../Section/hooks.js';
import { Box } from '../../../Box/Box.js';
import { Text } from '../../../Text/Text.js';

function Header({
  children
}) {
  const sectionId = useSection() || '';
  const content = typeof children === 'string' ? /*#__PURE__*/React.createElement(Box, {
    paddingBlockStart: "200",
    paddingInlineStart: "400",
    paddingBlockEnd: "200",
    paddingInlineEnd: "400"
  }, /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "headingSm",
    tone: "subdued"
  }, children)) : children;
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    id: sectionId
  }, content);
}

export { Header };
