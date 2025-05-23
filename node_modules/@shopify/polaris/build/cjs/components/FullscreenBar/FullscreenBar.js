'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var FullscreenBar_module = require('./FullscreenBar.css.js');
var hooks = require('../../utilities/i18n/hooks.js');
var Text = require('../Text/Text.js');
var Icon = require('../Icon/Icon.js');

function FullscreenBar({
  onAction,
  children
}) {
  const i18n = hooks.useI18n();
  const backButtonMarkup = /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "bodyLg"
  }, i18n.translate('Polaris.FullscreenBar.back'));
  return /*#__PURE__*/React.createElement("div", {
    className: FullscreenBar_module.default.FullscreenBar
  }, /*#__PURE__*/React.createElement("button", {
    className: FullscreenBar_module.default.BackAction,
    onClick: onAction,
    "aria-label": i18n.translate('Polaris.FullscreenBar.accessibilityLabel')
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.ExitIcon
  }), backButtonMarkup), children);
}

exports.FullscreenBar = FullscreenBar;
