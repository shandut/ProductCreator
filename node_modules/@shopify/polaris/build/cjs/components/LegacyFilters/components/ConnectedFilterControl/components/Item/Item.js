'use strict';

var React = require('react');
var css = require('../../../../../../utilities/css.js');
var useToggle = require('../../../../../../utilities/use-toggle.js');
var ConnectedFilterControl_module = require('../../ConnectedFilterControl.css.js');

function Item({
  children
}) {
  const {
    value: focused,
    setTrue: forceTrueFocused,
    setFalse: forceFalseFocused
  } = useToggle.useToggle(false);
  const className = css.classNames(ConnectedFilterControl_module.default.Item, focused && ConnectedFilterControl_module.default['Item-focused']);
  return /*#__PURE__*/React.createElement("div", {
    onBlur: forceFalseFocused,
    onFocus: forceTrueFocused,
    className: className
  }, children);
}

exports.Item = Item;
