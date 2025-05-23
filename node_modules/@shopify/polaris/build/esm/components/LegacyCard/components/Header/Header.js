import React, { isValidElement } from 'react';
import styles from '../../LegacyCard.css.js';
import { buttonsFrom } from '../../../Button/utils.js';
import { ButtonGroup } from '../../../ButtonGroup/ButtonGroup.js';
import { InlineStack } from '../../../InlineStack/InlineStack.js';
import { Text } from '../../../Text/Text.js';

function Header({
  children,
  title,
  actions
}) {
  const actionMarkup = actions ? /*#__PURE__*/React.createElement(ButtonGroup, null, buttonsFrom(actions, {
    variant: 'plain'
  })) : null;
  const titleMarkup = /*#__PURE__*/isValidElement(title) ? title : /*#__PURE__*/React.createElement(Text, {
    variant: "headingSm",
    as: "h2"
  }, title);
  const headingMarkup = actionMarkup || children ? /*#__PURE__*/React.createElement(InlineStack, {
    wrap: false,
    gap: "200",
    align: "space-between",
    blockAlign: "center"
  }, titleMarkup, /*#__PURE__*/React.createElement(InlineStack, {
    wrap: false,
    gap: "400",
    blockAlign: "center"
  }, actionMarkup, children)) : titleMarkup;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.Header
  }, headingMarkup);
}

export { Header };
