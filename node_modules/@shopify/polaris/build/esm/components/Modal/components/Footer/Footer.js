import React from 'react';
import { buttonsFrom } from '../../../Button/utils.js';
import { InlineStack } from '../../../InlineStack/InlineStack.js';
import { Box } from '../../../Box/Box.js';

function Footer({
  primaryAction,
  secondaryActions,
  children
}) {
  const primaryActionButton = primaryAction && buttonsFrom(primaryAction, {
    variant: 'primary'
  }) || null;
  const secondaryActionButtons = secondaryActions && buttonsFrom(secondaryActions) || null;
  const actions = primaryActionButton || secondaryActionButtons ? /*#__PURE__*/React.createElement(InlineStack, {
    gap: "200"
  }, secondaryActionButtons, primaryActionButton) : null;
  return /*#__PURE__*/React.createElement(InlineStack, {
    gap: "400",
    blockAlign: "center"
  }, /*#__PURE__*/React.createElement(Box, {
    borderColor: "border",
    borderBlockStartWidth: "025",
    padding: "400",
    width: "100%"
  }, /*#__PURE__*/React.createElement(InlineStack, {
    gap: "400",
    blockAlign: "center",
    align: "space-between"
  }, /*#__PURE__*/React.createElement(Box, null, children), actions)));
}

export { Footer };
