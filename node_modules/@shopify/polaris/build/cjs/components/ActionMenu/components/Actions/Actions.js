'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var Actions_module = require('./Actions.css.js');
var utilities = require('./utilities.js');
var MenuGroup = require('../MenuGroup/MenuGroup.js');
var ActionsMeasurer = require('./components/ActionsMeasurer/ActionsMeasurer.js');
var hooks = require('../../../../utilities/i18n/hooks.js');
var SecondaryAction = require('../SecondaryAction/SecondaryAction.js');

function Actions({
  actions,
  groups,
  onActionRollup
}) {
  const i18n = hooks.useI18n();
  const rollupActiveRef = React.useRef(null);
  const [activeMenuGroup, setActiveMenuGroup] = React.useState(undefined);
  const [state, setState] = React.useReducer((data, partialData) => {
    return {
      ...data,
      ...partialData
    };
  }, {
    disclosureWidth: 0,
    containerWidth: Infinity,
    actionsWidths: [],
    visibleActions: [],
    hiddenActions: [],
    visibleGroups: [],
    hiddenGroups: [],
    hasMeasured: false
  });
  const {
    visibleActions,
    hiddenActions,
    visibleGroups,
    hiddenGroups,
    containerWidth,
    disclosureWidth,
    actionsWidths,
    hasMeasured
  } = state;
  const defaultRollupGroup = {
    title: i18n.translate('Polaris.ActionMenu.Actions.moreActions'),
    actions: []
  };
  const handleMenuGroupToggle = React.useCallback(group => setActiveMenuGroup(activeMenuGroup ? undefined : group), [activeMenuGroup]);
  const handleMenuGroupClose = React.useCallback(() => setActiveMenuGroup(undefined), []);
  React.useEffect(() => {
    if (containerWidth === 0) {
      return;
    }
    const {
      visibleActions,
      visibleGroups,
      hiddenActions,
      hiddenGroups
    } = utilities.getVisibleAndHiddenActionsIndices(actions, groups, disclosureWidth, actionsWidths, containerWidth);
    setState({
      visibleActions,
      visibleGroups,
      hiddenActions,
      hiddenGroups,
      hasMeasured: containerWidth !== Infinity
    });
  }, [containerWidth, disclosureWidth, actions, groups, actionsWidths, setState]);
  const actionsOrDefault = React.useMemo(() => actions ?? [], [actions]);
  const groupsOrDefault = React.useMemo(() => groups ?? [], [groups]);
  const actionsMarkup = actionsOrDefault.filter((_, index) => {
    if (!visibleActions.includes(index)) {
      return false;
    }
    return true;
  }).map(action => {
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
  const groupsToFilter = hiddenGroups.length > 0 || hiddenActions.length > 0 ? [...groupsOrDefault, defaultRollupGroup] : [...groupsOrDefault];
  const filteredGroups = groupsToFilter.filter((group, index) => {
    const hasNoGroupsProp = groupsOrDefault.length === 0;
    const isVisibleGroup = visibleGroups.includes(index);
    const isDefaultGroup = group === defaultRollupGroup;
    if (hasNoGroupsProp) {
      return hiddenActions.length > 0;
    }
    if (isDefaultGroup) {
      return true;
    }
    return isVisibleGroup;
  });
  const hiddenActionObjects = hiddenActions.map(index => actionsOrDefault[index]).filter(action => action != null);
  const hiddenGroupObjects = hiddenGroups.map(index => groupsOrDefault[index]).filter(group => group != null);
  const groupsMarkup = filteredGroups.map(group => {
    const {
      title,
      actions: groupActions,
      ...rest
    } = group;
    const isDefaultGroup = group === defaultRollupGroup;
    const allHiddenItems = [...hiddenActionObjects, ...hiddenGroupObjects];
    const [finalRolledUpActions, finalRolledUpSectionGroups] = allHiddenItems.reduce(([actions, sections], action) => {
      if (isMenuGroup(action)) {
        sections.push({
          title: action.title,
          items: action.actions.map(sectionAction => ({
            ...sectionAction,
            disabled: action.disabled || sectionAction.disabled
          }))
        });
      } else {
        actions.push(action);
      }
      return [actions, sections];
    }, [[], []]);
    if (!isDefaultGroup) {
      // Render a normal MenuGroup with just its actions
      return /*#__PURE__*/React.createElement(MenuGroup.MenuGroup, Object.assign({
        key: title,
        title: title,
        active: title === activeMenuGroup,
        actions: groupActions
      }, rest, {
        onOpen: handleMenuGroupToggle,
        onClose: handleMenuGroupClose
      }));
    }
    return /*#__PURE__*/React.createElement(MenuGroup.MenuGroup, Object.assign({
      key: title,
      title: title,
      active: title === activeMenuGroup,
      actions: [...finalRolledUpActions, ...groupActions],
      sections: finalRolledUpSectionGroups
    }, rest, {
      onOpen: handleMenuGroupToggle,
      onClose: handleMenuGroupClose
    }));
  });
  const handleMeasurement = React.useCallback(measurements => {
    const {
      hiddenActionsWidths: actionsWidths,
      containerWidth,
      disclosureWidth
    } = measurements;
    const {
      visibleActions,
      hiddenActions,
      visibleGroups,
      hiddenGroups
    } = utilities.getVisibleAndHiddenActionsIndices(actionsOrDefault, groupsOrDefault, disclosureWidth, actionsWidths, containerWidth);
    if (onActionRollup) {
      const isRollupActive = hiddenActions.length > 0 || hiddenGroups.length > 0;
      if (rollupActiveRef.current !== isRollupActive) {
        onActionRollup(isRollupActive);
        rollupActiveRef.current = isRollupActive;
      }
    }
    setState({
      visibleActions,
      hiddenActions,
      visibleGroups,
      hiddenGroups,
      actionsWidths,
      containerWidth,
      disclosureWidth,
      hasMeasured: true
    });
  }, [actionsOrDefault, groupsOrDefault, onActionRollup]);
  const actionsMeasurer = /*#__PURE__*/React.createElement(ActionsMeasurer.ActionsMeasurer, {
    actions: actions,
    groups: groups,
    handleMeasurement: handleMeasurement
  });
  return /*#__PURE__*/React.createElement("div", {
    className: Actions_module.default.ActionsLayoutOuter
  }, actionsMeasurer, /*#__PURE__*/React.createElement("div", {
    className: css.classNames(Actions_module.default.ActionsLayout, !hasMeasured && Actions_module.default['ActionsLayout--measuring'])
  }, actionsMarkup, groupsMarkup));
}
function isMenuGroup(actionOrMenuGroup) {
  return 'title' in actionOrMenuGroup;
}

exports.Actions = Actions;
