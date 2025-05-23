'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var TextField_module = require('../../TextField.css.js');
var Icon = require('../../../Icon/Icon.js');

const Spinner = /*#__PURE__*/React.forwardRef(function Spinner({
  onChange,
  onClick,
  onMouseDown,
  onMouseUp,
  onBlur
}, ref) {
  function handleStep(step) {
    return () => onChange(step);
  }
  function handleMouseDown(onChange) {
    return event => {
      if (event.button !== 0) return;
      onMouseDown?.(onChange);
    };
  }
  return /*#__PURE__*/React.createElement("div", {
    className: TextField_module.default.Spinner,
    onClick: onClick,
    "aria-hidden": true,
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    role: "button",
    className: TextField_module.default.Segment,
    tabIndex: -1,
    onClick: handleStep(1),
    onMouseDown: handleMouseDown(handleStep(1)),
    onMouseUp: onMouseUp,
    onBlur: onBlur
  }, /*#__PURE__*/React.createElement("div", {
    className: TextField_module.default.SpinnerIcon
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.ChevronUpIcon
  }))), /*#__PURE__*/React.createElement("div", {
    role: "button",
    className: TextField_module.default.Segment,
    tabIndex: -1,
    onClick: handleStep(-1),
    onMouseDown: handleMouseDown(handleStep(-1)),
    onMouseUp: onMouseUp,
    onBlur: onBlur
  }, /*#__PURE__*/React.createElement("div", {
    className: TextField_module.default.SpinnerIcon
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.ChevronDownIcon
  }))));
});

exports.Spinner = Spinner;
