'use strict';

var React = require('react');
var List_module = require('../../List.css.js');

function Item({
  children
}) {
  return /*#__PURE__*/React.createElement("li", {
    className: List_module.default.Item
  }, children);
}

exports.Item = Item;
