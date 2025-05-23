'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var useToggle = require('../../../../utilities/use-toggle.js');
var RollupActions_module = require('./RollupActions.css.js');
var hooks = require('../../../../utilities/i18n/hooks.js');
var Button = require('../../../Button/Button.js');
var Popover = require('../../../Popover/Popover.js');
var ActionList = require('../../../ActionList/ActionList.js');

function RollupActions({
  accessibilityLabel,
  items = [],
  sections = []
}) {
  const i18n = hooks.useI18n();
  const {
    value: rollupOpen,
    toggle: toggleRollupOpen
  } = useToggle.useToggle(false);
  if (items.length === 0 && sections.length === 0) {
    return null;
  }
  const activatorMarkup = /*#__PURE__*/React.createElement("div", {
    className: RollupActions_module.default.RollupActivator
  }, /*#__PURE__*/React.createElement(Button.Button, {
    icon: polarisIcons.MenuHorizontalIcon,
    accessibilityLabel: accessibilityLabel || i18n.translate('Polaris.ActionMenu.RollupActions.rollupButton'),
    onClick: toggleRollupOpen
  }));
  return /*#__PURE__*/React.createElement(Popover.Popover, {
    active: rollupOpen,
    activator: activatorMarkup,
    preferredAlignment: "right",
    onClose: toggleRollupOpen,
    hideOnPrint: true
  }, /*#__PURE__*/React.createElement(ActionList.ActionList, {
    items: items,
    sections: sections,
    onActionAnyItem: toggleRollupOpen
  }));
}

exports.RollupActions = RollupActions;
