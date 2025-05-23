'use strict';

var React = require('react');
var Grid_module = require('./Grid.css.js');
var Cell = require('./components/Cell/Cell.js');

const Grid = function Grid({
  gap,
  areas,
  children,
  columns
}) {
  const style = {
    '--pc-grid-gap-xs': gap?.xs,
    '--pc-grid-gap-sm': gap?.sm,
    '--pc-grid-gap-md': gap?.md,
    '--pc-grid-gap-lg': gap?.lg,
    '--pc-grid-gap-xl': gap?.xl,
    '--pc-grid-columns-xs': columns?.xs,
    '--pc-grid-columns-sm': columns?.sm,
    '--pc-grid-columns-md': columns?.md,
    '--pc-grid-columns-lg': columns?.lg,
    '--pc-grid-columns-xl': columns?.xl,
    '--pc-grid-areas-xs': formatAreas(areas?.xs),
    '--pc-grid-areas-sm': formatAreas(areas?.sm),
    '--pc-grid-areas-md': formatAreas(areas?.md),
    '--pc-grid-areas-lg': formatAreas(areas?.lg),
    '--pc-grid-areas-xl': formatAreas(areas?.xl)
  };
  return /*#__PURE__*/React.createElement("div", {
    className: Grid_module.default.Grid,
    style: style
  }, children);
};
function formatAreas(areas) {
  if (!areas) return;
  return `'${areas?.join(`' '`)}'`;
}
Grid.Cell = Cell.Cell;

exports.Grid = Grid;
exports.formatAreas = formatAreas;
