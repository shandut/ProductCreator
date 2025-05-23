'use strict';

var React = require('react');
var CloseButton = require('../CloseButton/CloseButton.js');
var InlineGrid = require('../../../InlineGrid/InlineGrid.js');
var Box = require('../../../Box/Box.js');
var InlineStack = require('../../../InlineStack/InlineStack.js');
var Text = require('../../../Text/Text.js');

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
    return /*#__PURE__*/React.createElement(Box.Box, {
      position: "absolute",
      insetInlineEnd: headerPaddingInline,
      insetBlockStart: headerPaddingBlock,
      zIndex: "1"
    }, /*#__PURE__*/React.createElement(CloseButton.CloseButton, {
      onClick: onClose
    }));
  }
  return /*#__PURE__*/React.createElement(Box.Box, {
    paddingBlockStart: "400",
    paddingBlockEnd: "400",
    paddingInlineStart: headerPaddingInline,
    paddingInlineEnd: headerPaddingInline,
    borderBlockEndWidth: "025",
    borderColor: "border",
    background: "bg-surface-tertiary"
  }, /*#__PURE__*/React.createElement(InlineGrid.InlineGrid, {
    columns: {
      xs: '1fr auto'
    },
    gap: "400"
  }, /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    gap: "400",
    blockAlign: "center"
  }, /*#__PURE__*/React.createElement(Text.Text, {
    id: id,
    as: "h2",
    variant: "headingMd",
    breakWord: true
  }, children)), /*#__PURE__*/React.createElement(CloseButton.CloseButton, {
    pressed: closing,
    onClick: onClose
  })));
}

exports.Header = Header;
