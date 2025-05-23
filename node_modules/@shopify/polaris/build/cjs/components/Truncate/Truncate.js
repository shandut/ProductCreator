'use strict';

var React = require('react');
var Truncate_module = require('./Truncate.css.js');

function Truncate({
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: Truncate_module.default.Truncate
  }, children);
}

exports.Truncate = Truncate;
