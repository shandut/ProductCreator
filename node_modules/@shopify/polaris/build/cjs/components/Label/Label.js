'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var Label_module = require('./Label.css.js');
var Text = require('../Text/Text.js');

function labelID(id) {
  return `${id}Label`;
}
function Label({
  children,
  id,
  hidden,
  requiredIndicator
}) {
  const className = css.classNames(Label_module.default.Label, hidden && Label_module.default.hidden);
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.createElement("label", {
    id: labelID(id),
    htmlFor: id,
    className: css.classNames(Label_module.default.Text, requiredIndicator && Label_module.default.RequiredIndicator)
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "bodyMd"
  }, children)));
}

exports.Label = Label;
exports.labelID = labelID;
