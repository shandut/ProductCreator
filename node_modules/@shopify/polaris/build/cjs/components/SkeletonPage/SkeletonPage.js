'use strict';

var React = require('react');
var SkeletonPage_module = require('./SkeletonPage.css.js');
var hooks = require('../../utilities/i18n/hooks.js');
var Text = require('../Text/Text.js');
var Box = require('../Box/Box.js');
var BlockStack = require('../BlockStack/BlockStack.js');
var InlineStack = require('../InlineStack/InlineStack.js');

function SkeletonPage({
  children,
  fullWidth,
  narrowWidth,
  primaryAction,
  title = '',
  backAction
}) {
  const i18n = hooks.useI18n();
  const titleContent = title ? /*#__PURE__*/React.createElement(Text.Text, {
    as: "h1",
    variant: "headingLg",
    fontWeight: "bold"
  }, title) : /*#__PURE__*/React.createElement("div", {
    className: SkeletonPage_module.default.SkeletonTitle
  }, /*#__PURE__*/React.createElement(Box.Box, {
    background: "bg-fill-tertiary",
    minWidth: "120px",
    minHeight: "28px",
    borderRadius: "100"
  }));
  const primaryActionMarkup = primaryAction ? /*#__PURE__*/React.createElement(Box.Box, {
    id: "SkeletonPage-PrimaryAction",
    borderRadius: "100",
    background: "bg-fill-tertiary",
    minHeight: "2.25rem",
    minWidth: "6.25rem"
  }) : null;
  const backActionMarkup = backAction ? /*#__PURE__*/React.createElement(Box.Box, {
    borderRadius: "100",
    background: "bg-fill-tertiary",
    minHeight: "2.25rem",
    minWidth: "2.25rem",
    maxWidth: "2.25rem"
  }) : null;
  return /*#__PURE__*/React.createElement(BlockStack.BlockStack, {
    gap: "400",
    inlineAlign: "center"
  }, /*#__PURE__*/React.createElement(Box.Box, Object.assign({
    width: "100%",
    padding: "0",
    paddingInlineStart: {
      sm: '600'
    },
    paddingInlineEnd: {
      sm: '600'
    },
    maxWidth: "var(--pc-skeleton-page-max-width)",
    "aria-label": i18n.translate('Polaris.SkeletonPage.loadingLabel'),
    role: "status"
  }, narrowWidth && {
    maxWidth: 'var(--pc-skeleton-page-max-width-narrow)'
  }, fullWidth && {
    maxWidth: 'none'
  }), /*#__PURE__*/React.createElement(BlockStack.BlockStack, null, /*#__PURE__*/React.createElement(Box.Box, {
    paddingBlockStart: {
      xs: '400',
      md: '500'
    },
    paddingBlockEnd: {
      xs: '400',
      md: '500'
    },
    paddingInlineStart: {
      xs: '400',
      sm: '0'
    },
    paddingInlineEnd: {
      xs: '400',
      sm: '0'
    },
    width: "100%"
  }, /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    gap: "400",
    align: "space-between",
    blockAlign: "center"
  }, /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    gap: "400"
  }, backActionMarkup, /*#__PURE__*/React.createElement(Box.Box, {
    paddingBlockStart: "100",
    paddingBlockEnd: "100"
  }, titleContent)), primaryActionMarkup)), /*#__PURE__*/React.createElement(Box.Box, {
    paddingBlockEnd: "200",
    width: "100%"
  }, children))));
}

exports.SkeletonPage = SkeletonPage;
