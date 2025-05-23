'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../utilities/css.js');
var CalloutCard_module = require('./CalloutCard.css.js');
var LegacyCard = require('../LegacyCard/LegacyCard.js');
var hooks = require('../../utilities/i18n/hooks.js');
var utils = require('../Button/utils.js');
var Button = require('../Button/Button.js');
var Text = require('../Text/Text.js');
var BlockStack = require('../BlockStack/BlockStack.js');
var Image = require('../Image/Image.js');
var ButtonGroup = require('../ButtonGroup/ButtonGroup.js');

function CalloutCard({
  title,
  children,
  illustration,
  primaryAction,
  secondaryAction,
  onDismiss
}) {
  const i18n = hooks.useI18n();
  const primaryActionMarkup = utils.buttonFrom(primaryAction);
  const secondaryActionMarkup = secondaryAction ? utils.buttonFrom(secondaryAction, {
    variant: secondaryAction.variant ?? 'tertiary'
  }) : null;
  const buttonMarkup = secondaryActionMarkup ? /*#__PURE__*/React.createElement(ButtonGroup.ButtonGroup, null, primaryActionMarkup, secondaryActionMarkup) : primaryActionMarkup;
  const dismissButton = onDismiss ? /*#__PURE__*/React.createElement("div", {
    className: CalloutCard_module.default.Dismiss
  }, /*#__PURE__*/React.createElement(Button.Button, {
    variant: "tertiary",
    icon: polarisIcons.XIcon,
    onClick: onDismiss,
    accessibilityLabel: i18n.translate('Polaris.Banner.dismissButton')
  })) : null;
  const imageClassName = css.classNames(CalloutCard_module.default.Image, onDismiss && CalloutCard_module.default.DismissImage);
  const containerClassName = css.classNames(CalloutCard_module.default.Container, onDismiss && CalloutCard_module.default.hasDismiss);
  return /*#__PURE__*/React.createElement(LegacyCard.LegacyCard, null, /*#__PURE__*/React.createElement("div", {
    className: containerClassName
  }, dismissButton, /*#__PURE__*/React.createElement(LegacyCard.LegacyCard.Section, null, /*#__PURE__*/React.createElement("div", {
    className: CalloutCard_module.default.CalloutCard
  }, /*#__PURE__*/React.createElement("div", {
    className: CalloutCard_module.default.Content
  }, /*#__PURE__*/React.createElement("div", {
    className: CalloutCard_module.default.Title
  }, /*#__PURE__*/React.createElement(Text.Text, {
    variant: "headingSm",
    as: "h2"
  }, title)), /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "bodyMd"
  }, /*#__PURE__*/React.createElement(BlockStack.BlockStack, null, children)), /*#__PURE__*/React.createElement("div", {
    className: CalloutCard_module.default.Buttons
  }, buttonMarkup)), /*#__PURE__*/React.createElement(Image.Image, {
    alt: "",
    className: imageClassName,
    source: illustration
  })))));
}

exports.CalloutCard = CalloutCard;
