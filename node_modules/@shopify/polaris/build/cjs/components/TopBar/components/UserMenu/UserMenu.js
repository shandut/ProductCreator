'use strict';

var React = require('react');
var UserMenu_module = require('./UserMenu.css.js');
var MessageIndicator = require('../../../MessageIndicator/MessageIndicator.js');
var Menu = require('../Menu/Menu.js');
var Text = require('../../../Text/Text.js');
var Avatar = require('../../../Avatar/Avatar.js');

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
    className: UserMenu_module.default.Details
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "p",
    variant: "bodySm",
    alignment: "start",
    fontWeight: "medium",
    truncate: true
  }, name), /*#__PURE__*/React.createElement("span", {
    className: UserMenu_module.default.Message
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "p",
    variant: "bodyXs",
    alignment: "start",
    tone: "text-inverse-secondary",
    truncate: true
  }, detail))), /*#__PURE__*/React.createElement(MessageIndicator.MessageIndicator, {
    active: showIndicator
  }, /*#__PURE__*/React.createElement(Avatar.Avatar, {
    size: "md",
    initials: initials && initials.replace(' ', ''),
    source: avatar,
    name: name
  })));
  return /*#__PURE__*/React.createElement(Menu.Menu, {
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

exports.UserMenu = UserMenu;
