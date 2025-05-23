function getVisibleAndHiddenActionsIndices(promotedActions = [], disclosureWidth, actionsWidths, containerWidth) {
  const sumTabWidths = actionsWidths.reduce((sum, width) => sum + width, 0);
  const arrayOfPromotedActionsIndices = promotedActions.map((_, index) => {
    return index;
  });
  const visiblePromotedActions = [];
  const hiddenPromotedActions = [];
  if (containerWidth > sumTabWidths) {
    visiblePromotedActions.push(...arrayOfPromotedActionsIndices);
  } else {
    let accumulatedWidth = 0;
    let hasReturned = false;
    arrayOfPromotedActionsIndices.forEach(currentPromotedActionsIndex => {
      const currentActionsWidth = actionsWidths[currentPromotedActionsIndex];
      const notEnoughSpace = accumulatedWidth + currentActionsWidth >= containerWidth - disclosureWidth;
      if (notEnoughSpace || hasReturned) {
        hiddenPromotedActions.push(currentPromotedActionsIndex);
        hasReturned = true;
        return;
      }
      visiblePromotedActions.push(currentPromotedActionsIndex);
      accumulatedWidth += currentActionsWidth;
    });
  }
  return {
    visiblePromotedActions,
    hiddenPromotedActions
  };
}
function instanceOfBulkActionListSectionArray(actions) {
  const validList = actions.filter(action => {
    return action.items;
  });
  return actions.length === validList.length;
}
function instanceOfBulkActionArray(actions) {
  const validList = actions.filter(action => {
    return !action.items;
  });
  return actions.length === validList.length;
}
function instanceOfMenuGroupDescriptor(action) {
  return 'title' in action && 'actions' in action;
}
function instanceOfBulkActionListSection(action) {
  return 'items' in action;
}
function getActionSections(actions) {
  if (!actions || actions.length === 0) {
    return;
  }
  if (instanceOfBulkActionListSectionArray(actions)) {
    return actions;
  }
  if (instanceOfBulkActionArray(actions)) {
    return [{
      items: actions
    }];
  }
}
function isNewBadgeInBadgeActions(actionSections) {
  if (!actionSections) return false;
  for (const action of actionSections) {
    for (const item of action.items) {
      if (item.badge?.tone === 'new') return true;
    }
  }
  return false;
}

export { getActionSections, getVisibleAndHiddenActionsIndices, instanceOfBulkActionArray, instanceOfBulkActionListSection, instanceOfBulkActionListSectionArray, instanceOfMenuGroupDescriptor, isNewBadgeInBadgeActions };
