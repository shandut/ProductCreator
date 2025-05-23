'use strict';

var React = require('react');
var MenuGroup_module = require('./MenuGroup.css.js');
var Popover = require('../../../Popover/Popover.js');
var ActionList = require('../../../ActionList/ActionList.js');
var SecondaryAction = require('../SecondaryAction/SecondaryAction.js');

function MenuGroup({
  accessibilityLabel,
  active,
  actions,
  details,
  title,
  icon,
  disabled,
  onClick,
  onClose,
  onOpen,
  sections
}) {
  const handleClose = React.useCallback(() => {
    onClose(title);
  }, [onClose, title]);
  const handleOpen = React.useCallback(() => {
    onOpen(title);
  }, [onOpen, title]);
  const handleClick = React.useCallback(() => {
    if (onClick) {
      onClick(handleOpen);
    } else {
      handleOpen();
    }
  }, [onClick, handleOpen]);
  const popoverActivator = /*#__PURE__*/React.createElement(SecondaryAction.SecondaryAction, {
    disclosure: true,
    disabled: disabled,
    icon: icon,
    accessibilityLabel: accessibilityLabel,
    onClick: handleClick
  }, title);
  return /*#__PURE__*/React.createElement(Popover.Popover, {
    active: Boolean(active),
    activator: popoverActivator,
    preferredAlignment: "left",
    onClose: handleClose,
    hideOnPrint: true
  }, /*#__PURE__*/React.createElement(ActionList.ActionList, {
    items: actions,
    sections: sections,
    onActionAnyItem: handleClose
  }), details && /*#__PURE__*/React.createElement("div", {
    className: MenuGroup_module.default.Details
  }, details));
}

exports.MenuGroup = MenuGroup;
