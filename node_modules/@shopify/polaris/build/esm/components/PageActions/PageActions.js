import React from 'react';
import { isInterface } from '../../utilities/is-interface.js';
import { isReactElement } from '../../utilities/is-react-element.js';
import styles from './PageActions.css.js';
import { buttonsFrom } from '../Button/utils.js';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup.js';
import { LegacyStack } from '../LegacyStack/LegacyStack.js';

function PageActions({
  primaryAction,
  secondaryActions
}) {
  let primaryActionMarkup = null;
  if (isReactElement(primaryAction)) {
    primaryActionMarkup = /*#__PURE__*/React.createElement(React.Fragment, null, primaryAction);
  } else if (primaryAction) {
    primaryActionMarkup = buttonsFrom(primaryAction, {
      variant: 'primary'
    });
  }
  let secondaryActionsMarkup = null;
  if (isInterface(secondaryActions) && secondaryActions.length > 0) {
    secondaryActionsMarkup = /*#__PURE__*/React.createElement(ButtonGroup, null, buttonsFrom(secondaryActions));
  } else if (isReactElement(secondaryActions)) {
    secondaryActionsMarkup = /*#__PURE__*/React.createElement(React.Fragment, null, secondaryActions);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: styles.PageActions
  }, /*#__PURE__*/React.createElement(LegacyStack, {
    distribution: "trailing",
    spacing: "tight"
  }, secondaryActionsMarkup, primaryActionMarkup));
}

export { PageActions };
