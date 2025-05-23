import React, { useRef } from 'react';
import { SortDescendingIcon, SortAscendingIcon } from '@shopify/polaris-icons';
import { classNames, variationName } from '../../../../utilities/css.js';
import { headerCell } from '../../../shared.js';
import styles from '../../DataTable.css.js';
import { useI18n } from '../../../../utilities/i18n/hooks.js';
import { Tooltip } from '../../../Tooltip/Tooltip.js';
import { Icon } from '../../../Icon/Icon.js';

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
  const i18n = useI18n();
  const numeric = contentType === 'numeric';
  const className = classNames(styles.Cell, styles[`Cell-${variationName('verticalAlign', verticalAlign)}`], firstColumn && styles['Cell-firstColumn'], truncate && styles['Cell-truncated'], header && styles['Cell-header'], total && styles['Cell-total'], totalInFooter && styles['Cell-total-footer'], numeric && styles['Cell-numeric'], sortable && styles['Cell-sortable'], sorted && styles['Cell-sorted'], stickyHeadingCell && styles.StickyHeaderCell, hovered && styles['Cell-hovered'], lastFixedFirstColumn && inFixedNthColumn && fixedCellVisible && styles['Cell-separate'], nthColumn && inFixedNthColumn && stickyHeadingCell && styles.FixedFirstColumn);
  const headerClassName = classNames(header && styles.Heading, header && contentType === 'text' && styles['Heading-left']);
  const iconClassName = classNames(sortable && styles.Icon);
  const direction = sorted && sortDirection ? sortDirection : defaultSortDirection;
  const source = direction === 'descending' ? SortDescendingIcon : SortAscendingIcon;
  const oppositeDirection = sortDirection === 'ascending' ? 'descending' : 'ascending';
  const sortAccessibilityLabel = i18n.translate('Polaris.DataTable.sortAccessibilityLabel', {
    direction: sorted ? oppositeDirection : direction
  });
  const iconMarkup = /*#__PURE__*/React.createElement("span", {
    className: iconClassName
  }, /*#__PURE__*/React.createElement(Icon, {
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
  }, headerCell.props, colSpanProp, {
    className: className,
    "aria-sort": sortDirection,
    style: {
      ...style,
      ...minWidthStyles
    },
    "data-index-table-sticky-heading": true
  }), columnHeadingContent);
  const headingMarkup = header ? /*#__PURE__*/React.createElement("th", Object.assign({}, headerCell.props, {
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
    className: styles.TooltipContent
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
  const textRef = useRef(null);
  const {
    current
  } = textRef;
  const text = /*#__PURE__*/React.createElement("span", {
    ref: textRef,
    className: className
  }, children);
  return current?.scrollWidth > current?.offsetWidth ? /*#__PURE__*/React.createElement(Tooltip, {
    content: textRef.current.innerText
  }, text) : text;
};

export { Cell };
