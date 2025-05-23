import React, { useCallback } from 'react';
import styles from './MenuGroup.css.js';
import { Popover } from '../../../Popover/Popover.js';
import { ActionList } from '../../../ActionList/ActionList.js';
import { SecondaryAction } from '../SecondaryAction/SecondaryAction.js';

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
  const handleClose = useCallback(() => {
    onClose(title);
  }, [onClose, title]);
  const handleOpen = useCallback(() => {
    onOpen(title);
  }, [onOpen, title]);
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(handleOpen);
    } else {
      handleOpen();
    }
  }, [onClick, handleOpen]);
  const popoverActivator = /*#__PURE__*/React.createElement(SecondaryAction, {
    disclosure: true,
    disabled: disabled,
    icon: icon,
    accessibilityLabel: accessibilityLabel,
    onClick: handleClick
  }, title);
  return /*#__PURE__*/React.createElement(Popover, {
    active: Boolean(active),
    activator: popoverActivator,
    preferredAlignment: "left",
    onClose: handleClose,
    hideOnPrint: true
  }, /*#__PURE__*/React.createElement(ActionList, {
    items: actions,
    sections: sections,
    onActionAnyItem: handleClose
  }), details && /*#__PURE__*/React.createElement("div", {
    className: styles.Details
  }, details));
}

export { MenuGroup };
