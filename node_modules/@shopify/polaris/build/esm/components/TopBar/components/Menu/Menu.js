import React from 'react';
import { classNames } from '../../../../utilities/css.js';
import styles from './Menu.css.js';
import { Message } from './components/Message/Message.js';
import { Popover } from '../../../Popover/Popover.js';
import { Box } from '../../../Box/Box.js';
import { ActionList } from '../../../ActionList/ActionList.js';

function Menu(props) {
  const {
    actions,
    onOpen,
    onClose,
    open,
    activatorContent,
    message,
    accessibilityLabel,
    customWidth,
    userMenu
  } = props;
  const badgeProps = message && message.badge && {
    content: message.badge.content,
    tone: message.badge.tone
  };
  const messageMarkup = message && /*#__PURE__*/React.createElement(Message, {
    title: message.title,
    description: message.description,
    action: {
      onClick: message.action.onClick,
      content: message.action.content
    },
    link: {
      to: message.link.to,
      content: message.link.content
    },
    badge: badgeProps
  });
  return /*#__PURE__*/React.createElement(Popover, {
    activator: /*#__PURE__*/React.createElement("div", {
      className: styles.ActivatorWrapper
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: classNames(styles.Activator, userMenu && styles['Activator-userMenu']),
      onClick: onOpen,
      "aria-label": accessibilityLabel
    }, activatorContent)),
    active: open,
    onClose: onClose,
    fixed: true,
    fullHeight: true,
    preferredAlignment: "right"
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.MenuItems
  }, /*#__PURE__*/React.createElement(Box, {
    width: customWidth
  }, /*#__PURE__*/React.createElement(ActionList, {
    actionRole: "menuitem",
    onActionAnyItem: onClose,
    sections: actions
  }), messageMarkup)));
}

export { Menu };
