import React from 'react';
import { MenuHorizontalIcon } from '@shopify/polaris-icons';
import { useToggle } from '../../../../utilities/use-toggle.js';
import styles from './RollupActions.css.js';
import { useI18n } from '../../../../utilities/i18n/hooks.js';
import { Button } from '../../../Button/Button.js';
import { Popover } from '../../../Popover/Popover.js';
import { ActionList } from '../../../ActionList/ActionList.js';

function RollupActions({
  accessibilityLabel,
  items = [],
  sections = []
}) {
  const i18n = useI18n();
  const {
    value: rollupOpen,
    toggle: toggleRollupOpen
  } = useToggle(false);
  if (items.length === 0 && sections.length === 0) {
    return null;
  }
  const activatorMarkup = /*#__PURE__*/React.createElement("div", {
    className: styles.RollupActivator
  }, /*#__PURE__*/React.createElement(Button, {
    icon: MenuHorizontalIcon,
    accessibilityLabel: accessibilityLabel || i18n.translate('Polaris.ActionMenu.RollupActions.rollupButton'),
    onClick: toggleRollupOpen
  }));
  return /*#__PURE__*/React.createElement(Popover, {
    active: rollupOpen,
    activator: activatorMarkup,
    preferredAlignment: "right",
    onClose: toggleRollupOpen,
    hideOnPrint: true
  }, /*#__PURE__*/React.createElement(ActionList, {
    items: items,
    sections: sections,
    onActionAnyItem: toggleRollupOpen
  }));
}

export { RollupActions };
