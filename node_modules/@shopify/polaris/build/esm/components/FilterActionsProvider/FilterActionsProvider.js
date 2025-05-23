import React, { createContext } from 'react';

const FilterActionsContext = /*#__PURE__*/createContext(false);
function FilterActionsProvider({
  children,
  filterActions
}) {
  return /*#__PURE__*/React.createElement(FilterActionsContext.Provider, {
    value: filterActions
  }, children);
}

export { FilterActionsContext, FilterActionsProvider };
