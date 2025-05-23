import React from 'react';
import styles from './SkeletonPage.css.js';
import { useI18n } from '../../utilities/i18n/hooks.js';
import { Text } from '../Text/Text.js';
import { Box } from '../Box/Box.js';
import { BlockStack } from '../BlockStack/BlockStack.js';
import { InlineStack } from '../InlineStack/InlineStack.js';

function SkeletonPage({
  children,
  fullWidth,
  narrowWidth,
  primaryAction,
  title = '',
  backAction
}) {
  const i18n = useI18n();
  const titleContent = title ? /*#__PURE__*/React.createElement(Text, {
    as: "h1",
    variant: "headingLg",
    fontWeight: "bold"
  }, title) : /*#__PURE__*/React.createElement("div", {
    className: styles.SkeletonTitle
  }, /*#__PURE__*/React.createElement(Box, {
    background: "bg-fill-tertiary",
    minWidth: "120px",
    minHeight: "28px",
    borderRadius: "100"
  }));
  const primaryActionMarkup = primaryAction ? /*#__PURE__*/React.createElement(Box, {
    id: "SkeletonPage-PrimaryAction",
    borderRadius: "100",
    background: "bg-fill-tertiary",
    minHeight: "2.25rem",
    minWidth: "6.25rem"
  }) : null;
  const backActionMarkup = backAction ? /*#__PURE__*/React.createElement(Box, {
    borderRadius: "100",
    background: "bg-fill-tertiary",
    minHeight: "2.25rem",
    minWidth: "2.25rem",
    maxWidth: "2.25rem"
  }) : null;
  return /*#__PURE__*/React.createElement(BlockStack, {
    gap: "400",
    inlineAlign: "center"
  }, /*#__PURE__*/React.createElement(Box, Object.assign({
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
  }), /*#__PURE__*/React.createElement(BlockStack, null, /*#__PURE__*/React.createElement(Box, {
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
  }, /*#__PURE__*/React.createElement(InlineStack, {
    gap: "400",
    align: "space-between",
    blockAlign: "center"
  }, /*#__PURE__*/React.createElement(InlineStack, {
    gap: "400"
  }, backActionMarkup, /*#__PURE__*/React.createElement(Box, {
    paddingBlockStart: "100",
    paddingBlockEnd: "100"
  }, titleContent)), primaryActionMarkup)), /*#__PURE__*/React.createElement(Box, {
    paddingBlockEnd: "200",
    width: "100%"
  }, children))));
}

export { SkeletonPage };
