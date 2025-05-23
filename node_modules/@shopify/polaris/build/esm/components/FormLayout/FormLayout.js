import React, { memo, Children } from 'react';
import { isElementOfType, wrapWithComponent } from '../../utilities/components.js';
import { Group } from './components/Group/Group.js';
import { BlockStack } from '../BlockStack/BlockStack.js';
import { Item } from './components/Item/Item.js';

const FormLayout = /*#__PURE__*/memo(function FormLayout({
  children
}) {
  return /*#__PURE__*/React.createElement(BlockStack, {
    gap: "400"
  }, Children.map(children, wrapChildren));
});
FormLayout.Group = Group;
function wrapChildren(child, index) {
  if (isElementOfType(child, Group)) {
    return child;
  }
  const props = {
    key: index
  };
  return wrapWithComponent(child, Item, props);
}

export { FormLayout };
