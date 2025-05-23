import React, { useMemo } from 'react';
import { useBulkSelectionData, useHandleBulkSelection } from '../../utilities/index-provider/hooks.js';
import { IndexContext, IndexRowContext, IndexSelectionChangeContext } from '../../utilities/index-provider/context.js';

function IndexProvider({
  children,
  resourceName: passedResourceName,
  loading,
  onSelectionChange,
  selectedItemsCount = 0,
  itemCount,
  hasMoreItems,
  condensed,
  selectable: isSelectableIndex = true,
  paginatedSelectAllText: defaultPaginatedSelectAllText
}) {
  const {
    paginatedSelectAllText,
    bulkActionsLabel,
    bulkActionsAccessibilityLabel,
    resourceName,
    selectMode,
    bulkSelectState
  } = useBulkSelectionData({
    selectedItemsCount,
    itemCount,
    hasMoreItems,
    resourceName: passedResourceName,
    defaultPaginatedSelectAllText
  });
  const handleSelectionChange = useHandleBulkSelection({
    onSelectionChange
  });
  const contextValue = useMemo(() => ({
    itemCount,
    selectMode: selectMode && isSelectableIndex,
    selectable: isSelectableIndex,
    resourceName,
    loading,
    paginatedSelectAllText,
    hasMoreItems,
    bulkActionsLabel,
    bulkActionsAccessibilityLabel,
    bulkSelectState,
    selectedItemsCount,
    condensed
  }), [itemCount, selectMode, isSelectableIndex, resourceName, loading, paginatedSelectAllText, hasMoreItems, bulkActionsLabel, bulkActionsAccessibilityLabel, bulkSelectState, selectedItemsCount, condensed]);
  const rowContextValue = useMemo(() => ({
    selectable: isSelectableIndex,
    selectMode: selectMode && isSelectableIndex,
    condensed
  }), [condensed, selectMode, isSelectableIndex]);
  return /*#__PURE__*/React.createElement(IndexContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(IndexRowContext.Provider, {
    value: rowContextValue
  }, /*#__PURE__*/React.createElement(IndexSelectionChangeContext.Provider, {
    value: handleSelectionChange
  }, children)));
}

export { IndexProvider };
