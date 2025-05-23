'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var debounce = require('../../utilities/debounce.js');
var useToggle = require('../../utilities/use-toggle.js');
var useIsomorphicLayoutEffect = require('../../utilities/use-isomorphic-layout-effect.js');
var css = require('../../utilities/css.js');
var IndexTable_module = require('./IndexTable.css.js');
var IndexProvider = require('../IndexProvider/IndexProvider.js');
var Row = require('./components/Row/Row.js');
var types = require('../../utilities/index-provider/types.js');
var utilities = require('./utilities/utilities.js');
var EmptySearchResult = require('../EmptySearchResult/EmptySearchResult.js');
var ScrollContainer = require('./components/ScrollContainer/ScrollContainer.js');
var BulkActions = require('../BulkActions/BulkActions.js');
var Cell = require('./components/Cell/Cell.js');
var hooks = require('../../utilities/index-provider/hooks.js');
var hooks$1 = require('../../utilities/i18n/hooks.js');
var Spinner = require('../Spinner/Spinner.js');
var AfterInitialMount = require('../AfterInitialMount/AfterInitialMount.js');
var EventListener = require('../EventListener/EventListener.js');
var Pagination = require('../Pagination/Pagination.js');
var Checkbox = require('../Checkbox/Checkbox.js');
var Text = require('../Text/Text.js');
var LegacyStack = require('../LegacyStack/LegacyStack.js');
var Badge = require('../Badge/Badge.js');
var UnstyledButton = require('../UnstyledButton/UnstyledButton.js');
var Tooltip = require('../Tooltip/Tooltip.js');
var Sticky = require('../Sticky/Sticky.js');

const SCROLL_BAR_PADDING = 16;
const SCROLL_BAR_DEBOUNCE_PERIOD = 300;
function IndexTableBase({
  headings,
  bulkActions = [],
  promotedBulkActions = [],
  children,
  emptyState,
  sort,
  paginatedSelectAllActionText,
  lastColumnSticky = false,
  sortable,
  sortDirection,
  defaultSortDirection = 'descending',
  sortColumnIndex,
  onSort,
  sortToggleLabels,
  hasZebraStriping,
  pagination,
  ...restProps
}) {
  const {
    loading,
    bulkSelectState,
    resourceName,
    bulkActionsAccessibilityLabel,
    selectMode,
    selectable = restProps.selectable,
    paginatedSelectAllText,
    itemCount,
    hasMoreItems,
    selectedItemsCount,
    condensed
  } = hooks.useIndexValue();
  const handleSelectionChange = hooks.useIndexSelectionChange();
  const i18n = hooks$1.useI18n();
  const {
    value: hasMoreLeftColumns,
    toggle: toggleHasMoreLeftColumns
  } = useToggle.useToggle(false);
  const tablePosition = React.useRef({
    top: 0,
    left: 0
  });
  const tableHeadingRects = React.useRef([]);
  const scrollableContainerElement = React.useRef(null);
  const tableElement = React.useRef(null);
  const tableBodyElement = React.useRef(null);
  const condensedListElement = React.useRef(null);
  const [tableInitialized, setTableInitialized] = React.useState(false);
  const [stickyWrapper, setStickyWrapper] = React.useState(null);
  const [hideScrollContainer, setHideScrollContainer] = React.useState(true);
  const tableHeadings = React.useRef([]);
  const stickyTableHeadings = React.useRef([]);
  const stickyHeaderWrapperElement = React.useRef(null);
  const firstStickyHeaderElement = React.useRef(null);
  const stickyHeaderElement = React.useRef(null);
  const scrollBarElement = React.useRef(null);
  const scrollContainerElement = React.useRef(null);
  const scrollingWithBar = React.useRef(false);
  const scrollingContainer = React.useRef(false);
  const lastSortedColumnIndex = React.useRef(sortColumnIndex);
  const renderAfterSelectEvent = React.useRef(false);
  const lastSelectedItemsCount = React.useRef(0);
  const hasSelected = React.useRef(false);
  if (selectedItemsCount !== lastSelectedItemsCount.current) {
    renderAfterSelectEvent.current = true;
    lastSelectedItemsCount.current = selectedItemsCount;
  }
  if (!hasSelected.current && selectedItemsCount !== 0) {
    hasSelected.current = true;
  }
  const tableBodyRef = React.useCallback(node => {
    if (node !== null && !tableInitialized) {
      setTableInitialized(true);
    }
    tableBodyElement.current = node;
  }, [tableInitialized]);
  const handleSelectAllItemsInStore = React.useCallback(() => {
    handleSelectionChange(selectedItemsCount === types.SELECT_ALL_ITEMS ? types.SelectionType.Page : types.SelectionType.All, true);
  }, [handleSelectionChange, selectedItemsCount]);
  const resizeTableHeadings = React.useMemo(() => debounce.debounce(() => {
    if (!tableElement.current || !scrollableContainerElement.current) {
      return;
    }
    const boundingRect = scrollableContainerElement.current.getBoundingClientRect();
    tablePosition.current = {
      top: boundingRect.top,
      left: boundingRect.left
    };
    tableHeadingRects.current = tableHeadings.current.map(heading => ({
      offsetWidth: heading.offsetWidth || 0,
      offsetLeft: heading.offsetLeft || 0
    }));
    if (tableHeadings.current.length === 0) {
      return;
    }

    // update left offset for first column
    if (selectable && tableHeadings.current.length > 1) {
      tableHeadings.current[1].style.left = `${tableHeadingRects.current[0].offsetWidth}px`;
      if (stickyTableHeadings.current?.length) {
        stickyTableHeadings.current[1].style.left = `${tableHeadingRects.current[0].offsetWidth}px`;
      }
    }

    // update sticky header min-widths to match table widths
    if (stickyTableHeadings.current?.length) {
      stickyTableHeadings.current.forEach((heading, index) => {
        heading.style.minWidth = `${tableHeadingRects.current[index]?.offsetWidth || 0}px`;
      });
    }
  }), [selectable]);
  const resizeTableScrollBar = React.useCallback(() => {
    if (scrollBarElement.current && tableElement.current && tableInitialized) {
      scrollBarElement.current.style.setProperty('--pc-index-table-scroll-bar-content-width', `${tableElement.current.offsetWidth - SCROLL_BAR_PADDING}px`);
      setHideScrollContainer(scrollContainerElement.current?.offsetWidth === tableElement.current?.offsetWidth);
    }
  }, [tableInitialized]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceResizeTableScrollbar = React.useCallback(debounce.debounce(resizeTableScrollBar, SCROLL_BAR_DEBOUNCE_PERIOD, {
    trailing: true
  }), [resizeTableScrollBar]);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCanScrollRight = React.useCallback(debounce.debounce(() => {
    if (!lastColumnSticky || !tableElement.current || !scrollableContainerElement.current) {
      return;
    }
    const tableRect = tableElement.current.getBoundingClientRect();
    const scrollableRect = scrollableContainerElement.current.getBoundingClientRect();
    setCanScrollRight(tableRect.width > scrollableRect.width);
  }), [lastColumnSticky]);
  React.useEffect(() => {
    handleCanScrollRight();
  }, [handleCanScrollRight]);
  const [canFitStickyColumn, setCanFitStickyColumn] = React.useState(true);
  const handleCanFitStickyColumn = React.useCallback(() => {
    if (!scrollableContainerElement.current || !tableHeadings.current.length) {
      return;
    }
    const scrollableRect = scrollableContainerElement.current.getBoundingClientRect();
    const checkboxColumnWidth = selectable ? tableHeadings.current[0].getBoundingClientRect().width : 0;
    const firstStickyColumnWidth = tableHeadings.current[selectable ? 1 : 0].getBoundingClientRect().width;
    const lastColumnIsNotTheFirst = selectable ? tableHeadings.current.length > 2 : 1;
    // Don't consider the last column in the calculations if it's not sticky
    const lastStickyColumnWidth = lastColumnSticky && lastColumnIsNotTheFirst ? tableHeadings.current[tableHeadings.current.length - 1].getBoundingClientRect().width : 0;
    // Secure some space for the remaining columns to be visible
    const restOfContentMinWidth = 100;
    setCanFitStickyColumn(scrollableRect.width > firstStickyColumnWidth + checkboxColumnWidth + lastStickyColumnWidth + restOfContentMinWidth);
  }, [lastColumnSticky, selectable]);
  React.useEffect(() => {
    if (tableInitialized) {
      handleCanFitStickyColumn();
    }
  }, [handleCanFitStickyColumn, tableInitialized]);
  const handleResize = React.useCallback(() => {
    // hide the scrollbar when resizing
    scrollBarElement.current?.style.setProperty('--pc-index-table-scroll-bar-content-width', `0px`);
    resizeTableHeadings();
    debounceResizeTableScrollbar();
    handleCanScrollRight();
    handleCanFitStickyColumn();
  }, [resizeTableHeadings, debounceResizeTableScrollbar, handleCanScrollRight, handleCanFitStickyColumn]);
  const handleScrollContainerScroll = React.useCallback((canScrollLeft, canScrollRight) => {
    if (!scrollableContainerElement.current || !scrollBarElement.current) {
      return;
    }
    if (!scrollingWithBar.current) {
      scrollingContainer.current = true;
      scrollBarElement.current.scrollLeft = scrollableContainerElement.current.scrollLeft;
    }
    scrollingWithBar.current = false;
    if (stickyHeaderElement.current) {
      stickyHeaderElement.current.scrollLeft = scrollableContainerElement.current.scrollLeft;
    }
    if (canScrollLeft && !hasMoreLeftColumns || !canScrollLeft && hasMoreLeftColumns) {
      toggleHasMoreLeftColumns();
    }
    setCanScrollRight(canScrollRight);
  }, [hasMoreLeftColumns, toggleHasMoreLeftColumns]);
  const handleScrollBarScroll = React.useCallback(() => {
    if (!scrollableContainerElement.current || !scrollBarElement.current) {
      return;
    }
    if (!scrollingContainer.current) {
      scrollingWithBar.current = true;
      scrollableContainerElement.current.scrollLeft = scrollBarElement.current.scrollLeft;
    }
    scrollingContainer.current = false;
  }, []);
  useIsomorphicLayoutEffect.useIsomorphicLayoutEffect(() => {
    tableHeadings.current = utilities.getTableHeadingsBySelector(tableElement.current, '[data-index-table-heading]');
    stickyTableHeadings.current = utilities.getTableHeadingsBySelector(stickyHeaderWrapperElement.current, '[data-index-table-sticky-heading]');
    resizeTableHeadings();
  }, [headings, resizeTableHeadings, firstStickyHeaderElement, tableInitialized]);
  React.useEffect(() => {
    resizeTableScrollBar();
    setStickyWrapper(condensed ? condensedListElement.current : tableElement.current);
  }, [tableInitialized, resizeTableScrollBar, condensed]);
  const headingsMarkup = headings.map((heading, index) => renderHeading(heading, index, 'th', {
    'data-index-table-heading': true
  }, heading.id));
  const stickyHeadingsMarkup = headings.map((heading, index) =>
  // NOTE: No id since it would be a duplicate of the non-sticky header's id
  renderHeading(heading, index, 'div', {
    'data-index-table-sticky-heading': true
  }));
  const [selectedItemsCountValue, setSelectedItemsCountValue] = React.useState(selectedItemsCount === types.SELECT_ALL_ITEMS ? `${itemCount}+` : selectedItemsCount);
  React.useEffect(() => {
    if (selectedItemsCount === types.SELECT_ALL_ITEMS || selectedItemsCount > 0) {
      setSelectedItemsCountValue(selectedItemsCount === types.SELECT_ALL_ITEMS ? `${itemCount}+` : selectedItemsCount);
    }
  }, [selectedItemsCount, itemCount]);
  const selectAllActionsLabel = i18n.translate('Polaris.IndexTable.selected', {
    selectedItemsCount: selectedItemsCountValue
  });
  const handleTogglePage = React.useCallback(() => {
    handleSelectionChange(types.SelectionType.Page, Boolean(!bulkSelectState || bulkSelectState === 'indeterminate'));
  }, [bulkSelectState, handleSelectionChange]);
  const paginatedSelectAllAction = getPaginatedSelectAllAction();
  const loadingMarkup = /*#__PURE__*/React.createElement("div", {
    className: css.classNames(IndexTable_module.default.LoadingPanel, loading && IndexTable_module.default.LoadingPanelEntered)
  }, /*#__PURE__*/React.createElement("div", {
    className: IndexTable_module.default.LoadingPanelRow
  }, /*#__PURE__*/React.createElement(Spinner.Spinner, {
    size: "small"
  }), /*#__PURE__*/React.createElement("span", {
    className: IndexTable_module.default.LoadingPanelText
  }, i18n.translate('Polaris.IndexTable.resourceLoadingAccessibilityLabel', {
    resourceNamePlural: resourceName.plural.toLocaleLowerCase()
  }))));
  const stickyTableClassNames = css.classNames(IndexTable_module.default.StickyTable, hasMoreLeftColumns && IndexTable_module.default['StickyTable-scrolling'], condensed && IndexTable_module.default['StickyTable-condensed']);
  const shouldShowActions = !condensed || selectedItemsCount;
  const promotedActions = shouldShowActions ? promotedBulkActions : [];
  const actions = shouldShowActions ? bulkActions : [];
  const stickyHeaderMarkup = /*#__PURE__*/React.createElement("div", {
    className: stickyTableClassNames,
    role: "presentation"
  }, /*#__PURE__*/React.createElement(Sticky.Sticky, {
    boundingElement: stickyWrapper
  }, isSticky => {
    const stickyHeaderClassNames = css.classNames(IndexTable_module.default.StickyTableHeader, isSticky && IndexTable_module.default['StickyTableHeader-isSticky'],
    // Has a sticky left column enabled
    canFitStickyColumn && IndexTable_module.default['StickyTableHeader-sticky'],
    // ie; is scrolled to the right
    hasMoreLeftColumns && IndexTable_module.default['StickyTableHeader-scrolling'],
    // Has a sticky right column enabled
    canFitStickyColumn && lastColumnSticky && IndexTable_module.default['StickyTableHeader-sticky-last'],
    // ie; is scrolled to the left
    canFitStickyColumn && lastColumnSticky && canScrollRight && IndexTable_module.default['StickyTableHeader-sticky-scrolling']);
    const bulkActionsClassName = css.classNames(IndexTable_module.default.BulkActionsWrapper, selectMode && IndexTable_module.default.BulkActionsWrapperVisible, condensed && IndexTable_module.default['StickyTableHeader-condensed'], isSticky && IndexTable_module.default['StickyTableHeader-isSticky']);
    const bulkActionsMarkup = shouldShowActions && !condensed ? /*#__PURE__*/React.createElement("div", {
      className: bulkActionsClassName
    }, /*#__PURE__*/React.createElement(BulkActions.BulkActions, {
      selectMode: selectMode,
      onToggleAll: handleTogglePage,
      paginatedSelectAllText: paginatedSelectAllText,
      paginatedSelectAllAction: paginatedSelectAllAction,
      accessibilityLabel: bulkActionsAccessibilityLabel,
      selected: bulkSelectState,
      promotedActions: promotedActions,
      actions: actions,
      onSelectModeToggle: condensed ? handleSelectModeToggle : undefined,
      label: selectAllActionsLabel,
      buttonSize: "micro"
    })) : null;
    const headerMarkup = condensed ? /*#__PURE__*/React.createElement("div", {
      className: css.classNames(IndexTable_module.default.HeaderWrapper, (!selectable || condensed) && IndexTable_module.default.unselectable)
    }, loadingMarkup, sort) : /*#__PURE__*/React.createElement("div", {
      className: stickyHeaderClassNames,
      ref: stickyHeaderWrapperElement
    }, loadingMarkup, /*#__PURE__*/React.createElement("div", {
      className: IndexTable_module.default.StickyTableHeadings,
      ref: stickyHeaderElement
    }, stickyHeadingsMarkup));
    return /*#__PURE__*/React.createElement(React.Fragment, null, headerMarkup, bulkActionsMarkup);
  }));
  const scrollBarWrapperClassNames = css.classNames(IndexTable_module.default.ScrollBarContainer, pagination && IndexTable_module.default.ScrollBarContainerWithPagination, condensed && IndexTable_module.default.scrollBarContainerCondensed, hideScrollContainer && IndexTable_module.default.scrollBarContainerHidden);
  const scrollBarClassNames = css.classNames(tableElement.current && tableInitialized && IndexTable_module.default.ScrollBarContent);
  const scrollBarMarkup = itemCount > 0 ? /*#__PURE__*/React.createElement(AfterInitialMount.AfterInitialMount, {
    onMount: resizeTableScrollBar
  }, /*#__PURE__*/React.createElement("div", {
    className: scrollBarWrapperClassNames,
    ref: scrollContainerElement
  }, /*#__PURE__*/React.createElement("div", {
    onScroll: handleScrollBarScroll,
    className: IndexTable_module.default.ScrollBar,
    ref: scrollBarElement
  }, /*#__PURE__*/React.createElement("div", {
    className: scrollBarClassNames
  })))) : null;
  const isSortable = sortable?.some(value => value);
  const tableClassNames = css.classNames(IndexTable_module.default.Table, hasMoreLeftColumns && IndexTable_module.default['Table-scrolling'], selectMode && IndexTable_module.default.disableTextSelection, !selectable && IndexTable_module.default['Table-unselectable'], canFitStickyColumn && IndexTable_module.default['Table-sticky'], isSortable && IndexTable_module.default['Table-sortable'], canFitStickyColumn && lastColumnSticky && IndexTable_module.default['Table-sticky-last'], canFitStickyColumn && lastColumnSticky && canScrollRight && IndexTable_module.default['Table-sticky-scrolling'], hasZebraStriping && IndexTable_module.default.ZebraStriping);
  const emptyStateMarkup = emptyState ? emptyState : /*#__PURE__*/React.createElement(EmptySearchResult.EmptySearchResult, {
    title: i18n.translate('Polaris.IndexTable.emptySearchTitle', {
      resourceNamePlural: resourceName.plural
    }),
    description: i18n.translate('Polaris.IndexTable.emptySearchDescription'),
    withIllustration: true
  });
  const sharedMarkup = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(EventListener.EventListener, {
    event: "resize",
    handler: handleResize
  }), stickyHeaderMarkup);
  const condensedClassNames = css.classNames(IndexTable_module.default.CondensedList, hasZebraStriping && IndexTable_module.default.ZebraStriping);
  const bodyMarkup = condensed ? /*#__PURE__*/React.createElement(React.Fragment, null, sharedMarkup, /*#__PURE__*/React.createElement("ul", {
    "data-selectmode": Boolean(selectMode),
    className: condensedClassNames,
    ref: condensedListElement
  }, children)) : /*#__PURE__*/React.createElement(React.Fragment, null, sharedMarkup, /*#__PURE__*/React.createElement(ScrollContainer.ScrollContainer, {
    scrollableContainerRef: scrollableContainerElement,
    onScroll: handleScrollContainerScroll
  }, /*#__PURE__*/React.createElement("table", {
    ref: tableElement,
    className: tableClassNames
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    className: IndexTable_module.default.HeadingRow
  }, headingsMarkup)), /*#__PURE__*/React.createElement("tbody", {
    ref: tableBodyRef
  }, children))));
  const tableContentMarkup = itemCount > 0 ? bodyMarkup : /*#__PURE__*/React.createElement("div", {
    className: IndexTable_module.default.EmptySearchResultWrapper
  }, emptyStateMarkup);
  const paginationMarkup = pagination ? /*#__PURE__*/React.createElement("div", {
    className: IndexTable_module.default.PaginationWrapper
  }, /*#__PURE__*/React.createElement(Pagination.Pagination, Object.assign({
    type: "table"
  }, pagination))) : null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: IndexTable_module.default.IndexTable
  }, /*#__PURE__*/React.createElement("div", {
    className: IndexTable_module.default.IndexTableWrapper
  }, !condensed && loadingMarkup, tableContentMarkup, scrollBarMarkup, paginationMarkup)));
  function renderHeading(heading, index, Tag, tagProps, id) {
    const isSecond = index === 0;
    const isLast = index === headings.length - 1;
    const hasSortable = sortable?.some(value => value === true);
    const headingAlignment = heading.alignment || 'start';
    const headingContentClassName = css.classNames(IndexTable_module.default.TableHeading, headingAlignment === 'center' && IndexTable_module.default['TableHeading-align-center'], headingAlignment === 'end' && IndexTable_module.default['TableHeading-align-end'], hasSortable && IndexTable_module.default['TableHeading-sortable'], isSecond && IndexTable_module.default['TableHeading-second'], isLast && !heading.hidden && IndexTable_module.default['TableHeading-last'], !selectable && IndexTable_module.default['TableHeading-unselectable'], heading.flush && IndexTable_module.default['TableHeading-flush']);
    const stickyPositioningStyle = selectable !== false && isSecond && tableHeadingRects.current && tableHeadingRects.current.length > 0 ? {
      left: tableHeadingRects.current[0].offsetWidth
    } : undefined;
    const headingContent = /*#__PURE__*/React.createElement(Tag, Object.assign({
      id: id,
      className: headingContentClassName,
      key: getHeadingKey(heading),
      style: stickyPositioningStyle
    }, tagProps), renderHeadingContent(heading, index));
    if (index !== 0 || !selectable) {
      return headingContent;
    }
    const checkboxClassName = css.classNames(IndexTable_module.default.TableHeading, hasSortable && IndexTable_module.default['TableHeading-sortable'], index === 0 && IndexTable_module.default['TableHeading-first']);
    const checkboxContent = /*#__PURE__*/React.createElement(Tag, Object.assign({
      className: checkboxClassName,
      key: `${heading}-${index}`
    }, tagProps), renderCheckboxContent());
    return [checkboxContent, headingContent];
  }
  function renderCheckboxContent() {
    return /*#__PURE__*/React.createElement("div", {
      className: IndexTable_module.default.ColumnHeaderCheckboxWrapper
    }, /*#__PURE__*/React.createElement(Checkbox.Checkbox, {
      label: i18n.translate('Polaris.IndexTable.selectAllLabel', {
        resourceNamePlural: resourceName.plural
      }),
      labelHidden: true,
      onChange: handleSelectPage,
      checked: bulkSelectState
    }));
  }
  function handleSortHeadingClick(index, direction) {
    renderAfterSelectEvent.current = false;
    hasSelected.current = false;
    lastSortedColumnIndex.current = sortColumnIndex;
    onSort?.(index, direction);
  }
  function renderHeadingContent(heading, index) {
    let headingContent;
    const defaultTooltipProps = {
      width: heading.tooltipWidth ?? 'default',
      activatorWrapper: 'div',
      dismissOnMouseOut: true,
      persistOnClick: heading.tooltipPersistsOnClick
    };
    const defaultHeaderTooltipProps = {
      ...defaultTooltipProps,
      padding: '400',
      borderRadius: '200',
      content: heading.tooltipContent,
      preferredPosition: 'above'
    };
    const headingTitle = /*#__PURE__*/React.createElement(Text.Text, {
      as: "span",
      variant: "bodySm",
      fontWeight: "medium",
      visuallyHidden: heading.hidden
    }, heading.title);
    if (heading.new) {
      headingContent = /*#__PURE__*/React.createElement(LegacyStack.LegacyStack, {
        wrap: false,
        alignment: "center"
      }, headingTitle, /*#__PURE__*/React.createElement(Badge.Badge, {
        tone: "new"
      }, i18n.translate('Polaris.IndexTable.onboardingBadgeText')));
    } else {
      headingContent = headingTitle;
    }
    const style = {
      '--pc-index-table-heading-extra-padding-right': heading.paddingBlockEnd ? `var(--p-space-${heading.paddingBlockEnd})` : '0'
    };
    if (sortable?.[index]) {
      const isCurrentlySorted = index === sortColumnIndex;
      const isPreviouslySorted = !isCurrentlySorted && index === lastSortedColumnIndex.current;
      const isRenderAfterSelectEvent = renderAfterSelectEvent.current || !hasSelected.current && selectedItemsCount !== 0;
      const isAscending = sortDirection === 'ascending';
      let newDirection = heading.defaultSortDirection ?? defaultSortDirection;
      let SourceComponent = newDirection === 'ascending' ? polarisIcons.SortAscendingIcon : polarisIcons.SortDescendingIcon;
      if (isCurrentlySorted) {
        newDirection = isAscending ? 'descending' : 'ascending';
        SourceComponent = sortDirection === 'ascending' ? polarisIcons.SortAscendingIcon : polarisIcons.SortDescendingIcon;
      }
      const iconMarkup = /*#__PURE__*/React.createElement("span", {
        className: css.classNames(IndexTable_module.default.TableHeadingSortIcon, heading?.alignment === 'end' && IndexTable_module.default['TableHeadingSortIcon-heading-align-end'], isCurrentlySorted && IndexTable_module.default['TableHeadingSortIcon-visible'])
      }, /*#__PURE__*/React.createElement(SourceComponent, {
        focusable: "false",
        "aria-hidden": "true",
        className: IndexTable_module.default.TableHeadingSortSvg
      }));
      const defaultSortButtonProps = {
        onClick: () => handleSortHeadingClick(index, newDirection),
        className: css.classNames(IndexTable_module.default.TableHeadingSortButton, !isCurrentlySorted && heading?.alignment === 'end' && IndexTable_module.default['TableHeadingSortButton-heading-align-end'], isCurrentlySorted && heading?.alignment === 'end' && IndexTable_module.default['TableHeadingSortButton-heading-align-end-currently-sorted'], isPreviouslySorted && !isRenderAfterSelectEvent && heading?.alignment === 'end' && IndexTable_module.default['TableHeadingSortButton-heading-align-end-previously-sorted']),
        tabIndex: selectMode ? -1 : 0
      };
      const sortMarkup = /*#__PURE__*/React.createElement(UnstyledButton.UnstyledButton, defaultSortButtonProps, iconMarkup, /*#__PURE__*/React.createElement("span", {
        className: css.classNames(sortToggleLabels && selectMode && heading.tooltipContent && IndexTable_module.default.TableHeadingTooltipUnderlinePlaceholder)
      }, headingContent));
      if (!sortToggleLabels || selectMode) {
        return /*#__PURE__*/React.createElement("div", {
          className: IndexTable_module.default.SortableTableHeadingWithCustomMarkup
        }, sortMarkup);
      }
      const tooltipDirection = isCurrentlySorted ? sortDirection : newDirection;
      const sortTooltipContent = sortToggleLabels[index][tooltipDirection];
      if (!heading.tooltipContent) {
        return (
          /*#__PURE__*/
          // Regular header with sort icon and sort direction tooltip
          React.createElement("div", {
            style: style,
            className: css.classNames(heading.paddingBlockEnd && IndexTable_module.default['TableHeading-extra-padding-right'])
          }, /*#__PURE__*/React.createElement(Tooltip.Tooltip, Object.assign({}, defaultTooltipProps, {
            content: sortTooltipContent,
            preferredPosition: "above"
          }), sortMarkup))
        );
      }
      if (heading.tooltipContent) {
        return (
          /*#__PURE__*/
          // Header text and sort icon have separate tooltips
          React.createElement("div", {
            className: css.classNames(IndexTable_module.default.SortableTableHeadingWithCustomMarkup, heading.paddingBlockEnd && IndexTable_module.default['TableHeading-extra-padding-right']),
            style: style
          }, /*#__PURE__*/React.createElement(UnstyledButton.UnstyledButton, defaultSortButtonProps, /*#__PURE__*/React.createElement(Tooltip.Tooltip, defaultHeaderTooltipProps, /*#__PURE__*/React.createElement("span", {
            className: IndexTable_module.default.TableHeadingUnderline
          }, headingContent)), /*#__PURE__*/React.createElement(Tooltip.Tooltip, Object.assign({}, defaultTooltipProps, {
            content: sortTooltipContent,
            preferredPosition: "above"
          }), iconMarkup)))
        );
      }
    }
    if (heading.tooltipContent) {
      return (
        /*#__PURE__*/
        // Non-sortable header with tooltip
        React.createElement("div", {
          style: style,
          className: css.classNames(heading.paddingBlockEnd && IndexTable_module.default['TableHeading-extra-padding-right'])
        }, /*#__PURE__*/React.createElement(Tooltip.Tooltip, Object.assign({}, defaultHeaderTooltipProps, {
          activatorWrapper: "span"
        }), /*#__PURE__*/React.createElement("span", {
          className: css.classNames(IndexTable_module.default.TableHeadingUnderline, IndexTable_module.default.SortableTableHeaderWrapper)
        }, headingContent)))
      );
    }
    return /*#__PURE__*/React.createElement("div", {
      style: style,
      className: css.classNames(heading.paddingBlockEnd && IndexTable_module.default['TableHeading-extra-padding-right'])
    }, headingContent);
  }
  function handleSelectPage(checked) {
    handleSelectionChange(types.SelectionType.Page, checked);
  }
  function getPaginatedSelectAllAction() {
    if (!selectable || !hasMoreItems) {
      return;
    }
    const customActionText = paginatedSelectAllActionText ?? i18n.translate('Polaris.IndexTable.selectAllItems', {
      itemsLength: itemCount,
      resourceNamePlural: resourceName.plural.toLocaleLowerCase()
    });
    const actionText = selectedItemsCount === types.SELECT_ALL_ITEMS ? i18n.translate('Polaris.IndexTable.undo') : customActionText;
    return {
      content: actionText,
      onAction: handleSelectAllItemsInStore
    };
  }
  function handleSelectModeToggle() {
    handleSelectionChange(types.SelectionType.All, false);
  }
}
function getHeadingKey(heading) {
  if (heading.id) {
    return heading.id;
  } else if (typeof heading.title === 'string') {
    return heading.title;
  }
  return '';
}
function IndexTable({
  children,
  selectable = true,
  itemCount,
  selectedItemsCount = 0,
  resourceName: passedResourceName,
  loading,
  hasMoreItems,
  condensed,
  onSelectionChange,
  paginatedSelectAllText,
  ...indexTableBaseProps
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IndexProvider.IndexProvider, {
    selectable: selectable && !condensed,
    itemCount: itemCount,
    selectedItemsCount: selectedItemsCount,
    resourceName: passedResourceName,
    loading: loading,
    hasMoreItems: hasMoreItems,
    condensed: condensed,
    onSelectionChange: onSelectionChange,
    paginatedSelectAllText: paginatedSelectAllText
  }, /*#__PURE__*/React.createElement(IndexTableBase, indexTableBaseProps, children)));
}
IndexTable.Cell = Cell.Cell;
IndexTable.Row = Row.Row;

exports.IndexTable = IndexTable;
