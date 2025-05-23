import React, { useRef, useCallback, useEffect } from 'react';
import { useEventListener } from '../../../../utilities/use-event-listener.js';
import styles from '../../BulkActions.css.js';
import { instanceOfMenuGroupDescriptor } from '../../utilities.js';
import { useI18n } from '../../../../utilities/i18n/hooks.js';
import { BulkActionButton } from '../BulkActionButton/BulkActionButton.js';

const ACTION_SPACING = 4;
function BulkActionsMeasurer({
  promotedActions = [],
  disabled,
  buttonSize,
  handleMeasurement: handleMeasurementProp
}) {
  const i18n = useI18n();
  const containerNode = useRef(null);
  const activatorLabel = i18n.translate('Polaris.ResourceList.BulkActions.moreActionsActivatorLabel');
  const activator = /*#__PURE__*/React.createElement(BulkActionButton, {
    disclosure: true,
    content: activatorLabel
  });
  const handleMeasurement = useCallback(() => {
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
  useEffect(() => {
    handleMeasurement();
  }, [handleMeasurement, promotedActions]);
  const promotedActionsMarkup = promotedActions.map((action, index) => {
    if (instanceOfMenuGroupDescriptor(action)) {
      return /*#__PURE__*/React.createElement(BulkActionButton, {
        key: index,
        disclosure: true,
        showContentInButton: true,
        content: action.title,
        size: buttonSize
      });
    }
    return /*#__PURE__*/React.createElement(BulkActionButton, Object.assign({
      key: index,
      disabled: disabled
    }, action, {
      size: buttonSize
    }));
  });
  useEventListener('resize', handleMeasurement);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.BulkActionsMeasurerLayout,
    ref: containerNode
  }, promotedActionsMarkup, activator);
}

export { BulkActionsMeasurer };
