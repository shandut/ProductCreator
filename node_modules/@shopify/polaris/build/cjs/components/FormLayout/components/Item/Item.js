'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var FormLayout_module = require('../../FormLayout.css.js');

function Item({
  children,
  condensed = false
}) {
  const className = css.classNames(FormLayout_module.default.Item, condensed ? FormLayout_module.default.condensed : FormLayout_module.default.grouped);
  return children ? /*#__PURE__*/React.createElement("div", {
    className: className
  }, children) : null;
}

exports.Item = Item;
