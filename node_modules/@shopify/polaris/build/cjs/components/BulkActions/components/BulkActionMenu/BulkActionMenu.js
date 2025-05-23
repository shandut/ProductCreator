'use strict';

var React = require('react');
var useToggle = require('../../../../utilities/use-toggle.js');
var BulkActionButton = require('../BulkActionButton/BulkActionButton.js');
var Popover = require('../../../Popover/Popover.js');
var ActionList = require('../../../ActionList/ActionList.js');

function BulkActionMenu({
  title,
  actions,
  isNewBadgeInBadgeActions,
  size
}) {
  const {
    value: isVisible,
    toggle: toggleMenuVisibility
  } = useToggle.useToggle(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Popover.Popover, {
    active: isVisible,
    activator: /*#__PURE__*/React.createElement(BulkActionButton.BulkActionButton, {
      disclosure: true,
      showContentInButton: true,
      onAction: toggleMenuVisibility,
      content: title,
      indicator: isNewBadgeInBadgeActions,
      size: size
    }),
    onClose: toggleMenuVisibility,
    preferInputActivator: true
  }, /*#__PURE__*/React.createElement(ActionList.ActionList, {
    items: actions,
    onActionAnyItem: toggleMenuVisibility
  })));
}

exports.BulkActionMenu = BulkActionMenu;
