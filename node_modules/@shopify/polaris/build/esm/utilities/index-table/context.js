import { createContext } from 'react';

const RowContext = /*#__PURE__*/createContext({});
const RowHoveredContext = /*#__PURE__*/createContext(undefined);
const scrollDefaultContext = {
  scrollableContainer: null,
  canScrollLeft: false,
  canScrollRight: false
};
const ScrollContext = /*#__PURE__*/createContext(scrollDefaultContext);

export { RowContext, RowHoveredContext, ScrollContext, scrollDefaultContext };
