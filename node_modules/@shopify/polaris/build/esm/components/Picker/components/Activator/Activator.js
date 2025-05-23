import { SelectIcon } from '@shopify/polaris-icons';
import React, { forwardRef } from 'react';
import { classNames } from '../../../../utilities/css.js';
import styles from './Activator.css.js';
import { BlockStack } from '../../../BlockStack/BlockStack.js';
import { Text } from '../../../Text/Text.js';
import { Icon } from '../../../Icon/Icon.js';

const Activator = /*#__PURE__*/forwardRef(({
  disabled,
  label,
  placeholder,
  selected,
  onClick
}, ref) => {
  return /*#__PURE__*/React.createElement("button", {
    ref: ref,
    disabled: disabled,
    onClick: onClick,
    className: classNames(styles.Activator, disabled && styles.disabled),
    type: "button"
  }, /*#__PURE__*/React.createElement(BlockStack, {
    as: "span",
    gap: "100"
  }, label && /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "bodySm",
    alignment: "start",
    tone: "subdued"
  }, label), (selected !== '' || placeholder) && /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "bodyMd",
    alignment: "start",
    tone: selected ? undefined : 'subdued'
  }, selected || placeholder)), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    tone: "subdued",
    source: SelectIcon
  })));
});
Activator.displayName = 'Activator';

export { Activator };
