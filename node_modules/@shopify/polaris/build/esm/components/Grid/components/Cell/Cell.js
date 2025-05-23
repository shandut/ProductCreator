import React from 'react';
import { classNames } from '../../../../utilities/css.js';
import styles from './Cell.css.js';

function Cell({
  area: gridArea,
  column,
  columnSpan,
  row,
  children
}) {
  const className = classNames(styles.Cell, columnSpan?.xs && styles[`Cell-${columnSpan.xs}-column-xs`], columnSpan?.sm && styles[`Cell-${columnSpan.sm}-column-sm`], columnSpan?.md && styles[`Cell-${columnSpan.md}-column-md`], columnSpan?.lg && styles[`Cell-${columnSpan.lg}-column-lg`], columnSpan?.xl && styles[`Cell-${columnSpan.xl}-column-xl`]);
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

export { Cell };
