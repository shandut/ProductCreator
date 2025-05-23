'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var useToggle = require('../../../../utilities/use-toggle.js');
var Connected_module = require('../../Connected.css.js');

function Item({
  children,
  position
}) {
  const {
    value: focused,
    setTrue: forceTrueFocused,
    setFalse: forceFalseFocused
  } = useToggle.useToggle(false);
  const className = css.classNames(Connected_module.default.Item, focused && Connected_module.default['Item-focused'], position === 'primary' ? Connected_module.default['Item-primary'] : Connected_module.default['Item-connection']);
  return /*#__PURE__*/React.createElement("div", {
    onBlur: forceFalseFocused,
    onFocus: forceTrueFocused,
    className: className
  }, children);
}

exports.Item = Item;
