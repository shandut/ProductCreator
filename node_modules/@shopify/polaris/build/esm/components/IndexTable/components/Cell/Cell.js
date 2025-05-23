import React, { memo } from 'react';
import { classNames } from '../../../../utilities/css.js';
import styles from '../../IndexTable.css.js';

const Cell = /*#__PURE__*/memo(function Cell({
  children,
  className: customClassName,
  flush,
  colSpan,
  headers,
  scope,
  as = 'td',
  id
}) {
  const className = classNames(customClassName, styles.TableCell, flush && styles['TableCell-flush']);
  return /*#__PURE__*/React.createElement(as, {
    id,
    colSpan,
    headers,
    scope,
    className
  }, children);
});

export { Cell };
