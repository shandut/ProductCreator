import React from 'react';
import { useToggle } from '../../../../utilities/use-toggle.js';
import { BulkActionButton } from '../BulkActionButton/BulkActionButton.js';
import { Popover } from '../../../Popover/Popover.js';
import { ActionList } from '../../../ActionList/ActionList.js';

function BulkActionMenu({
  title,
  actions,
  isNewBadgeInBadgeActions,
  size
}) {
  const {
    value: isVisible,
    toggle: toggleMenuVisibility
  } = useToggle(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Popover, {
    active: isVisible,
    activator: /*#__PURE__*/React.createElement(BulkActionButton, {
      disclosure: true,
      showContentInButton: true,
      onAction: toggleMenuVisibility,
      content: title,
      indicator: isNewBadgeInBadgeActions,
      size: size
    }),
    onClose: toggleMenuVisibility,
    preferInputActivator: true
  }, /*#__PURE__*/React.createElement(ActionList, {
    items: actions,
    onActionAnyItem: toggleMenuVisibility
  })));
}

export { BulkActionMenu };
