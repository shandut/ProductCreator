'use strict';

var React = require('react');
var hooks = require('../../utilities/index-provider/hooks.js');
var context = require('../../utilities/index-provider/context.js');

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
  } = hooks.useBulkSelectionData({
    selectedItemsCount,
    itemCount,
    hasMoreItems,
    resourceName: passedResourceName,
    defaultPaginatedSelectAllText
  });
  const handleSelectionChange = hooks.useHandleBulkSelection({
    onSelectionChange
  });
  const contextValue = React.useMemo(() => ({
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
  const rowContextValue = React.useMemo(() => ({
    selectable: isSelectableIndex,
    selectMode: selectMode && isSelectableIndex,
    condensed
  }), [condensed, selectMode, isSelectableIndex]);
  return /*#__PURE__*/React.createElement(context.IndexContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(context.IndexRowContext.Provider, {
    value: rowContextValue
  }, /*#__PURE__*/React.createElement(context.IndexSelectionChangeContext.Provider, {
    value: handleSelectionChange
  }, children)));
}

exports.IndexProvider = IndexProvider;
