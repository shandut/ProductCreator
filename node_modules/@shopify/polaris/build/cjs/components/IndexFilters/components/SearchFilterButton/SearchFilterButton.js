'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var Tooltip = require('../../../Tooltip/Tooltip.js');
var Button = require('../../../Button/Button.js');
var Text = require('../../../Text/Text.js');
var InlineStack = require('../../../InlineStack/InlineStack.js');
var Icon = require('../../../Icon/Icon.js');

function SearchFilterButton({
  onClick,
  label,
  disabled,
  tooltipContent,
  disclosureZIndexOverride,
  style,
  hideFilters,
  hideQueryField
}) {
  const iconMarkup = /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    gap: "0"
  }, hideQueryField ? null : /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.SearchIcon,
    tone: "base"
  }), hideFilters ? null : /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.FilterIcon,
    tone: "base"
  }));
  const activator = /*#__PURE__*/React.createElement("div", {
    style: style
  }, /*#__PURE__*/React.createElement(Button.Button, {
    size: "slim",
    onClick: onClick,
    disabled: disabled,
    icon: iconMarkup,
    accessibilityLabel: label
  }));
  const content = /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "bodyMd",
    alignment: "center"
  }, tooltipContent);
  return /*#__PURE__*/React.createElement(Tooltip.Tooltip, {
    content: content,
    preferredPosition: "above",
    hoverDelay: 400,
    zIndexOverride: disclosureZIndexOverride
  }, activator);
}

exports.SearchFilterButton = SearchFilterButton;
