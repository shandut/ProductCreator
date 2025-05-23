'use strict';

var React = require('react');
var useEventListener = require('../../../../utilities/use-event-listener.js');
var BulkActions_module = require('../../BulkActions.css.js');
var utilities = require('../../utilities.js');
var hooks = require('../../../../utilities/i18n/hooks.js');
var BulkActionButton = require('../BulkActionButton/BulkActionButton.js');

const ACTION_SPACING = 4;
function BulkActionsMeasurer({
  promotedActions = [],
  disabled,
  buttonSize,
  handleMeasurement: handleMeasurementProp
}) {
  const i18n = hooks.useI18n();
  const containerNode = React.useRef(null);
  const activatorLabel = i18n.translate('Polaris.ResourceList.BulkActions.moreActionsActivatorLabel');
  const activator = /*#__PURE__*/React.createElement(BulkActionButton.BulkActionButton, {
    disclosure: true,
    content: activatorLabel
  });
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
  }, [handleMeasurement, promotedActions]);
  const promotedActionsMarkup = promotedActions.map((action, index) => {
    if (utilities.instanceOfMenuGroupDescriptor(action)) {
      return /*#__PURE__*/React.createElement(BulkActionButton.BulkActionButton, {
        key: index,
        disclosure: true,
        showContentInButton: true,
        content: action.title,
        size: buttonSize
      });
    }
    return /*#__PURE__*/React.createElement(BulkActionButton.BulkActionButton, Object.assign({
      key: index,
      disabled: disabled
    }, action, {
      size: buttonSize
    }));
  });
  useEventListener.useEventListener('resize', handleMeasurement);
  return /*#__PURE__*/React.createElement("div", {
    className: BulkActions_module.default.BulkActionsMeasurerLayout,
    ref: containerNode
  }, promotedActionsMarkup, activator);
}

exports.BulkActionsMeasurer = BulkActionsMeasurer;
