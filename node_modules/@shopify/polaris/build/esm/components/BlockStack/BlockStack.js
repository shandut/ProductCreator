import React from 'react';
import { classNames, getResponsiveProps, sanitizeCustomProperties } from '../../utilities/css.js';
import styles from './BlockStack.css.js';

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
  const className = classNames(styles.BlockStack, (as === 'ul' || as === 'ol') && styles.listReset, as === 'fieldset' && styles.fieldsetReset);
  const style = {
    '--pc-block-stack-align': align ? `${align}` : null,
    '--pc-block-stack-inline-align': inlineAlign ? `${inlineAlign}` : null,
    '--pc-block-stack-order': reverseOrder ? 'column-reverse' : 'column',
    ...getResponsiveProps('block-stack', 'gap', 'space', gap)
  };
  return /*#__PURE__*/React.createElement(as, {
    className,
    id,
    style: sanitizeCustomProperties(style),
    ...restProps
  }, children);
};

export { BlockStack };
