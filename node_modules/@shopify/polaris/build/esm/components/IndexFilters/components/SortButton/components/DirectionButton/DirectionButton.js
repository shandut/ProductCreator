import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@shopify/polaris-icons';
import { classNames } from '../../../../../../utilities/css.js';
import styles from './DirectionButton.css.js';
import { UnstyledButton } from '../../../../../UnstyledButton/UnstyledButton.js';
import { Icon } from '../../../../../Icon/Icon.js';
import { Text } from '../../../../../Text/Text.js';

function DirectionButton({
  onClick,
  active,
  children,
  direction,
  value
}) {
  const classes = classNames(styles.DirectionButton, active && styles['DirectionButton-active']);
  function handleClick() {
    onClick([value]);
  }
  return /*#__PURE__*/React.createElement(UnstyledButton, {
    className: classes,
    onClick: handleClick
  }, /*#__PURE__*/React.createElement(Icon, {
    source: direction === 'asc' ? ArrowUpIcon : ArrowDownIcon,
    tone: "base"
  }), /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "bodySm",
    fontWeight: "medium"
  }, children));
}

export { DirectionButton };
