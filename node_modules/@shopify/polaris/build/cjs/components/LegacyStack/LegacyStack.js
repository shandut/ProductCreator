'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var components = require('../../utilities/components.js');
var LegacyStack_module = require('./LegacyStack.css.js');
var Item = require('./components/Item/Item.js');

/** @deprecated Use the BlockStack component instead */
const LegacyStack = /*#__PURE__*/React.memo(function Stack({
  children,
  vertical,
  spacing,
  distribution,
  alignment,
  wrap
}) {
  const className = css.classNames(LegacyStack_module.default.LegacyStack, vertical && LegacyStack_module.default.vertical, spacing && LegacyStack_module.default[css.variationName('spacing', spacing)], distribution && LegacyStack_module.default[css.variationName('distribution', distribution)], alignment && LegacyStack_module.default[css.variationName('alignment', alignment)], wrap === false && LegacyStack_module.default.noWrap);
  const itemMarkup = components.elementChildren(children).map((child, index) => {
    const props = {
      key: index
    };
    return components.wrapWithComponent(child, Item.Item, props);
  });
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, itemMarkup);
});
LegacyStack.Item = Item.Item;

exports.LegacyStack = LegacyStack;
