'use strict';

var React = require('react');
var components = require('../../utilities/components.js');
var Group = require('./components/Group/Group.js');
var BlockStack = require('../BlockStack/BlockStack.js');
var Item = require('./components/Item/Item.js');

const FormLayout = /*#__PURE__*/React.memo(function FormLayout({
  children
}) {
  return /*#__PURE__*/React.createElement(BlockStack.BlockStack, {
    gap: "400"
  }, React.Children.map(children, wrapChildren));
});
FormLayout.Group = Group.Group;
function wrapChildren(child, index) {
  if (components.isElementOfType(child, Group.Group)) {
    return child;
  }
  const props = {
    key: index
  };
  return components.wrapWithComponent(child, Item.Item, props);
}

exports.FormLayout = FormLayout;
