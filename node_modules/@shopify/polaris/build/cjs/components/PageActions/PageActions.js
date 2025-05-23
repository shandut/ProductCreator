'use strict';

var React = require('react');
var isInterface = require('../../utilities/is-interface.js');
var isReactElement = require('../../utilities/is-react-element.js');
var PageActions_module = require('./PageActions.css.js');
var utils = require('../Button/utils.js');
var ButtonGroup = require('../ButtonGroup/ButtonGroup.js');
var LegacyStack = require('../LegacyStack/LegacyStack.js');

function PageActions({
  primaryAction,
  secondaryActions
}) {
  let primaryActionMarkup = null;
  if (isReactElement.isReactElement(primaryAction)) {
    primaryActionMarkup = /*#__PURE__*/React.createElement(React.Fragment, null, primaryAction);
  } else if (primaryAction) {
    primaryActionMarkup = utils.buttonsFrom(primaryAction, {
      variant: 'primary'
    });
  }
  let secondaryActionsMarkup = null;
  if (isInterface.isInterface(secondaryActions) && secondaryActions.length > 0) {
    secondaryActionsMarkup = /*#__PURE__*/React.createElement(ButtonGroup.ButtonGroup, null, utils.buttonsFrom(secondaryActions));
  } else if (isReactElement.isReactElement(secondaryActions)) {
    secondaryActionsMarkup = /*#__PURE__*/React.createElement(React.Fragment, null, secondaryActions);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: PageActions_module.default.PageActions
  }, /*#__PURE__*/React.createElement(LegacyStack.LegacyStack, {
    distribution: "trailing",
    spacing: "tight"
  }, secondaryActionsMarkup, primaryActionMarkup));
}

exports.PageActions = PageActions;
