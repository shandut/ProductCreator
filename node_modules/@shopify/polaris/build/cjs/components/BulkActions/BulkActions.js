'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var utilities = require('./utilities.js');
var BulkActions_module = require('./BulkActions.css.js');
var BulkActionMenu = require('./components/BulkActionMenu/BulkActionMenu.js');
var CheckableButton = require('../CheckableButton/CheckableButton.js');
var BulkActionsMeasurer = require('./components/BulkActionsMeasurer/BulkActionsMeasurer.js');
var hooks = require('../../utilities/i18n/hooks.js');
var UnstyledButton = require('../UnstyledButton/UnstyledButton.js');
var Text = require('../Text/Text.js');
var BulkActionButton = require('./components/BulkActionButton/BulkActionButton.js');
var Popover = require('../Popover/Popover.js');
var ActionList = require('../ActionList/ActionList.js');
var InlineStack = require('../InlineStack/InlineStack.js');

const BulkActions = /*#__PURE__*/React.forwardRef(function BulkActions({
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
  const i18n = hooks.useI18n();
  const [popoverActive, setPopoverActive] = React.useState(false);
  const [state, setState] = React.useReducer((data, partialData) => {
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
  React.useEffect(() => {
    if (containerWidth === 0 || !promotedActions || promotedActions.length === 0) {
      return;
    }
    const {
      visiblePromotedActions,
      hiddenPromotedActions
    } = utilities.getVisibleAndHiddenActionsIndices(promotedActions, disclosureWidth, actionsWidths, containerWidth);
    setState({
      visiblePromotedActions,
      hiddenPromotedActions,
      hasMeasured: containerWidth !== Infinity
    });
  }, [containerWidth, disclosureWidth, promotedActions, actionsWidths]);
  const activatorLabel = !promotedActions || promotedActions && visiblePromotedActions.length === 0 ? i18n.translate('Polaris.ResourceList.BulkActions.actionsActivatorLabel') : i18n.translate('Polaris.ResourceList.BulkActions.moreActionsActivatorLabel');
  const paginatedSelectAllMarkup = paginatedSelectAllAction ? /*#__PURE__*/React.createElement(UnstyledButton.UnstyledButton, {
    className: BulkActions_module.default.AllAction,
    onClick: paginatedSelectAllAction.onAction,
    size: "slim",
    disabled: disabled
  }, /*#__PURE__*/React.createElement(Text.Text, {
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
  const togglePopover = React.useCallback(() => {
    onMoreActionPopoverToggle?.(popoverActive);
    setPopoverActive(popoverActive => !popoverActive);
  }, [onMoreActionPopoverToggle, popoverActive]);
  const handleMeasurement = React.useCallback(measurements => {
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
    } = utilities.getVisibleAndHiddenActionsIndices(promotedActions, disclosureWidth, actionsWidths, containerWidth);
    setState({
      visiblePromotedActions,
      hiddenPromotedActions,
      actionsWidths,
      containerWidth,
      disclosureWidth,
      hasMeasured: true
    });
  }, [promotedActions]);
  const actionSections = utilities.getActionSections(actions);
  const promotedActionsMarkup = promotedActions ? promotedActions.filter((_, index) => {
    if (!visiblePromotedActions.includes(index)) {
      return false;
    }
    return true;
  }).map((action, index) => {
    if (utilities.instanceOfMenuGroupDescriptor(action)) {
      return /*#__PURE__*/React.createElement(BulkActionMenu.BulkActionMenu, Object.assign({
        key: index
      }, action, {
        isNewBadgeInBadgeActions: utilities.isNewBadgeInBadgeActions(actionSections),
        size: buttonSize
      }));
    }
    return /*#__PURE__*/React.createElement(BulkActionButton.BulkActionButton, Object.assign({
      key: index,
      disabled: disabled
    }, action, {
      size: buttonSize
    }));
  }) : null;
  const hiddenPromotedActionObjects = hiddenPromotedActions.map(index => promotedActions?.[index]);
  const mergedHiddenPromotedActions = hiddenPromotedActionObjects.reduce((memo, action) => {
    if (!action) return memo;
    if (utilities.instanceOfMenuGroupDescriptor(action)) {
      return memo.concat(action.actions);
    }
    return memo.concat(action);
  }, []);
  const hiddenPromotedSection = {
    items: mergedHiddenPromotedActions
  };
  const allHiddenActions = React.useMemo(() => {
    if (actionSections) {
      return actionSections;
    }
    if (!actions) {
      return [];
    }
    let isAFlatArray = true;
    return actions.filter(action => action).reduce((memo, action) => {
      if (utilities.instanceOfBulkActionListSection(action)) {
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
  const activator = /*#__PURE__*/React.createElement(BulkActionButton.BulkActionButton, {
    disclosure: true,
    showContentInButton: !promotedActionsMarkup,
    onAction: togglePopover,
    content: activatorLabel,
    disabled: disabled,
    indicator: utilities.isNewBadgeInBadgeActions(actionSections),
    size: buttonSize
  });
  const actionsMarkup = allHiddenActions.length > 0 ? /*#__PURE__*/React.createElement(Popover.Popover, {
    active: popoverActive,
    activator: activator,
    preferredAlignment: "right",
    onClose: togglePopover
  }, /*#__PURE__*/React.createElement(ActionList.ActionList, {
    sections: hiddenPromotedSection.items.length > 0 ? [hiddenPromotedSection, ...allHiddenActions] : allHiddenActions,
    onActionAnyItem: togglePopover
  })) : null;
  const measurerMarkup = /*#__PURE__*/React.createElement(BulkActionsMeasurer.BulkActionsMeasurer, {
    promotedActions: promotedActions,
    disabled: disabled,
    buttonSize: buttonSize,
    handleMeasurement: handleMeasurement
  });
  return /*#__PURE__*/React.createElement("div", {
    className: BulkActions_module.default.BulkActions,
    style: width ? {
      width
    } : undefined
  }, /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    gap: "400",
    blockAlign: "center"
  }, /*#__PURE__*/React.createElement("div", {
    className: BulkActions_module.default.BulkActionsSelectAllWrapper
  }, /*#__PURE__*/React.createElement(CheckableButton.CheckableButton, checkableButtonProps), paginatedSelectAllMarkup), selectMode ? /*#__PURE__*/React.createElement("div", {
    className: BulkActions_module.default.BulkActionsPromotedActionsWrapper
  }, /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    gap: "100",
    blockAlign: "center"
  }, /*#__PURE__*/React.createElement("div", {
    className: BulkActions_module.default.BulkActionsOuterLayout
  }, measurerMarkup, /*#__PURE__*/React.createElement("div", {
    className: css.classNames(BulkActions_module.default.BulkActionsLayout, !hasMeasured && BulkActions_module.default['BulkActionsLayout--measuring'])
  }, promotedActionsMarkup)), actionsMarkup)) : null));
});

exports.BulkActions = BulkActions;
