'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var useComponentDidMount = require('../../../../utilities/use-component-did-mount.js');
var BulkActions_module = require('../../BulkActions.css.js');
var Indicator = require('../../../Indicator/Indicator.js');
var Tooltip = require('../../../Tooltip/Tooltip.js');
var Button = require('../../../Button/Button.js');
var Icon = require('../../../Icon/Icon.js');

function BulkActionButton({
  handleMeasurement,
  url,
  external,
  onAction,
  content,
  disclosure,
  accessibilityLabel,
  disabled,
  destructive,
  indicator,
  showContentInButton,
  size
}) {
  const bulkActionButton = React.useRef(null);
  useComponentDidMount.useComponentDidMount(() => {
    if (handleMeasurement && bulkActionButton.current) {
      const width = bulkActionButton.current.getBoundingClientRect().width;
      handleMeasurement(width);
    }
  });
  const isActivatorForMoreActionsPopover = disclosure && !showContentInButton;
  const buttonContent = isActivatorForMoreActionsPopover ? undefined : content;
  const buttonMarkup = /*#__PURE__*/React.createElement(Button.Button, {
    external: external,
    url: url,
    accessibilityLabel: isActivatorForMoreActionsPopover ? content : accessibilityLabel,
    tone: destructive ? 'critical' : undefined,
    disclosure: disclosure && showContentInButton,
    onClick: onAction,
    disabled: disabled,
    size: size,
    icon: isActivatorForMoreActionsPopover ? /*#__PURE__*/React.createElement(Icon.Icon, {
      source: polarisIcons.MenuHorizontalIcon,
      tone: "base"
    }) : undefined
  }, buttonContent);
  return /*#__PURE__*/React.createElement("div", {
    className: BulkActions_module.default.BulkActionButton,
    ref: bulkActionButton
  }, isActivatorForMoreActionsPopover ? /*#__PURE__*/React.createElement(Tooltip.Tooltip, {
    content: content,
    preferredPosition: "below"
  }, buttonMarkup) : buttonMarkup, indicator && /*#__PURE__*/React.createElement(Indicator.Indicator, null));
}

exports.BulkActionButton = BulkActionButton;
