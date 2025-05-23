'use strict';

var React = require('react');
var DatePicker_module = require('../../DatePicker.css.js');
var Text = require('../../../Text/Text.js');

const Weekday = /*#__PURE__*/React.memo(function Weekday({
  label,
  title,
  current
}) {
  return /*#__PURE__*/React.createElement("th", {
    "aria-label": label,
    scope: "col",
    className: DatePicker_module.default.Weekday
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "bodySm",
    alignment: "center",
    fontWeight: current ? 'bold' : 'regular',
    tone: !current ? 'subdued' : undefined
  }, title));
});

exports.Weekday = Weekday;
