'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var KeyboardKey_module = require('./KeyboardKey.css.js');

function KeyboardKey({
  children = '',
  size
}) {
  const key = !size && children.length > 1 ? children.toLowerCase() : children.toUpperCase();
  const className = css.classNames(KeyboardKey_module.default.KeyboardKey, size && KeyboardKey_module.default[size]);
  return /*#__PURE__*/React.createElement("kbd", {
    className: className
  }, key);
}

exports.KeyboardKey = KeyboardKey;
