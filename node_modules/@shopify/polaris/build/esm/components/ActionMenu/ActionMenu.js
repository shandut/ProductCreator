import React from 'react';
import { classNames } from '../../utilities/css.js';
import styles from './ActionMenu.css.js';
import { RollupActions } from './components/RollupActions/RollupActions.js';
import { Actions } from './components/Actions/Actions.js';

function ActionMenu({
  actions = [],
  groups = [],
  rollup,
  rollupActionsLabel,
  onActionRollup
}) {
  if (actions.length === 0 && groups.length === 0) {
    return null;
  }
  const actionMenuClassNames = classNames(styles.ActionMenu, rollup && styles.rollup);
  const rollupSections = groups.map(group => convertGroupToSection(group));
  return /*#__PURE__*/React.createElement("div", {
    className: actionMenuClassNames
  }, rollup ? /*#__PURE__*/React.createElement(RollupActions, {
    accessibilityLabel: rollupActionsLabel,
    items: actions,
    sections: rollupSections
  }) : /*#__PURE__*/React.createElement(Actions, {
    actions: actions,
    groups: groups,
    onActionRollup: onActionRollup
  }));
}
function hasGroupsWithActions(groups = []) {
  return groups.length === 0 ? false : groups.some(group => group.actions.length > 0);
}
function convertGroupToSection({
  title,
  actions,
  disabled
}) {
  return {
    title,
    items: actions.map(action => ({
      ...action,
      disabled: disabled || action.disabled
    }))
  };
}

export { ActionMenu, hasGroupsWithActions };
