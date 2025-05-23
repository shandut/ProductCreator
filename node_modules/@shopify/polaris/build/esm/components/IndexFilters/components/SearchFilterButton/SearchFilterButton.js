import React from 'react';
import { SearchIcon, FilterIcon } from '@shopify/polaris-icons';
import { Tooltip } from '../../../Tooltip/Tooltip.js';
import { Button } from '../../../Button/Button.js';
import { Text } from '../../../Text/Text.js';
import { InlineStack } from '../../../InlineStack/InlineStack.js';
import { Icon } from '../../../Icon/Icon.js';

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
  const iconMarkup = /*#__PURE__*/React.createElement(InlineStack, {
    gap: "0"
  }, hideQueryField ? null : /*#__PURE__*/React.createElement(Icon, {
    source: SearchIcon,
    tone: "base"
  }), hideFilters ? null : /*#__PURE__*/React.createElement(Icon, {
    source: FilterIcon,
    tone: "base"
  }));
  const activator = /*#__PURE__*/React.createElement("div", {
    style: style
  }, /*#__PURE__*/React.createElement(Button, {
    size: "slim",
    onClick: onClick,
    disabled: disabled,
    icon: iconMarkup,
    accessibilityLabel: label
  }));
  const content = /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "bodyMd",
    alignment: "center"
  }, tooltipContent);
  return /*#__PURE__*/React.createElement(Tooltip, {
    content: content,
    preferredPosition: "above",
    hoverDelay: 400,
    zIndexOverride: disclosureZIndexOverride
  }, activator);
}

export { SearchFilterButton };
