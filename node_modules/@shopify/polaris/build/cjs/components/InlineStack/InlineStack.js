'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var InlineStack_module = require('./InlineStack.css.js');

const InlineStack = function InlineStack({
  as: Element = 'div',
  align,
  direction = 'row',
  blockAlign,
  gap,
  wrap = true,
  children
}) {
  const style = {
    '--pc-inline-stack-align': align,
    '--pc-inline-stack-block-align': blockAlign,
    '--pc-inline-stack-wrap': wrap ? 'wrap' : 'nowrap',
    ...css.getResponsiveProps('inline-stack', 'gap', 'space', gap),
    ...css.getResponsiveValue('inline-stack', 'flex-direction', direction)
  };
  return /*#__PURE__*/React.createElement(Element, {
    className: InlineStack_module.default.InlineStack,
    style: style
  }, children);
};

exports.InlineStack = InlineStack;
