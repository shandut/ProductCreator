'use strict';

var React = require('react');
var InlineCode_module = require('./InlineCode.css.js');

const InlineCode = ({
  children
}) => /*#__PURE__*/React.createElement("code", {
  className: InlineCode_module.default.Code
}, children);

exports.InlineCode = InlineCode;
