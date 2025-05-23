import React, { memo } from 'react';
import { classNames, variationName } from '../../utilities/css.js';
import { elementChildren, wrapWithComponent } from '../../utilities/components.js';
import styles from './LegacyStack.css.js';
import { Item } from './components/Item/Item.js';

/** @deprecated Use the BlockStack component instead */
const LegacyStack = /*#__PURE__*/memo(function Stack({
  children,
  vertical,
  spacing,
  distribution,
  alignment,
  wrap
}) {
  const className = classNames(styles.LegacyStack, vertical && styles.vertical, spacing && styles[variationName('spacing', spacing)], distribution && styles[variationName('distribution', distribution)], alignment && styles[variationName('alignment', alignment)], wrap === false && styles.noWrap);
  const itemMarkup = elementChildren(children).map((child, index) => {
    const props = {
      key: index
    };
    return wrapWithComponent(child, Item, props);
  });
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, itemMarkup);
});
LegacyStack.Item = Item;

export { LegacyStack };
