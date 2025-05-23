'use strict';

var React = require('react');
var types = require('./types.js');
var context = require('./context.js');
var hooks = require('../i18n/hooks.js');

function useIndexSelectionChange() {
  const onSelectionChange = React.useContext(context.IndexSelectionChangeContext);
  if (!onSelectionChange) {
    throw new Error(`Missing IndexProvider context`);
  }
  return onSelectionChange;
}
function useIndexRow() {
  const indexRow = React.useContext(context.IndexRowContext);
  if (!indexRow) {
    throw new Error(`Missing IndexProvider context`);
  }
  return indexRow;
}
function useIndexValue() {
  const index = React.useContext(context.IndexContext);
  if (!index) {
    throw new Error(`Missing IndexProvider context`);
  }
  return index;
}
function useBulkSelectionData({
  selectedItemsCount,
  itemCount,
  hasMoreItems,
  resourceName: passedResourceName,
  defaultPaginatedSelectAllText
}) {
  const i18n = hooks.useI18n();
  const selectable = Boolean(selectedItemsCount);
  const selectMode = selectedItemsCount === 'All' || selectedItemsCount > 0;
  const defaultResourceName = {
    singular: i18n.translate('Polaris.IndexProvider.defaultItemSingular'),
    plural: i18n.translate('Polaris.IndexProvider.defaultItemPlural')
  };
  const resourceName = passedResourceName ? passedResourceName : defaultResourceName;
  const paginatedSelectAllText = getPaginatedSelectAllText();
  const bulkActionsLabel = getBulkActionsLabel();
  const bulkActionsAccessibilityLabel = getBulkActionsAccessibilityLabel();
  let bulkSelectState = 'indeterminate';
  if (!selectedItemsCount || selectedItemsCount === 0) {
    bulkSelectState = undefined;
  } else if (selectedItemsCount === types.SELECT_ALL_ITEMS || selectedItemsCount === itemCount) {
    bulkSelectState = true;
  }
  return {
    paginatedSelectAllText,
    bulkActionsLabel,
    bulkActionsAccessibilityLabel,
    resourceName,
    selectMode,
    bulkSelectState,
    selectable
  };
  function getPaginatedSelectAllText() {
    if (!selectable || !hasMoreItems) {
      return;
    }
    if (selectedItemsCount === types.SELECT_ALL_ITEMS) {
      if (defaultPaginatedSelectAllText) {
        return defaultPaginatedSelectAllText;
      }
      return i18n.translate('Polaris.IndexProvider.allItemsSelected', {
        itemsLength: itemCount,
        resourceNamePlural: resourceName.plural.toLocaleLowerCase()
      });
    }
  }
  function getBulkActionsLabel() {
    const selectedItemsCountLabel = selectedItemsCount === types.SELECT_ALL_ITEMS ? `${itemCount}+` : selectedItemsCount;
    return i18n.translate('Polaris.IndexProvider.selected', {
      selectedItemsCount: selectedItemsCountLabel
    });
  }
  function getBulkActionsAccessibilityLabel() {
    const totalItemsCount = itemCount;
    const allSelected = selectedItemsCount === totalItemsCount;
    if (totalItemsCount === 1 && allSelected) {
      return i18n.translate('Polaris.IndexProvider.a11yCheckboxDeselectAllSingle', {
        resourceNameSingular: resourceName.singular
      });
    } else if (totalItemsCount === 1) {
      return i18n.translate('Polaris.IndexProvider.a11yCheckboxSelectAllSingle', {
        resourceNameSingular: resourceName.singular
      });
    } else if (allSelected) {
      return i18n.translate('Polaris.IndexProvider.a11yCheckboxDeselectAllMultiple', {
        itemsLength: itemCount,
        resourceNamePlural: resourceName.plural
      });
    } else {
      return i18n.translate('Polaris.IndexProvider.a11yCheckboxSelectAllMultiple', {
        itemsLength: itemCount,
        resourceNamePlural: resourceName.plural
      });
    }
  }
}
function useHandleBulkSelection({
  onSelectionChange = () => {}
}) {
  const lastSelected = React.useRef(null);
  const handleSelectionChange = React.useCallback((selectionType, toggleType, selection, sortOrder) => {
    const prevSelected = lastSelected.current;
    if (types.SelectionType.Multi && typeof sortOrder === 'number') {
      lastSelected.current = sortOrder;
    }
    if (selectionType === types.SelectionType.Single || selectionType === types.SelectionType.Multi && (typeof prevSelected !== 'number' || typeof sortOrder !== 'number')) {
      onSelectionChange(types.SelectionType.Single, toggleType, selection);
    } else if (selectionType === types.SelectionType.Multi) {
      const min = Math.min(prevSelected, sortOrder);
      const max = Math.max(prevSelected, sortOrder);
      onSelectionChange(selectionType, toggleType, [min, max]);
    } else if (selectionType === types.SelectionType.Page || selectionType === types.SelectionType.All) {
      onSelectionChange(selectionType, toggleType);
    } else if (selectionType === types.SelectionType.Range) {
      onSelectionChange(types.SelectionType.Range, toggleType, selection);
    }
  }, [onSelectionChange]);
  return handleSelectionChange;
}

exports.useBulkSelectionData = useBulkSelectionData;
exports.useHandleBulkSelection = useHandleBulkSelection;
exports.useIndexRow = useIndexRow;
exports.useIndexSelectionChange = useIndexSelectionChange;
exports.useIndexValue = useIndexValue;
