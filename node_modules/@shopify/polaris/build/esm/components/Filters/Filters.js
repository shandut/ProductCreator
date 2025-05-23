import React from 'react';
import { classNames } from '../../utilities/css.js';
import styles from './Filters.css.js';
import { SearchField } from './components/SearchField/SearchField.js';
import { FiltersBar } from './components/FiltersBar/FiltersBar.js';
import { Box } from '../Box/Box.js';
import { InlineStack } from '../InlineStack/InlineStack.js';

const TRANSITION_DURATION = 'var(--p-motion-duration-150)';
const TRANSITION_MARGIN = '-36px';
const defaultStyle = {
  transition: `opacity ${TRANSITION_DURATION} var(--p-motion-ease)`,
  opacity: 0
};
const transitionStyles = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  },
  exiting: {
    opacity: 0
  },
  exited: {
    opacity: 0
  },
  unmounted: {
    opacity: 0
  }
};
const defaultFilterStyles = {
  transition: `opacity ${TRANSITION_DURATION} var(--p-motion-ease), margin ${TRANSITION_DURATION} var(--p-motion-ease)`,
  opacity: 0,
  marginTop: TRANSITION_MARGIN
};
const transitionFilterStyles = {
  entering: {
    opacity: 1,
    marginTop: 0
  },
  entered: {
    opacity: 1,
    marginTop: 0
  },
  exiting: {
    opacity: 0,
    marginTop: TRANSITION_MARGIN
  },
  exited: {
    opacity: 0,
    marginTop: TRANSITION_MARGIN
  },
  unmounted: {
    opacity: 0,
    marginTop: TRANSITION_MARGIN
  }
};
function Filters({
  queryValue,
  queryPlaceholder,
  focused,
  filters,
  appliedFilters,
  onQueryChange,
  onQueryClear,
  onQueryBlur,
  onQueryFocus,
  onClearAll,
  children,
  disabled,
  hideFilters,
  hideQueryField,
  disableQueryField,
  borderlessQueryField,
  loading,
  disableFilters,
  mountedState,
  onAddFilterClick,
  closeOnChildOverlayClick,
  selectedViewName
}) {
  const hideFilterBar = hideFilters || filters.length === 0;
  const queryFieldMarkup = hideQueryField ? null : /*#__PURE__*/React.createElement("div", {
    className: styles.Container
  }, /*#__PURE__*/React.createElement(Box, {
    padding: "200"
  }, /*#__PURE__*/React.createElement(InlineStack, {
    align: "start",
    blockAlign: "center",
    gap: {
      xs: '400',
      md: '300'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.SearchField,
    style: mountedState ? {
      ...defaultStyle,
      ...transitionStyles[mountedState]
    } : undefined
  }, /*#__PURE__*/React.createElement(SearchField, {
    onChange: onQueryChange,
    onFocus: onQueryFocus,
    onBlur: onQueryBlur,
    onClear: onQueryClear,
    value: queryValue,
    placeholder: queryPlaceholder,
    focused: focused,
    disabled: disabled || disableQueryField,
    borderlessQueryField: borderlessQueryField,
    loading: loading,
    selectedViewName: selectedViewName
  })), children)));
  const mountedStateStyles = mountedState && !hideQueryField ? {
    ...defaultFilterStyles,
    ...transitionFilterStyles[mountedState]
  } : undefined;
  const filtersMarkup = hideFilterBar ? null : /*#__PURE__*/React.createElement(FiltersBar, {
    filters: filters,
    appliedFilters: appliedFilters,
    onClearAll: onClearAll,
    disabled: disabled,
    hideQueryField: hideQueryField,
    disableFilters: disableFilters,
    onAddFilterClick: onAddFilterClick,
    closeOnChildOverlayClick: closeOnChildOverlayClick,
    mountedStateStyles: mountedStateStyles
  }, children);
  return /*#__PURE__*/React.createElement("div", {
    className: classNames(styles.Filters, hideQueryField && styles.hideQueryField)
  }, queryFieldMarkup, filtersMarkup);
}

export { Filters };
