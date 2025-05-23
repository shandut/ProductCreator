'use strict';

var React = require('react');
var useEventListener = require('../../../../../../utilities/use-event-listener.js');
var Actions_module = require('../../Actions.css.js');
var hooks = require('../../../../../../utilities/i18n/hooks.js');
var SecondaryAction = require('../../../SecondaryAction/SecondaryAction.js');

const ACTION_SPACING = 8;
function ActionsMeasurer({
  actions = [],
  groups = [],
  handleMeasurement: handleMeasurementProp
}) {
  const i18n = hooks.useI18n();
  const containerNode = React.useRef(null);
  const defaultRollupGroup = {
    title: i18n.translate('Polaris.ActionMenu.Actions.moreActions'),
    actions: []
  };
  const activator = /*#__PURE__*/React.createElement(SecondaryAction.SecondaryAction, {
    disclosure: true
  }, defaultRollupGroup.title);
  const handleMeasurement = React.useCallback(() => {
    if (!containerNode.current) {
      return;
    }
    const containerWidth = containerNode.current.offsetWidth;
    const hiddenActionNodes = containerNode.current.children;
    const hiddenActionNodesArray = Array.from(hiddenActionNodes);
    const hiddenActionsWidths = hiddenActionNodesArray.map(node => {
      const buttonWidth = Math.ceil(node.getBoundingClientRect().width);
      return buttonWidth + ACTION_SPACING;
    });
    const disclosureWidth = hiddenActionsWidths.pop() || 0;
    handleMeasurementProp({
      containerWidth,
      disclosureWidth,
      hiddenActionsWidths
    });
  }, [handleMeasurementProp]);
  React.useEffect(() => {
    handleMeasurement();
  }, [handleMeasurement, actions, groups]);
  const actionsMarkup = actions.map(action => {
    const {
      content,
      onAction,
      ...rest
    } = action;
    return /*#__PURE__*/React.createElement(SecondaryAction.SecondaryAction, Object.assign({
      key: content,
      onClick: onAction
    }, rest), content);
  });
  const groupsMarkup = groups.map(group => {
    const {
      title,
      icon
    } = group;
    return /*#__PURE__*/React.createElement(SecondaryAction.SecondaryAction, {
      key: title,
      disclosure: true,
      icon: icon
    }, title);
  });
  useEventListener.useEventListener('resize', handleMeasurement);
  return /*#__PURE__*/React.createElement("div", {
    className: Actions_module.default.ActionsLayoutMeasurer,
    ref: containerNode
  }, actionsMarkup, groupsMarkup, activator);
}

exports.ActionsMeasurer = ActionsMeasurer;
