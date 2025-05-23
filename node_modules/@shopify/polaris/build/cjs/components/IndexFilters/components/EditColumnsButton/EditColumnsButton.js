'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var hooks = require('../../../../utilities/i18n/hooks.js');
var Text = require('../../../Text/Text.js');
var Tooltip = require('../../../Tooltip/Tooltip.js');
var Button = require('../../../Button/Button.js');

function EditColumnsButton({
  onClick,
  disabled
}) {
  const i18n = hooks.useI18n();
  const tooltipContent = /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "bodyMd",
    alignment: "center"
  }, i18n.translate('Polaris.IndexFilters.EditColumnsButton.tooltip'));
  return /*#__PURE__*/React.createElement(Tooltip.Tooltip, {
    content: tooltipContent,
    preferredPosition: "above",
    hoverDelay: 400
  }, /*#__PURE__*/React.createElement(Button.Button, {
    size: "slim",
    onClick: onClick,
    disabled: disabled,
    icon: polarisIcons.LayoutColumns3Icon,
    accessibilityLabel: i18n.translate('Polaris.IndexFilters.EditColumnsButton.accessibilityLabel')
  }));
}

exports.EditColumnsButton = EditColumnsButton;
