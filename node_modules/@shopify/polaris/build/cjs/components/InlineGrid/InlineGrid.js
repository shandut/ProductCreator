'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var InlineGrid_module = require('./InlineGrid.css.js');

function InlineGrid({
  children,
  columns,
  gap,
  alignItems
}) {
  const style = {
    ...css.getResponsiveValue('inline-grid', 'grid-template-columns', formatInlineGrid(columns)),
    ...css.getResponsiveProps('inline-grid', 'gap', 'space', gap),
    '--pc-inline-grid-align-items': alignItems
  };
  return /*#__PURE__*/React.createElement("div", {
    className: InlineGrid_module.default.InlineGrid,
    style: css.sanitizeCustomProperties(style)
  }, children);
}
function formatInlineGrid(columns) {
  if (typeof columns === 'object' && columns !== null && !Array.isArray(columns)) {
    return Object.fromEntries(Object.entries(columns).map(([breakpointAlias, breakpointInlineGrid]) => [breakpointAlias, getColumnValue(breakpointInlineGrid)]));
  }
  return getColumnValue(columns);
}
function getColumnValue(columns) {
  if (!columns) return undefined;
  if (typeof columns === 'number' || !isNaN(Number(columns))) {
    return `repeat(${Number(columns)}, minmax(0, 1fr))`;
  }
  if (typeof columns === 'string') return columns;
  return columns.map(column => {
    switch (column) {
      case 'oneThird':
        return 'minmax(0, 1fr)';
      case 'oneHalf':
        return 'minmax(0, 1fr)';
      case 'twoThirds':
        return 'minmax(0, 2fr)';
    }
  }).join(' ');
}

exports.InlineGrid = InlineGrid;
