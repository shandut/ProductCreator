import React, { forwardRef, useState, useReducer, useEffect, useCallback, useMemo } from 'react';
import { classNames } from '../../utilities/css.js';
import { getVisibleAndHiddenActionsIndices, getActionSections, instanceOfMenuGroupDescriptor, isNewBadgeInBadgeActions, instanceOfBulkActionListSection } from './utilities.js';
import styles from './BulkActions.css.js';
import { BulkActionMenu } from './components/BulkActionMenu/BulkActionMenu.js';
import { CheckableButton } from '../CheckableButton/CheckableButton.js';
import { BulkActionsMeasurer } from './components/BulkActionsMeasurer/BulkActionsMeasurer.js';
import { useI18n } from '../../utilities/i18n/hooks.js';
import { UnstyledButton } from '../UnstyledButton/UnstyledButton.js';
import { Text } from '../Text/Text.js';
import { BulkActionButton } from './components/BulkActionButton/BulkActionButton.js';
import { Popover } from '../Popover/Popover.js';
import { ActionList } from '../ActionList/ActionList.js';
import { InlineStack } from '../InlineStack/InlineStack.js';

const BulkActions = /*#__PURE__*/forwardRef(function BulkActions({
  promotedActions,
  actions,
  disabled,
  buttonSize,
  paginatedSelectAllAction,
  paginatedSelectAllText,
  label,
  accessibilityLabel,
  selected,
  onToggleAll,
  onMoreActionPopoverToggle,
  width,
  selectMode
}, ref) {
  const i18n = useI18n();
  const [popoverActive, setPopoverActive] = useState(false);
  const [state, setState] = useReducer((data, partialData) => {
    return {
      ...data,
      ...partialData
    };
  }, {
    disclosureWidth: 0,
    containerWidth: Infinity,
    actionsWidths: [],
    visiblePromotedActions: [],
    hiddenPromotedActions: [],
    hasMeasured: false
  });
  const {
    visiblePromotedActions,
    hiddenPromotedActions,
    containerWidth,
    disclosureWidth,
    actionsWidths,
    hasMeasured
  } = state;
  useEffect(() => {
    if (containerWidth === 0 || !promotedActions || promotedActions.length === 0) {
      return;
    }
    const {
      visiblePromotedActions,
      hiddenPromotedActions
    } = getVisibleAndHiddenActionsIndices(promotedActions, disclosureWidth, actionsWidths, containerWidth);
    setState({
      visiblePromotedActions,
      hiddenPromotedActions,
      hasMeasured: containerWidth !== Infinity
    });
  }, [containerWidth, disclosureWidth, promotedActions, actionsWidths]);
  const activatorLabel = !promotedActions || promotedActions && visiblePromotedActions.length === 0 ? i18n.translate('Polaris.ResourceList.BulkActions.actionsActivatorLabel') : i18n.translate('Polaris.ResourceList.BulkActions.moreActionsActivatorLabel');
  const paginatedSelectAllMarkup = paginatedSelectAllAction ? /*#__PURE__*/React.createElement(UnstyledButton, {
    className: styles.AllAction,
    onClick: paginatedSelectAllAction.onAction,
    size: "slim",
    disabled: disabled
  }, /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "bodySm",
    fontWeight: "medium"
  }, paginatedSelectAllAction.content)) : null;
  const hasTextAndAction = paginatedSelectAllText && paginatedSelectAllAction;
  const ariaLive = hasTextAndAction ? 'polite' : undefined;
  const checkableButtonProps = {
    accessibilityLabel,
    label: hasTextAndAction ? paginatedSelectAllText : label,
    selected,
    onToggleAll,
    disabled,
    ariaLive,
    ref
  };
  const togglePopover = useCallback(() => {
    onMoreActionPopoverToggle?.(popoverActive);
    setPopoverActive(popoverActive => !popoverActive);
  }, [onMoreActionPopoverToggle, popoverActive]);
  const handleMeasurement = useCallback(measurements => {
    const {
      hiddenActionsWidths: actionsWidths,
      containerWidth,
      disclosureWidth
    } = measurements;
    if (!promotedActions || promotedActions.length === 0) {
      return;
    }
    const {
      visiblePromotedActions,
      hiddenPromotedActions
    } = getVisibleAndHiddenActionsIndices(promotedActions, disclosureWidth, actionsWidths, containerWidth);
    setState({
      visiblePromotedActions,
      hiddenPromotedActions,
      actionsWidths,
      containerWidth,
      disclosureWidth,
      hasMeasured: true
    });
  }, [promotedActions]);
  const actionSections = getActionSections(actions);
  const promotedActionsMarkup = promotedActions ? promotedActions.filter((_, index) => {
    if (!visiblePromotedActions.includes(index)) {
      return false;
    }
    return true;
  }).map((action, index) => {
    if (instanceOfMenuGroupDescriptor(action)) {
      return /*#__PURE__*/React.createElement(BulkActionMenu, Object.assign({
        key: index
      }, action, {
        isNewBadgeInBadgeActions: isNewBadgeInBadgeActions(actionSections),
        size: buttonSize
      }));
    }
    return /*#__PURE__*/React.createElement(BulkActionButton, Object.assign({
      key: index,
      disabled: disabled
    }, action, {
      size: buttonSize
    }));
  }) : null;
  const hiddenPromotedActionObjects = hiddenPromotedActions.map(index => promotedActions?.[index]);
  const mergedHiddenPromotedActions = hiddenPromotedActionObjects.reduce((memo, action) => {
    if (!action) return memo;
    if (instanceOfMenuGroupDescriptor(action)) {
      return memo.concat(action.actions);
    }
    return memo.concat(action);
  }, []);
  const hiddenPromotedSection = {
    items: mergedHiddenPromotedActions
  };
  const allHiddenActions = useMemo(() => {
    if (actionSections) {
      return actionSections;
    }
    if (!actions) {
      return [];
    }
    let isAFlatArray = true;
    return actions.filter(action => action).reduce((memo, action) => {
      if (instanceOfBulkActionListSection(action)) {
        isAFlatArray = false;
        return memo.concat(action);
      }
      if (isAFlatArray) {
        if (memo.length === 0) {
          return [{
            items: [action]
          }];
        }
        const lastItem = memo[memo.length - 1];
        memo.splice(memo.length - 1, 1, {
          items: [...lastItem.items, action]
        });
        return memo;
      }
      isAFlatArray = true;
      return memo.concat({
        items: [action]
      });
    }, []);
  }, [actions, actionSections]);
  const activator = /*#__PURE__*/React.createElement(BulkActionButton, {
    disclosure: true,
    showContentInButton: !promotedActionsMarkup,
    onAction: togglePopover,
    content: activatorLabel,
    disabled: disabled,
    indicator: isNewBadgeInBadgeActions(actionSections),
    size: buttonSize
  });
  const actionsMarkup = allHiddenActions.length > 0 ? /*#__PURE__*/React.createElement(Popover, {
    active: popoverActive,
    activator: activator,
    preferredAlignment: "right",
    onClose: togglePopover
  }, /*#__PURE__*/React.createElement(ActionList, {
    sections: hiddenPromotedSection.items.length > 0 ? [hiddenPromotedSection, ...allHiddenActions] : allHiddenActions,
    onActionAnyItem: togglePopover
  })) : null;
  const measurerMarkup = /*#__PURE__*/React.createElement(BulkActionsMeasurer, {
    promotedActions: promotedActions,
    disabled: disabled,
    buttonSize: buttonSize,
    handleMeasurement: handleMeasurement
  });
  return /*#__PURE__*/React.createElement("div", {
    className: styles.BulkActions,
    style: width ? {
      width
    } : undefined
  }, /*#__PURE__*/React.createElement(InlineStack, {
    gap: "400",
    blockAlign: "center"
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.BulkActionsSelectAllWrapper
  }, /*#__PURE__*/React.createElement(CheckableButton, checkableButtonProps), paginatedSelectAllMarkup), selectMode ? /*#__PURE__*/React.createElement("div", {
    className: styles.BulkActionsPromotedActionsWrapper
  }, /*#__PURE__*/React.createElement(InlineStack, {
    gap: "100",
    blockAlign: "center"
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.BulkActionsOuterLayout
  }, measurerMarkup, /*#__PURE__*/React.createElement("div", {
    className: classNames(styles.BulkActionsLayout, !hasMeasured && styles['BulkActionsLayout--measuring'])
  }, promotedActionsMarkup)), actionsMarkup)) : null));
});

export { BulkActions };
