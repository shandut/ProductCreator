'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../../../../../utilities/css.js');
var DirectionButton_module = require('./DirectionButton.css.js');
var UnstyledButton = require('../../../../../UnstyledButton/UnstyledButton.js');
var Icon = require('../../../../../Icon/Icon.js');
var Text = require('../../../../../Text/Text.js');

function DirectionButton({
  onClick,
  active,
  children,
  direction,
  value
}) {
  const classes = css.classNames(DirectionButton_module.default.DirectionButton, active && DirectionButton_module.default['DirectionButton-active']);
  function handleClick() {
    onClick([value]);
  }
  return /*#__PURE__*/React.createElement(UnstyledButton.UnstyledButton, {
    className: classes,
    onClick: handleClick
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: direction === 'asc' ? polarisIcons.ArrowUpIcon : polarisIcons.ArrowDownIcon,
    tone: "base"
  }), /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "bodySm",
    fontWeight: "medium"
  }, children));
}

exports.DirectionButton = DirectionButton;
