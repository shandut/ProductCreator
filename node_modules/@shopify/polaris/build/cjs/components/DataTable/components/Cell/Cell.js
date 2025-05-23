'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../../../utilities/css.js');
var shared = require('../../../shared.js');
var DataTable_module = require('../../DataTable.css.js');
var hooks = require('../../../../utilities/i18n/hooks.js');
var Tooltip = require('../../../Tooltip/Tooltip.js');
var Icon = require('../../../Icon/Icon.js');

function Cell({
  content,
  contentType,
  nthColumn,
  firstColumn,
  truncate,
  header,
  total,
  totalInFooter,
  sorted,
  sortable,
  sortDirection,
  inFixedNthColumn,
  verticalAlign = 'top',
  defaultSortDirection = 'ascending',
  onSort,
  colSpan,
  setRef = () => {},
  stickyHeadingCell = false,
  stickyCellWidth,
  hovered = false,
  handleFocus = () => {},
  hasFixedNthColumn = false,
  fixedCellVisible = false,
  firstColumnMinWidth,
  style,
  lastFixedFirstColumn
}) {
  const i18n = hooks.useI18n();
  const numeric = contentType === 'numeric';
  const className = css.classNames(DataTable_module.default.Cell, DataTable_module.default[`Cell-${css.variationName('verticalAlign', verticalAlign)}`], firstColumn && DataTable_module.default['Cell-firstColumn'], truncate && DataTable_module.default['Cell-truncated'], header && DataTable_module.default['Cell-header'], total && DataTable_module.default['Cell-total'], totalInFooter && DataTable_module.default['Cell-total-footer'], numeric && DataTable_module.default['Cell-numeric'], sortable && DataTable_module.default['Cell-sortable'], sorted && DataTable_module.default['Cell-sorted'], stickyHeadingCell && DataTable_module.default.StickyHeaderCell, hovered && DataTable_module.default['Cell-hovered'], lastFixedFirstColumn && inFixedNthColumn && fixedCellVisible && DataTable_module.default['Cell-separate'], nthColumn && inFixedNthColumn && stickyHeadingCell && DataTable_module.default.FixedFirstColumn);
  const headerClassName = css.classNames(header && DataTable_module.default.Heading, header && contentType === 'text' && DataTable_module.default['Heading-left']);
  const iconClassName = css.classNames(sortable && DataTable_module.default.Icon);
  const direction = sorted && sortDirection ? sortDirection : defaultSortDirection;
  const source = direction === 'descending' ? polarisIcons.SortDescendingIcon : polarisIcons.SortAscendingIcon;
  const oppositeDirection = sortDirection === 'ascending' ? 'descending' : 'ascending';
  const sortAccessibilityLabel = i18n.translate('Polaris.DataTable.sortAccessibilityLabel', {
    direction: sorted ? oppositeDirection : direction
  });
  const iconMarkup = /*#__PURE__*/React.createElement("span", {
    className: iconClassName
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: source,
    accessibilityLabel: sortAccessibilityLabel
  }));
  const focusable = !(stickyHeadingCell && hasFixedNthColumn && nthColumn && !inFixedNthColumn);
  const sortableHeadingContent = /*#__PURE__*/React.createElement("button", {
    className: headerClassName,
    onClick: onSort,
    onFocus: handleFocus,
    tabIndex: focusable ? 0 : -1
  }, iconMarkup, content);
  const columnHeadingContent = sortable ? sortableHeadingContent : content;
  const colSpanProp = colSpan && colSpan > 1 ? {
    colSpan
  } : {};
  const minWidthStyles = nthColumn && firstColumnMinWidth ? {
    minWidth: firstColumnMinWidth
  } : {
    minWidth: stickyCellWidth
  };
  const stickyHeading = /*#__PURE__*/React.createElement("th", Object.assign({
    ref: setRef
  }, shared.headerCell.props, colSpanProp, {
    className: className,
    "aria-sort": sortDirection,
    style: {
      ...style,
      ...minWidthStyles
    },
    "data-index-table-sticky-heading": true
  }), columnHeadingContent);
  const headingMarkup = header ? /*#__PURE__*/React.createElement("th", Object.assign({}, shared.headerCell.props, {
    "aria-sort": sortDirection
  }, colSpanProp, {
    ref: setRef,
    className: className,
    scope: "col",
    style: {
      ...minWidthStyles
    }
  }), columnHeadingContent) : /*#__PURE__*/React.createElement("th", Object.assign({}, colSpanProp, {
    ref: setRef,
    className: className,
    scope: "row",
    style: {
      ...minWidthStyles
    }
  }), truncate ? /*#__PURE__*/React.createElement(TruncatedText, {
    className: DataTable_module.default.TooltipContent
  }, content) : content);
  const cellMarkup = header || firstColumn || nthColumn ? headingMarkup : /*#__PURE__*/React.createElement("td", Object.assign({
    className: className
  }, colSpanProp), content);
  return stickyHeadingCell ? stickyHeading : cellMarkup;
}
const TruncatedText = ({
  children,
  className = ''
}) => {
  const textRef = React.useRef(null);
  const {
    current
  } = textRef;
  const text = /*#__PURE__*/React.createElement("span", {
    ref: textRef,
    className: className
  }, children);
  return current?.scrollWidth > current?.offsetWidth ? /*#__PURE__*/React.createElement(Tooltip.Tooltip, {
    content: textRef.current.innerText
  }, text) : text;
};

exports.Cell = Cell;
