'use strict';

var React = require('react');
var useToggle = require('../../../../utilities/use-toggle.js');
var css = require('../../../../utilities/css.js');
var IndexTable_module = require('../../IndexTable.css.js');
var hooks = require('../../../../utilities/index-provider/hooks.js');
var types = require('../../../../utilities/index-provider/types.js');
var context = require('../../../../utilities/index-table/context.js');
var Cell = require('../Cell/Cell.js');
var Checkbox = require('../Checkbox/Checkbox.js');

const Row = /*#__PURE__*/React.memo(function Row({
  children,
  hideSelectable,
  selected,
  id,
  position,
  tone,
  disabled,
  selectionRange,
  rowType = 'data',
  accessibilityLabel,
  onNavigation,
  onClick
}) {
  const {
    selectable: tableIsSelectable,
    selectMode,
    condensed
  } = hooks.useIndexRow();
  const rowIsSelectable = tableIsSelectable && !hideSelectable;
  const onSelectionChange = hooks.useIndexSelectionChange();
  const {
    value: hovered,
    setTrue: setHoverIn,
    setFalse: setHoverOut
  } = useToggle.useToggle(false);
  const handleInteraction = React.useCallback(event => {
    event.stopPropagation();
    let selectionType = types.SelectionType.Single;
    if (disabled || !rowIsSelectable || 'key' in event && event.key !== ' ' || !onSelectionChange) return;
    if (event.nativeEvent.shiftKey) {
      selectionType = types.SelectionType.Multi;
    } else if (selectionRange) {
      selectionType = types.SelectionType.Range;
    }
    const selection = selectionRange ?? id;
    onSelectionChange(selectionType, !selected, selection, position);
  }, [id, onSelectionChange, selected, selectionRange, position, disabled, rowIsSelectable]);
  const contextValue = React.useMemo(() => ({
    itemId: id,
    selected,
    position,
    onInteraction: handleInteraction,
    disabled
  }), [id, selected, disabled, position, handleInteraction]);
  const primaryLinkElement = React.useRef(null);
  const isNavigating = React.useRef(false);
  const tableRowRef = React.useRef(null);
  const tableRowCallbackRef = React.useCallback(node => {
    tableRowRef.current = node;
    const el = node?.querySelector('[data-primary-link]');
    if (el) {
      primaryLinkElement.current = el;
    }
  }, []);
  const rowClassName = css.classNames(IndexTable_module.default.TableRow, rowType === 'subheader' && IndexTable_module.default['TableRow-subheader'], rowType === 'child' && IndexTable_module.default['TableRow-child'], rowIsSelectable && condensed && IndexTable_module.default.condensedRow, selected && IndexTable_module.default['TableRow-selected'], hovered && !condensed && IndexTable_module.default['TableRow-hovered'], disabled && IndexTable_module.default['TableRow-disabled'], tone && IndexTable_module.default[css.variationName('tone', tone)], !rowIsSelectable && !onClick && !primaryLinkElement.current && IndexTable_module.default['TableRow-unclickable']);
  let handleRowClick;
  if (!disabled && rowIsSelectable || onClick || primaryLinkElement.current) {
    handleRowClick = event => {
      if (rowType === 'subheader') return;
      if (!tableRowRef.current || isNavigating.current) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      if (onClick) {
        onClick();
        return;
      }
      if (primaryLinkElement.current && !selectMode) {
        isNavigating.current = true;
        const {
          ctrlKey,
          metaKey
        } = event.nativeEvent;
        if (onNavigation) {
          onNavigation(id);
        }
        if ((ctrlKey || metaKey) && primaryLinkElement.current instanceof HTMLAnchorElement) {
          isNavigating.current = false;
          window.open(primaryLinkElement.current.href, '_blank');
          return;
        }
        primaryLinkElement.current.dispatchEvent(new MouseEvent(event.type, event.nativeEvent));
      } else {
        isNavigating.current = false;
        handleInteraction(event);
      }
    };
  }
  const RowWrapper = condensed ? 'li' : 'tr';
  const checkboxMarkup = hideSelectable ? /*#__PURE__*/React.createElement(Cell.Cell, null) : /*#__PURE__*/React.createElement(Checkbox.Checkbox, {
    accessibilityLabel: accessibilityLabel
  });
  return /*#__PURE__*/React.createElement(context.RowContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(context.RowHoveredContext.Provider, {
    value: hovered
  }, /*#__PURE__*/React.createElement(RowWrapper, {
    key: id,
    id: id,
    className: rowClassName,
    onMouseEnter: setHoverIn,
    onMouseLeave: setHoverOut,
    onClick: handleRowClick,
    ref: tableRowCallbackRef
  }, tableIsSelectable ? checkboxMarkup : null, children)));
});

exports.Row = Row;
