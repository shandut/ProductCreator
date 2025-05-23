'use strict';

var React = require('react');
var MessageIndicator_module = require('./MessageIndicator.css.js');

function MessageIndicator({
  children,
  active
}) {
  const indicatorMarkup = active && /*#__PURE__*/React.createElement("div", {
    className: MessageIndicator_module.default.MessageIndicator
  });
  return /*#__PURE__*/React.createElement("div", {
    className: MessageIndicator_module.default.MessageIndicatorWrapper
  }, indicatorMarkup, children);
}

exports.MessageIndicator = MessageIndicator;
