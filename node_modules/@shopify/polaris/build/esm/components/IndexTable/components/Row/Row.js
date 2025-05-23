import React, { memo, useCallback, useMemo, useRef } from 'react';
import { useToggle } from '../../../../utilities/use-toggle.js';
import { classNames, variationName } from '../../../../utilities/css.js';
import styles from '../../IndexTable.css.js';
import { useIndexRow, useIndexSelectionChange } from '../../../../utilities/index-provider/hooks.js';
import { SelectionType } from '../../../../utilities/index-provider/types.js';
import { RowContext, RowHoveredContext } from '../../../../utilities/index-table/context.js';
import { Cell } from '../Cell/Cell.js';
import { Checkbox } from '../Checkbox/Checkbox.js';

const Row = /*#__PURE__*/memo(function Row({
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
  } = useIndexRow();
  const rowIsSelectable = tableIsSelectable && !hideSelectable;
  const onSelectionChange = useIndexSelectionChange();
  const {
    value: hovered,
    setTrue: setHoverIn,
    setFalse: setHoverOut
  } = useToggle(false);
  const handleInteraction = useCallback(event => {
    event.stopPropagation();
    let selectionType = SelectionType.Single;
    if (disabled || !rowIsSelectable || 'key' in event && event.key !== ' ' || !onSelectionChange) return;
    if (event.nativeEvent.shiftKey) {
      selectionType = SelectionType.Multi;
    } else if (selectionRange) {
      selectionType = SelectionType.Range;
    }
    const selection = selectionRange ?? id;
    onSelectionChange(selectionType, !selected, selection, position);
  }, [id, onSelectionChange, selected, selectionRange, position, disabled, rowIsSelectable]);
  const contextValue = useMemo(() => ({
    itemId: id,
    selected,
    position,
    onInteraction: handleInteraction,
    disabled
  }), [id, selected, disabled, position, handleInteraction]);
  const primaryLinkElement = useRef(null);
  const isNavigating = useRef(false);
  const tableRowRef = useRef(null);
  const tableRowCallbackRef = useCallback(node => {
    tableRowRef.current = node;
    const el = node?.querySelector('[data-primary-link]');
    if (el) {
      primaryLinkElement.current = el;
    }
  }, []);
  const rowClassName = classNames(styles.TableRow, rowType === 'subheader' && styles['TableRow-subheader'], rowType === 'child' && styles['TableRow-child'], rowIsSelectable && condensed && styles.condensedRow, selected && styles['TableRow-selected'], hovered && !condensed && styles['TableRow-hovered'], disabled && styles['TableRow-disabled'], tone && styles[variationName('tone', tone)], !rowIsSelectable && !onClick && !primaryLinkElement.current && styles['TableRow-unclickable']);
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
  const checkboxMarkup = hideSelectable ? /*#__PURE__*/React.createElement(Cell, null) : /*#__PURE__*/React.createElement(Checkbox, {
    accessibilityLabel: accessibilityLabel
  });
  return /*#__PURE__*/React.createElement(RowContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(RowHoveredContext.Provider, {
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

export { Row };
