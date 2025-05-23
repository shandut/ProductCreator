'use strict';

var React = require('react');
var useToggle = require('../../../../utilities/use-toggle.js');
var css = require('../../../../utilities/css.js');
var ButtonGroup_module = require('../../ButtonGroup.css.js');

function Item({
  button
}) {
  const {
    value: focused,
    setTrue: forceTrueFocused,
    setFalse: forceFalseFocused
  } = useToggle.useToggle(false);
  const className = css.classNames(ButtonGroup_module.default.Item, focused && ButtonGroup_module.default['Item-focused'], button.props.variant === 'plain' && ButtonGroup_module.default['Item-plain']);
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    onFocus: forceTrueFocused,
    onBlur: forceFalseFocused
  }, button);
}

exports.Item = Item;
