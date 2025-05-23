import React from 'react';
import { useBreakpoints } from '../../utilities/breakpoints.js';
import { buttonFrom } from '../Button/utils.js';
import { Card } from '../Card/Card.js';
import { SettingAction } from '../SettingAction/SettingAction.js';
import { InlineStack } from '../InlineStack/InlineStack.js';
import { BlockStack } from '../BlockStack/BlockStack.js';
import { Avatar } from '../Avatar/Avatar.js';
import { Box } from '../Box/Box.js';
import { Text } from '../Text/Text.js';

function AccountConnection({
  connected = false,
  action,
  avatarUrl,
  accountName = '',
  title,
  details,
  termsOfService
}) {
  const breakpoints = useBreakpoints();
  const initials = accountName ? accountName.split(/\s+/).map(name => name[0]).join('') : undefined;
  const avatarMarkup = connected ? /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Avatar, {
    accessibilityLabel: "",
    name: accountName,
    initials: initials,
    source: avatarUrl
  })) : null;
  const titleContent = title ? title : accountName;
  const titleMarkup = /*#__PURE__*/React.createElement(Text, {
    as: "h2",
    variant: "headingSm"
  }, titleContent);
  const detailsMarkup = details ? /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "bodyMd",
    tone: "subdued"
  }, details) : null;
  const termsOfServiceMarkup = termsOfService ? /*#__PURE__*/React.createElement(Box, {
    paddingBlockStart: breakpoints.mdUp ? '400' : '500'
  }, /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "bodyMd"
  }, termsOfService)) : null;
  const actionElement = action ? buttonFrom(action, {
    variant: connected ? undefined : 'primary'
  }) : null;
  return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SettingAction, {
    action: actionElement
  }, /*#__PURE__*/React.createElement(InlineStack, {
    gap: "400"
  }, avatarMarkup, /*#__PURE__*/React.createElement(BlockStack, {
    gap: "100"
  }, titleMarkup, detailsMarkup))), termsOfServiceMarkup);
}

export { AccountConnection };
