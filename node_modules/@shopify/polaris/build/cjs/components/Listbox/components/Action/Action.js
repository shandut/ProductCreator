'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var context = require('../../../../utilities/listbox/context.js');
var Action_module = require('./Action.css.js');
var Option = require('../Option/Option.js');
var TextOption = require('../TextOption/TextOption.js');
var Icon = require('../../../Icon/Icon.js');

function Action(props) {
  const {
    selected,
    disabled,
    children,
    icon,
    divider
  } = props;
  const iconMarkup = icon && /*#__PURE__*/React.createElement("div", {
    className: Action_module.default.Icon
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    tone: "subdued",
    source: icon
  }));
  const className = css.classNames(Action_module.default.Action, divider && Action_module.default.ActionDivider);
  return /*#__PURE__*/React.createElement(context.ActionContext.Provider, {
    value: true
  }, /*#__PURE__*/React.createElement(Option.Option, props, /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.createElement(TextOption.TextOption, {
    selected: selected,
    disabled: disabled
  }, iconMarkup, children))));
}

exports.Action = Action;
