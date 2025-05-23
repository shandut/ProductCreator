'use strict';

var React = require('react');
var components = require('../../../../utilities/components.js');
var Item = require('../Item/Item.js');
var BlockStack = require('../../../BlockStack/BlockStack.js');
var InlineStack = require('../../../InlineStack/InlineStack.js');
var Box = require('../../../Box/Box.js');
var Text = require('../../../Text/Text.js');

function Group({
  children,
  condensed,
  title,
  helpText
}) {
  const id = React.useId();
  let helpTextElement = null;
  let helpTextId;
  let titleElement = null;
  let titleId;
  if (helpText) {
    helpTextId = `${id}HelpText`;
    helpTextElement = /*#__PURE__*/React.createElement(Box.Box, {
      id: helpTextId,
      color: "text-secondary"
    }, helpText);
  }
  if (title) {
    titleId = `${id}Title`;
    titleElement = /*#__PURE__*/React.createElement(Text.Text, {
      id: titleId,
      as: "p"
    }, title);
  }
  const itemsMarkup = React.Children.map(children, child => components.wrapWithComponent(child, Item.Item, {
    condensed
  }));
  return /*#__PURE__*/React.createElement(BlockStack.BlockStack, {
    role: "group",
    gap: "200",
    "aria-labelledby": titleId,
    "aria-describedby": helpTextId
  }, titleElement, /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    gap: "300"
  }, itemsMarkup), helpTextElement);
}

exports.Group = Group;
