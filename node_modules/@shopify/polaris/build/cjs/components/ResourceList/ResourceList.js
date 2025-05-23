'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var polarisTokens = require('@shopify/polaris-tokens');
var debounce = require('../../utilities/debounce.js');
var css = require('../../utilities/css.js');
var components = require('../../utilities/components.js');
var useLazyRef = require('../../utilities/use-lazy-ref.js');
var useEventListener = require('../../utilities/use-event-listener.js');
var ResourceList_module = require('./ResourceList.css.js');
var types = require('../../utilities/resource-list/types.js');
var Select = require('../Select/Select.js');
var ResourceItem = require('../ResourceItem/ResourceItem.js');
var hooks = require('../../utilities/i18n/hooks.js');
var Text = require('../Text/Text.js');
var Button = require('../Button/Button.js');
var CheckableButton = require('../CheckableButton/CheckableButton.js');
var Sticky = require('../Sticky/Sticky.js');
var EmptySearchResult = require('../EmptySearchResult/EmptySearchResult.js');
var Spinner = require('../Spinner/Spinner.js');
var Pagination = require('../Pagination/Pagination.js');
var context = require('../../utilities/resource-list/context.js');
var BulkActions = require('../BulkActions/BulkActions.js');

const SMALL_SPINNER_HEIGHT = 28;
const LARGE_SPINNER_HEIGHT = 45;
function getAllItemsOnPage(items, idForItem) {
  return items.map((item, index) => {
    return idForItem(item, index);
  });
}
const isBreakpointsXS = () => {
  return typeof window === 'undefined' ? false : window.innerWidth < parseFloat(polarisTokens.toPx(polarisTokens.themeDefault.breakpoints['breakpoints-sm']) ?? '');
};
function defaultIdForItem(item, index) {
  return Object.prototype.hasOwnProperty.call(item, 'id') ? item.id : index.toString();
}
function ResourceList({
  items,
  filterControl,
  flushFilters,
  emptyState,
  emptySearchState,
  resourceName: resourceNameProp,
  promotedBulkActions,
  bulkActions,
  selectedItems = [],
  isFiltered,
  selectable,
  hasMoreItems,
  loading,
  headerContent,
  showHeader,
  totalItemsCount,
  sortValue,
  sortOptions,
  alternateTool,
  onSortChange,
  onSelectionChange,
  renderItem,
  idForItem = defaultIdForItem,
  resolveItemId,
  pagination
}) {
  const i18n = hooks.useI18n();
  const [selectMode, setSelectMode] = React.useState(Boolean(selectedItems && selectedItems.length > 0));
  const [loadingPosition, setLoadingPositionState] = React.useState(0);
  const [lastSelected, setLastSelected] = React.useState();
  const [smallScreen, setSmallScreen] = React.useState(isBreakpointsXS());
  const forceUpdate = React.useReducer((x = 0) => x + 1, 0)[1];
  const checkableButtonRef = React.useRef(null);
  const defaultResourceName = useLazyRef.useLazyRef(() => ({
    singular: i18n.translate('Polaris.ResourceList.defaultItemSingular'),
    plural: i18n.translate('Polaris.ResourceList.defaultItemPlural')
  }));
  const listRef = React.useRef(null);
  const handleSelectMode = selectMode => {
    setSelectMode(selectMode);
    if (!selectMode && onSelectionChange) {
      onSelectionChange([]);
    }
  };
  const handleResize = debounce.debounce(() => {
    const newSmallScreen = isBreakpointsXS();
    if (selectedItems && selectedItems.length === 0 && selectMode && !newSmallScreen) {
      handleSelectMode(false);
    }
    if (smallScreen !== newSmallScreen) {
      setSmallScreen(newSmallScreen);
    }
  }, 50, {
    leading: true,
    trailing: true,
    maxWait: 50
  });
  useEventListener.useEventListener('resize', handleResize);
  const isSelectable = Boolean(promotedBulkActions && promotedBulkActions.length > 0 || bulkActions && bulkActions.length > 0 || selectable) && !smallScreen;
  const selectAllSelectState = React.useMemo(() => {
    let selectState = 'indeterminate';
    if (!selectedItems || Array.isArray(selectedItems) && selectedItems.length === 0) {
      selectState = false;
    } else if (selectedItems === types.SELECT_ALL_ITEMS || Array.isArray(selectedItems) && selectedItems.length === items.length) {
      selectState = true;
    }
    return selectState;
  }, [items.length, selectedItems]);
  const resourceName = resourceNameProp ? resourceNameProp : defaultResourceName.current;
  const headerTitle = () => {
    const itemsCount = items.length;
    const resource = !loading && (!totalItemsCount && itemsCount === 1 || totalItemsCount === 1) ? resourceName.singular : resourceName.plural;
    if (loading) {
      return i18n.translate('Polaris.ResourceList.loading', {
        resource
      });
    } else if (totalItemsCount) {
      return i18n.translate('Polaris.ResourceList.showingTotalCount', {
        itemsCount,
        totalItemsCount,
        resource
      });
    } else if (headerContent) {
      return headerContent;
    } else {
      return i18n.translate('Polaris.ResourceList.showing', {
        itemsCount,
        resource
      });
    }
  };
  const [selectedItemsCount, setSelectedItemsCount] = React.useState(selectedItems === types.SELECT_ALL_ITEMS ? `${items.length}+` : selectedItems.length);
  React.useEffect(() => {
    if (selectedItems === types.SELECT_ALL_ITEMS || selectedItems.length > 0) {
      setSelectedItemsCount(selectedItems === types.SELECT_ALL_ITEMS ? `${items.length}+` : selectedItems.length);
    }
  }, [selectedItems, items.length]);
  const selectAllActionsLabel = i18n.translate('Polaris.ResourceList.selected', {
    selectedItemsCount
  });
  const bulkActionsAccessibilityLabel = React.useMemo(() => {
    const selectedItemsCount = selectedItems.length;
    const totalItemsCount = items.length;
    const allSelected = selectedItemsCount === totalItemsCount;
    if (totalItemsCount === 1 && allSelected) {
      return i18n.translate('Polaris.ResourceList.a11yCheckboxDeselectAllSingle', {
        resourceNameSingular: resourceName.singular
      });
    } else if (totalItemsCount === 1) {
      return i18n.translate('Polaris.ResourceList.a11yCheckboxSelectAllSingle', {
        resourceNameSingular: resourceName.singular
      });
    } else if (allSelected) {
      return i18n.translate('Polaris.ResourceList.a11yCheckboxDeselectAllMultiple', {
        itemsLength: items.length,
        resourceNamePlural: resourceName.plural
      });
    } else {
      return i18n.translate('Polaris.ResourceList.a11yCheckboxSelectAllMultiple', {
        itemsLength: items.length,
        resourceNamePlural: resourceName.plural
      });
    }
  }, [i18n, items.length, resourceName.singular, resourceName.plural, selectedItems.length]);
  const paginatedSelectAllText = React.useMemo(() => {
    if (!isSelectable || !hasMoreItems) {
      return;
    }
    if (selectedItems === types.SELECT_ALL_ITEMS) {
      return i18n.translate(isFiltered ? 'Polaris.ResourceList.allFilteredItemsSelected' : 'Polaris.ResourceList.allItemsSelected', {
        itemsLength: items.length,
        resourceNamePlural: resourceName.plural
      });
    }
  }, [hasMoreItems, i18n, isFiltered, isSelectable, items, resourceName.plural, selectedItems]);
  const handleSelectAllItemsInStore = React.useCallback(() => {
    const newlySelectedItems = selectedItems === types.SELECT_ALL_ITEMS ? getAllItemsOnPage(items, idForItem) : types.SELECT_ALL_ITEMS;
    if (onSelectionChange) {
      onSelectionChange(newlySelectedItems);
    }
  }, [idForItem, items, onSelectionChange, selectedItems]);
  const paginatedSelectAllAction = React.useMemo(() => {
    if (!isSelectable || !hasMoreItems) {
      return;
    }
    const actionText = selectedItems === types.SELECT_ALL_ITEMS ? i18n.translate('Polaris.Common.undo') : i18n.translate(isFiltered ? 'Polaris.ResourceList.selectAllFilteredItems' : 'Polaris.ResourceList.selectAllItems', {
      itemsLength: items.length,
      resourceNamePlural: resourceName.plural
    });
    return {
      content: actionText,
      onAction: handleSelectAllItemsInStore
    };
  }, [handleSelectAllItemsInStore, hasMoreItems, i18n, isFiltered, isSelectable, items.length, resourceName.plural, selectedItems]);
  const emptySearchResultText = {
    title: i18n.translate('Polaris.ResourceList.emptySearchResultTitle', {
      resourceNamePlural: resourceName.plural
    }),
    description: i18n.translate('Polaris.ResourceList.emptySearchResultDescription')
  };
  const setLoadingPosition = React.useCallback(() => {
    if (listRef.current != null) {
      if (typeof window === 'undefined') {
        return;
      }
      const overlay = listRef.current.getBoundingClientRect();
      const viewportHeight = Math.max(document.documentElement ? document.documentElement.clientHeight : 0, window.innerHeight || 0);
      const overflow = viewportHeight - overlay.height;
      const spinnerHeight = items.length === 1 ? SMALL_SPINNER_HEIGHT : LARGE_SPINNER_HEIGHT;
      const spinnerPosition = overflow > 0 ? (overlay.height - spinnerHeight) / 2 : (viewportHeight - overlay.top - spinnerHeight) / 2;
      setLoadingPositionState(spinnerPosition);
    }
  }, [listRef, items.length]);
  const itemsExist = items.length > 0;
  React.useEffect(() => {
    if (loading) {
      setLoadingPosition();
    }
  }, [loading, setLoadingPosition]);
  React.useEffect(() => {
    if (selectedItems && selectedItems.length > 0 && !selectMode) {
      setSelectMode(true);
    }
    if ((!selectedItems || selectedItems.length === 0) && !isBreakpointsXS()) {
      setSelectMode(false);
    }
  }, [selectedItems, selectMode]);
  React.useEffect(() => {
    forceUpdate();
  }, [forceUpdate, items]);
  const renderItemWithId = (item, index) => {
    const id = idForItem(item, index);
    const itemContent = renderItem(item, id, index);
    if (process.env.NODE_ENV === 'development' && !components.isElementOfType(itemContent, ResourceItem.ResourceItem)) {
      // eslint-disable-next-line no-console
      console.warn('<ResourceList /> renderItem function should return a <ResourceItem />.');
    }
    return itemContent;
  };
  const handleMultiSelectionChange = (lastSelected, currentSelected, resolveItemId) => {
    const min = Math.min(lastSelected, currentSelected);
    const max = Math.max(lastSelected, currentSelected);
    return items.slice(min, max + 1).map(resolveItemId);
  };
  const handleSelectionChange = (selected, id, sortOrder, shiftKey) => {
    if (selectedItems == null || onSelectionChange == null) {
      return;
    }
    let newlySelectedItems = selectedItems === types.SELECT_ALL_ITEMS ? getAllItemsOnPage(items, idForItem) : [...selectedItems];
    if (sortOrder !== undefined) {
      setLastSelected(sortOrder);
    }
    const lastSelectedFromState = lastSelected;
    let selectedIds = [id];
    if (shiftKey && lastSelectedFromState != null && sortOrder !== undefined && resolveItemId) {
      selectedIds = handleMultiSelectionChange(lastSelectedFromState, sortOrder, resolveItemId);
    }
    newlySelectedItems = [...new Set([...newlySelectedItems, ...selectedIds])];
    if (!selected) {
      for (const selectedId of selectedIds) {
        newlySelectedItems.splice(newlySelectedItems.indexOf(selectedId), 1);
      }
    }
    if (newlySelectedItems.length === 0 && !isBreakpointsXS()) {
      handleSelectMode(false);
    } else if (newlySelectedItems.length > 0) {
      handleSelectMode(true);
    }
    if (onSelectionChange) {
      onSelectionChange(newlySelectedItems);
    }
  };
  const handleToggleAll = () => {
    let newlySelectedItems;
    if (Array.isArray(selectedItems) && selectedItems.length === items.length || selectedItems === types.SELECT_ALL_ITEMS) {
      newlySelectedItems = [];
    } else {
      newlySelectedItems = items.map((item, index) => {
        return idForItem(item, index);
      });
    }
    if (newlySelectedItems.length === 0 && !isBreakpointsXS()) {
      handleSelectMode(false);
    } else if (newlySelectedItems.length > 0) {
      handleSelectMode(true);
    }
    if (onSelectionChange) {
      onSelectionChange(newlySelectedItems);
    }

    // setTimeout ensures execution after the Transition on BulkActions
    setTimeout(() => {
      checkableButtonRef?.current?.focus();
    }, 0);
  };
  const bulkActionClassNames = css.classNames(ResourceList_module.default.BulkActionsWrapper, selectMode && ResourceList_module.default.BulkActionsWrapperVisible);
  const bulkActionsMarkup = isSelectable ? /*#__PURE__*/React.createElement("div", {
    className: bulkActionClassNames
  }, /*#__PURE__*/React.createElement(BulkActions.BulkActions, {
    selectMode: selectMode,
    onSelectModeToggle: handleSelectMode,
    label: selectAllActionsLabel,
    paginatedSelectAllAction: paginatedSelectAllAction,
    paginatedSelectAllText: paginatedSelectAllText,
    promotedActions: promotedBulkActions,
    actions: bulkActions,
    disabled: loading,
    accessibilityLabel: bulkActionsAccessibilityLabel,
    selected: selectAllSelectState,
    onToggleAll: handleToggleAll,
    ref: checkableButtonRef,
    buttonSize: "medium"
  })) : null;
  const filterControlMarkup = filterControl ? /*#__PURE__*/React.createElement("div", {
    className: css.classNames(!flushFilters && ResourceList_module.default.FiltersWrapper)
  }, filterControl) : null;
  const sortingSelectMarkup = sortOptions && sortOptions.length > 0 && !alternateTool ? /*#__PURE__*/React.createElement("div", {
    className: ResourceList_module.default.SortWrapper
  }, /*#__PURE__*/React.createElement(Select.Select, {
    label: i18n.translate('Polaris.ResourceList.sortingLabel'),
    labelInline: !smallScreen,
    labelHidden: smallScreen,
    options: sortOptions,
    onChange: onSortChange,
    value: sortValue,
    disabled: selectMode
  })) : null;
  const alternateToolMarkup = alternateTool && !sortingSelectMarkup ? /*#__PURE__*/React.createElement("div", {
    className: ResourceList_module.default.AlternateToolWrapper
  }, alternateTool) : null;
  const headerTitleMarkup = /*#__PURE__*/React.createElement("div", {
    className: ResourceList_module.default.HeaderTitleWrapper
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "bodyMd"
  }, headerTitle()));
  const selectButtonMarkup = isSelectable ? /*#__PURE__*/React.createElement("div", {
    className: ResourceList_module.default.SelectButtonWrapper
  }, /*#__PURE__*/React.createElement(Button.Button, {
    disabled: selectMode,
    icon: polarisIcons.CheckboxIcon,
    onClick: () => handleSelectMode(true)
  }, i18n.translate('Polaris.ResourceList.selectButtonText'))) : null;
  const checkableButtonMarkup = isSelectable ? /*#__PURE__*/React.createElement("div", {
    className: ResourceList_module.default.CheckableButtonWrapper
  }, /*#__PURE__*/React.createElement(CheckableButton.CheckableButton, {
    accessibilityLabel: bulkActionsAccessibilityLabel,
    label: headerTitle(),
    onToggleAll: handleToggleAll,
    disabled: loading,
    ref: checkableButtonRef,
    selected: selectAllSelectState
  })) : null;
  const needsHeader = isSelectable || sortOptions && sortOptions.length > 0 || alternateTool;
  const headerWrapperOverlay = loading ? /*#__PURE__*/React.createElement("div", {
    className: ResourceList_module.default['HeaderWrapper-overlay']
  }) : null;
  const showEmptyState = emptyState && !itemsExist && !loading;
  const showEmptySearchState = !showEmptyState && filterControl && !itemsExist && !loading;
  const headerMarkup = !showEmptyState && showHeader !== false && !showEmptySearchState && (showHeader || needsHeader) && listRef.current && /*#__PURE__*/React.createElement("div", {
    className: ResourceList_module.default.HeaderOuterWrapper
  }, /*#__PURE__*/React.createElement(Sticky.Sticky, {
    boundingElement: listRef.current
  }, isSticky => {
    const headerClassName = css.classNames(ResourceList_module.default.HeaderWrapper, sortOptions && sortOptions.length > 0 && !alternateTool && ResourceList_module.default['HeaderWrapper-hasSort'], alternateTool && ResourceList_module.default['HeaderWrapper-hasAlternateTool'], isSelectable && ResourceList_module.default['HeaderWrapper-hasSelect'], loading && ResourceList_module.default['HeaderWrapper-disabled'], isSelectable && selectMode && bulkActionsMarkup && ResourceList_module.default['HeaderWrapper-inSelectMode'], isSticky && ResourceList_module.default['HeaderWrapper-isSticky']);
    return /*#__PURE__*/React.createElement("div", {
      className: headerClassName
    }, headerWrapperOverlay, /*#__PURE__*/React.createElement("div", {
      className: ResourceList_module.default.HeaderContentWrapper
    }, headerTitleMarkup, checkableButtonMarkup, alternateToolMarkup, sortingSelectMarkup, selectButtonMarkup), bulkActionsMarkup);
  }));
  const emptySearchStateMarkup = showEmptySearchState ? emptySearchState || /*#__PURE__*/React.createElement("div", {
    className: ResourceList_module.default.EmptySearchResultWrapper
  }, /*#__PURE__*/React.createElement(EmptySearchResult.EmptySearchResult, Object.assign({}, emptySearchResultText, {
    withIllustration: true
  }))) : null;
  const emptyStateMarkup = showEmptyState ? emptyState : null;
  const defaultTopPadding = 8;
  const topPadding = loadingPosition > 0 ? loadingPosition : defaultTopPadding;
  const spinnerStyle = {
    paddingTop: `${topPadding}px`
  };
  const spinnerSize = items.length < 2 ? 'small' : 'large';
  const loadingOverlay = loading ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("li", {
    className: ResourceList_module.default.SpinnerContainer,
    style: spinnerStyle
  }, /*#__PURE__*/React.createElement(Spinner.Spinner, {
    size: spinnerSize,
    accessibilityLabel: "Items are loading"
  })), /*#__PURE__*/React.createElement("li", {
    className: ResourceList_module.default.LoadingOverlay
  })) : null;
  const className = css.classNames(ResourceList_module.default.ItemWrapper, loading && ResourceList_module.default['ItemWrapper-isLoading']);
  const loadingWithoutItemsMarkup = loading && !itemsExist ? /*#__PURE__*/React.createElement("div", {
    className: className,
    tabIndex: -1
  }, loadingOverlay) : null;
  const resourceListClassName = css.classNames(ResourceList_module.default.ResourceList, loading && ResourceList_module.default.disabledPointerEvents, selectMode && ResourceList_module.default.disableTextSelection);
  const listMarkup = itemsExist ? /*#__PURE__*/React.createElement("ul", {
    className: resourceListClassName,
    ref: listRef,
    "aria-live": "polite",
    "aria-busy": loading
  }, loadingOverlay, React.Children.toArray(items.map(renderItemWithId))) : null;
  const paginationMarkup = pagination ? /*#__PURE__*/React.createElement("div", {
    className: ResourceList_module.default.PaginationWrapper
  }, /*#__PURE__*/React.createElement(Pagination.Pagination, Object.assign({
    type: "table"
  }, pagination))) : null;

  // This is probably a legit error but I don't have the time to refactor this
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const context$1 = {
    selectable: isSelectable,
    selectedItems,
    selectMode,
    hasBulkActions: Boolean(bulkActions),
    resourceName,
    loading,
    onSelectionChange: handleSelectionChange
  };
  return /*#__PURE__*/React.createElement(context.ResourceListContext.Provider, {
    value: context$1
  }, filterControlMarkup, /*#__PURE__*/React.createElement("div", {
    className: ResourceList_module.default.ResourceListWrapper
  }, headerMarkup, listMarkup, emptySearchStateMarkup, emptyStateMarkup, loadingWithoutItemsMarkup, paginationMarkup));
}
ResourceList.Item = ResourceItem.ResourceItem;

exports.ResourceList = ResourceList;
