import React, { useId, Children } from 'react';
import { wrapWithComponent } from '../../../../utilities/components.js';
import { Item } from '../Item/Item.js';
import { BlockStack } from '../../../BlockStack/BlockStack.js';
import { InlineStack } from '../../../InlineStack/InlineStack.js';
import { Box } from '../../../Box/Box.js';
import { Text } from '../../../Text/Text.js';

function Group({
  children,
  condensed,
  title,
  helpText
}) {
  const id = useId();
  let helpTextElement = null;
  let helpTextId;
  let titleElement = null;
  let titleId;
  if (helpText) {
    helpTextId = `${id}HelpText`;
    helpTextElement = /*#__PURE__*/React.createElement(Box, {
      id: helpTextId,
      color: "text-secondary"
    }, helpText);
  }
  if (title) {
    titleId = `${id}Title`;
    titleElement = /*#__PURE__*/React.createElement(Text, {
      id: titleId,
      as: "p"
    }, title);
  }
  const itemsMarkup = Children.map(children, child => wrapWithComponent(child, Item, {
    condensed
  }));
  return /*#__PURE__*/React.createElement(BlockStack, {
    role: "group",
    gap: "200",
    "aria-labelledby": titleId,
    "aria-describedby": helpTextId
  }, titleElement, /*#__PURE__*/React.createElement(InlineStack, {
    gap: "300"
  }, itemsMarkup), helpTextElement);
}

export { Group };
