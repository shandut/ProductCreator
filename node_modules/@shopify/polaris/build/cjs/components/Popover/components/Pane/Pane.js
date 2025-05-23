'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var components = require('../../../../utilities/components.js');
var Popover_module = require('../../Popover.css.js');
var Section = require('../Section/Section.js');
var Scrollable = require('../../../Scrollable/Scrollable.js');

function Pane({
  captureOverscroll = false,
  fixed,
  sectioned,
  children,
  height,
  maxHeight,
  minHeight,
  subdued,
  onScrolledToBottom
}) {
  const className = css.classNames(Popover_module.default.Pane, fixed && Popover_module.default['Pane-fixed'], subdued && Popover_module.default['Pane-subdued'], captureOverscroll && Popover_module.default['Pane-captureOverscroll']);
  const content = sectioned ? components.wrapWithComponent(children, Section.Section, {}) : children;
  const style = {
    height,
    maxHeight,
    minHeight
  };
  return fixed ? /*#__PURE__*/React.createElement("div", {
    style: style,
    className: className
  }, content) : /*#__PURE__*/React.createElement(Scrollable.Scrollable, {
    shadow: true,
    className: className,
    style: style,
    onScrolledToBottom: onScrolledToBottom,
    scrollbarWidth: "thin"
  }, content);
}

exports.Pane = Pane;
