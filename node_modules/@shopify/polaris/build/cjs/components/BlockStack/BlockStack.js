'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var BlockStack_module = require('./BlockStack.css.js');

const BlockStack = ({
  as = 'div',
  children,
  align,
  inlineAlign,
  gap,
  id,
  reverseOrder = false,
  ...restProps
}) => {
  const className = css.classNames(BlockStack_module.default.BlockStack, (as === 'ul' || as === 'ol') && BlockStack_module.default.listReset, as === 'fieldset' && BlockStack_module.default.fieldsetReset);
  const style = {
    '--pc-block-stack-align': align ? `${align}` : null,
    '--pc-block-stack-inline-align': inlineAlign ? `${inlineAlign}` : null,
    '--pc-block-stack-order': reverseOrder ? 'column-reverse' : 'column',
    ...css.getResponsiveProps('block-stack', 'gap', 'space', gap)
  };
  return /*#__PURE__*/React.createElement(as, {
    className,
    id,
    style: css.sanitizeCustomProperties(style),
    ...restProps
  }, children);
};

exports.BlockStack = BlockStack;
