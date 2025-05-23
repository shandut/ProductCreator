'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var LegacyStack_module = require('../../LegacyStack.css.js');

function Item({
  children,
  fill
}) {
  const className = css.classNames(LegacyStack_module.default.Item, fill && LegacyStack_module.default['Item-fill']);
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, children);
}

exports.Item = Item;
