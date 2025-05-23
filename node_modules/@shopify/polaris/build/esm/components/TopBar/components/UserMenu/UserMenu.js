import React from 'react';
import styles from './UserMenu.css.js';
import { MessageIndicator } from '../../../MessageIndicator/MessageIndicator.js';
import { Menu } from '../Menu/Menu.js';
import { Text } from '../../../Text/Text.js';
import { Avatar } from '../../../Avatar/Avatar.js';

function UserMenu({
  name,
  detail,
  avatar,
  initials,
  actions,
  message,
  onToggle,
  open,
  accessibilityLabel,
  customActivator,
  customWidth
}) {
  const showIndicator = Boolean(message);
  const activatorContentMarkup = customActivator ? customActivator : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: styles.Details
  }, /*#__PURE__*/React.createElement(Text, {
    as: "p",
    variant: "bodySm",
    alignment: "start",
    fontWeight: "medium",
    truncate: true
  }, name), /*#__PURE__*/React.createElement("span", {
    className: styles.Message
  }, /*#__PURE__*/React.createElement(Text, {
    as: "p",
    variant: "bodyXs",
    alignment: "start",
    tone: "text-inverse-secondary",
    truncate: true
  }, detail))), /*#__PURE__*/React.createElement(MessageIndicator, {
    active: showIndicator
  }, /*#__PURE__*/React.createElement(Avatar, {
    size: "md",
    initials: initials && initials.replace(' ', ''),
    source: avatar,
    name: name
  })));
  return /*#__PURE__*/React.createElement(Menu, {
    activatorContent: activatorContentMarkup,
    open: open,
    onOpen: onToggle,
    onClose: onToggle,
    actions: actions,
    message: message,
    accessibilityLabel: accessibilityLabel,
    customWidth: customWidth,
    userMenu: true
  });
}

export { UserMenu };
