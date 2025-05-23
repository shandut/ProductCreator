'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var IndexTable_module = require('../../IndexTable.css.js');

const Cell = /*#__PURE__*/React.memo(function Cell({
  children,
  className: customClassName,
  flush,
  colSpan,
  headers,
  scope,
  as = 'td',
  id
}) {
  const className = css.classNames(customClassName, IndexTable_module.default.TableCell, flush && IndexTable_module.default['TableCell-flush']);
  return /*#__PURE__*/React.createElement(as, {
    id,
    colSpan,
    headers,
    scope,
    className
  }, children);
});

exports.Cell = Cell;
