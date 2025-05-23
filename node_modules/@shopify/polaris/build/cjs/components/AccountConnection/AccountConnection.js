'use strict';

var React = require('react');
var breakpoints = require('../../utilities/breakpoints.js');
var utils = require('../Button/utils.js');
var Card = require('../Card/Card.js');
var SettingAction = require('../SettingAction/SettingAction.js');
var InlineStack = require('../InlineStack/InlineStack.js');
var BlockStack = require('../BlockStack/BlockStack.js');
var Avatar = require('../Avatar/Avatar.js');
var Box = require('../Box/Box.js');
var Text = require('../Text/Text.js');

function AccountConnection({
  connected = false,
  action,
  avatarUrl,
  accountName = '',
  title,
  details,
  termsOfService
}) {
  const breakpoints$1 = breakpoints.useBreakpoints();
  const initials = accountName ? accountName.split(/\s+/).map(name => name[0]).join('') : undefined;
  const avatarMarkup = connected ? /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Avatar.Avatar, {
    accessibilityLabel: "",
    name: accountName,
    initials: initials,
    source: avatarUrl
  })) : null;
  const titleContent = title ? title : accountName;
  const titleMarkup = /*#__PURE__*/React.createElement(Text.Text, {
    as: "h2",
    variant: "headingSm"
  }, titleContent);
  const detailsMarkup = details ? /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "bodyMd",
    tone: "subdued"
  }, details) : null;
  const termsOfServiceMarkup = termsOfService ? /*#__PURE__*/React.createElement(Box.Box, {
    paddingBlockStart: breakpoints$1.mdUp ? '400' : '500'
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "bodyMd"
  }, termsOfService)) : null;
  const actionElement = action ? utils.buttonFrom(action, {
    variant: connected ? undefined : 'primary'
  }) : null;
  return /*#__PURE__*/React.createElement(Card.Card, null, /*#__PURE__*/React.createElement(SettingAction.SettingAction, {
    action: actionElement
  }, /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    gap: "400"
  }, avatarMarkup, /*#__PURE__*/React.createElement(BlockStack.BlockStack, {
    gap: "100"
  }, titleMarkup, detailsMarkup))), termsOfServiceMarkup);
}

exports.AccountConnection = AccountConnection;
