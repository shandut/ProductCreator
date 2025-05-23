'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var Cell_module = require('./Cell.css.js');

function Cell({
  area: gridArea,
  column,
  columnSpan,
  row,
  children
}) {
  const className = css.classNames(Cell_module.default.Cell, columnSpan?.xs && Cell_module.default[`Cell-${columnSpan.xs}-column-xs`], columnSpan?.sm && Cell_module.default[`Cell-${columnSpan.sm}-column-sm`], columnSpan?.md && Cell_module.default[`Cell-${columnSpan.md}-column-md`], columnSpan?.lg && Cell_module.default[`Cell-${columnSpan.lg}-column-lg`], columnSpan?.xl && Cell_module.default[`Cell-${columnSpan.xl}-column-xl`]);
  const style = {
    gridArea,
    '--pc-column-xs': column?.xs,
    '--pc-column-sm': column?.sm,
    '--pc-column-md': column?.md,
    '--pc-column-lg': column?.lg,
    '--pc-column-xl': column?.xl,
    '--pc-row-xs': row?.xs,
    '--pc-row-sm': row?.sm,
    '--pc-row-md': row?.md,
    '--pc-row-lg': row?.lg,
    '--pc-row-xl': row?.xl
  };
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: style
  }, children);
}

exports.Cell = Cell;
