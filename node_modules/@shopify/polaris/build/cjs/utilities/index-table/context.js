'use strict';

var React = require('react');

const RowContext = /*#__PURE__*/React.createContext({});
const RowHoveredContext = /*#__PURE__*/React.createContext(undefined);
const scrollDefaultContext = {
  scrollableContainer: null,
  canScrollLeft: false,
  canScrollRight: false
};
const ScrollContext = /*#__PURE__*/React.createContext(scrollDefaultContext);

exports.RowContext = RowContext;
exports.RowHoveredContext = RowHoveredContext;
exports.ScrollContext = ScrollContext;
exports.scrollDefaultContext = scrollDefaultContext;
