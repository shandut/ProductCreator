'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var Menu_module = require('./Menu.css.js');
var Message = require('./components/Message/Message.js');
var Popover = require('../../../Popover/Popover.js');
var Box = require('../../../Box/Box.js');
var ActionList = require('../../../ActionList/ActionList.js');

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
  const messageMarkup = message && /*#__PURE__*/React.createElement(Message.Message, {
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
  return /*#__PURE__*/React.createElement(Popover.Popover, {
    activator: /*#__PURE__*/React.createElement("div", {
      className: Menu_module.default.ActivatorWrapper
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: css.classNames(Menu_module.default.Activator, userMenu && Menu_module.default['Activator-userMenu']),
      onClick: onOpen,
      "aria-label": accessibilityLabel
    }, activatorContent)),
    active: open,
    onClose: onClose,
    fixed: true,
    fullHeight: true,
    preferredAlignment: "right"
  }, /*#__PURE__*/React.createElement("div", {
    className: Menu_module.default.MenuItems
  }, /*#__PURE__*/React.createElement(Box.Box, {
    width: customWidth
  }, /*#__PURE__*/React.createElement(ActionList.ActionList, {
    actionRole: "menuitem",
    onActionAnyItem: onClose,
    sections: actions
  }), messageMarkup)));
}

exports.Menu = Menu;
