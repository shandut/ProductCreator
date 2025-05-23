import React from 'react';
import { CloseButton } from '../CloseButton/CloseButton.js';
import { InlineGrid } from '../../../InlineGrid/InlineGrid.js';
import { Box } from '../../../Box/Box.js';
import { InlineStack } from '../../../InlineStack/InlineStack.js';
import { Text } from '../../../Text/Text.js';

function Header({
  id,
  children,
  closing,
  titleHidden,
  onClose
}) {
  const headerPaddingInline = '400';
  const headerPaddingBlock = '400';
  if (titleHidden || !children) {
    return /*#__PURE__*/React.createElement(Box, {
      position: "absolute",
      insetInlineEnd: headerPaddingInline,
      insetBlockStart: headerPaddingBlock,
      zIndex: "1"
    }, /*#__PURE__*/React.createElement(CloseButton, {
      onClick: onClose
    }));
  }
  return /*#__PURE__*/React.createElement(Box, {
    paddingBlockStart: "400",
    paddingBlockEnd: "400",
    paddingInlineStart: headerPaddingInline,
    paddingInlineEnd: headerPaddingInline,
    borderBlockEndWidth: "025",
    borderColor: "border",
    background: "bg-surface-tertiary"
  }, /*#__PURE__*/React.createElement(InlineGrid, {
    columns: {
      xs: '1fr auto'
    },
    gap: "400"
  }, /*#__PURE__*/React.createElement(InlineStack, {
    gap: "400",
    blockAlign: "center"
  }, /*#__PURE__*/React.createElement(Text, {
    id: id,
    as: "h2",
    variant: "headingMd",
    breakWord: true
  }, children)), /*#__PURE__*/React.createElement(CloseButton, {
    pressed: closing,
    onClick: onClose
  })));
}

export { Header };
