'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var components = require('../../utilities/components.js');
var ButtonGroup_module = require('./ButtonGroup.css.js');
var Item = require('./components/Item/Item.js');

function ButtonGroup({
  children,
  gap,
  variant,
  fullWidth,
  connectedTop,
  noWrap
}) {
  const className = css.classNames(ButtonGroup_module.default.ButtonGroup, gap && ButtonGroup_module.default[gap], variant && ButtonGroup_module.default[css.variationName('variant', variant)], fullWidth && ButtonGroup_module.default.fullWidth, noWrap && ButtonGroup_module.default.noWrap);
  const contents = components.elementChildren(children).map((child, index) => /*#__PURE__*/React.createElement(Item.Item, {
    button: child,
    key: index
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    "data-buttongroup-variant": variant,
    "data-buttongroup-connected-top": connectedTop,
    "data-buttongroup-full-width": fullWidth,
    "data-buttongroup-no-wrap": noWrap
  }, contents);
}

exports.ButtonGroup = ButtonGroup;
