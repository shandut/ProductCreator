'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var Indicator_module = require('./Indicator.css.js');

function Indicator({
  pulse = true
}) {
  const className = css.classNames(Indicator_module.default.Indicator, pulse && Indicator_module.default.pulseIndicator);
  return /*#__PURE__*/React.createElement("span", {
    className: className
  });
}

exports.Indicator = Indicator;
