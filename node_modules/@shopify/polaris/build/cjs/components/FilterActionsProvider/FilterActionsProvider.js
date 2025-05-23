'use strict';

var React = require('react');

const FilterActionsContext = /*#__PURE__*/React.createContext(false);
function FilterActionsProvider({
  children,
  filterActions
}) {
  return /*#__PURE__*/React.createElement(FilterActionsContext.Provider, {
    value: filterActions
  }, children);
}

exports.FilterActionsContext = FilterActionsContext;
exports.FilterActionsProvider = FilterActionsProvider;
