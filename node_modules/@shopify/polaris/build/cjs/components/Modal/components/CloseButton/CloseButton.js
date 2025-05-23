'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var hooks = require('../../../../utilities/i18n/hooks.js');
var Button = require('../../../Button/Button.js');

function CloseButton({
  pressed,
  onClick
}) {
  const i18n = hooks.useI18n();
  return /*#__PURE__*/React.createElement(Button.Button, {
    variant: "tertiary",
    pressed: pressed,
    icon: polarisIcons.XIcon,
    onClick: onClick,
    accessibilityLabel: i18n.translate('Polaris.Common.close')
  });
}

exports.CloseButton = CloseButton;
