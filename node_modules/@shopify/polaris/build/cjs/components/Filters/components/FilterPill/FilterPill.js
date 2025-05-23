'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var useToggle = require('../../../../utilities/use-toggle.js');
var css = require('../../../../utilities/css.js');
var FilterPill_module = require('./FilterPill.css.js');
var hooks = require('../../../../utilities/i18n/hooks.js');
var Icon = require('../../../Icon/Icon.js');
var UnstyledButton = require('../../../UnstyledButton/UnstyledButton.js');
var InlineStack = require('../../../InlineStack/InlineStack.js');
var Button = require('../../../Button/Button.js');
var Popover = require('../../../Popover/Popover.js');
var BlockStack = require('../../../BlockStack/BlockStack.js');
var Box = require('../../../Box/Box.js');
var Text = require('../../../Text/Text.js');

function FilterPill({
  unsavedChanges = false,
  filterKey,
  label,
  filter,
  disabled,
  hideClearButton,
  selected,
  initialActive,
  disclosureZIndexOverride,
  closeOnChildOverlayClick,
  onRemove,
  onClick
}) {
  const i18n = hooks.useI18n();
  const elementRef = React.useRef(null);
  const {
    value: focused,
    setTrue: setFocusedTrue,
    setFalse: setFocusedFalse
  } = useToggle.useToggle(false);
  const [popoverActive, setPopoverActive] = React.useState(initialActive);
  React.useEffect(() => {
    const node = elementRef.current;
    if (!node || !popoverActive) {
      return;
    }
    const parent = node.parentElement?.parentElement;
    if (!parent) {
      return;
    }
    parent.scroll?.({
      left: node.offsetLeft
    });
  }, [elementRef, popoverActive]);
  const togglePopoverActive = React.useCallback(() => {
    if (filter) {
      setPopoverActive(popoverActive => !popoverActive);
    }
    if (onClick) {
      onClick(filterKey);
    }
  }, [filter, filterKey, onClick]);
  const handlePopoverClose = React.useCallback(() => {
    togglePopoverActive();
    if (!selected) {
      onRemove?.(filterKey);
    }
  }, [onRemove, selected, filterKey, togglePopoverActive]);
  const handleClear = () => {
    if (onRemove) onRemove(filterKey);
    setPopoverActive(false);
  };
  const buttonClasses = css.classNames(FilterPill_module.default.FilterButton, selected && FilterPill_module.default.ActiveFilterButton, popoverActive && FilterPill_module.default.FocusFilterButton, focused && FilterPill_module.default.focusedFilterButton);
  const clearButtonClassNames = css.classNames(FilterPill_module.default.PlainButton, FilterPill_module.default.clearButton);
  const toggleButtonClassNames = css.classNames(FilterPill_module.default.PlainButton, FilterPill_module.default.ToggleButton);
  const disclosureMarkup = !selected ? /*#__PURE__*/React.createElement("div", {
    className: FilterPill_module.default.IconWrapper
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.ChevronDownIcon,
    tone: "base"
  })) : null;
  const labelMarkup = /*#__PURE__*/React.createElement(Box.Box, {
    paddingInlineStart: unsavedChanges ? '0' : '050'
  }, /*#__PURE__*/React.createElement(InlineStack.InlineStack, null, /*#__PURE__*/React.createElement(Text.Text, {
    variant: "bodySm",
    as: "span"
  }, label)));
  const unsavedPip = unsavedChanges ? /*#__PURE__*/React.createElement(Box.Box, {
    paddingInlineEnd: "150"
  }, /*#__PURE__*/React.createElement(Box.Box, {
    background: "bg-fill-emphasis",
    borderRadius: "050",
    width: "6px",
    minHeight: "6px"
  })) : null;
  const removeFilterButtonMarkup = selected ? /*#__PURE__*/React.createElement(UnstyledButton.UnstyledButton, {
    onClick: handleClear,
    className: clearButtonClassNames,
    type: "button",
    "aria-label": i18n.translate('Polaris.FilterPill.clear')
  }, /*#__PURE__*/React.createElement("div", {
    className: FilterPill_module.default.IconWrapper
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.XSmallIcon,
    tone: "base"
  }))) : null;
  const activator = /*#__PURE__*/React.createElement("div", {
    className: buttonClasses
  }, /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    gap: "0",
    wrap: false
  }, /*#__PURE__*/React.createElement(UnstyledButton.UnstyledButton, {
    onFocus: setFocusedTrue,
    onBlur: setFocusedFalse,
    onClick: togglePopoverActive,
    className: toggleButtonClassNames,
    type: "button",
    accessibilityLabel: unsavedChanges ? i18n.translate('Polaris.FilterPill.unsavedChanges', {
      label
    }) : label
  }, /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    wrap: false,
    align: "center",
    blockAlign: "center",
    gap: "0"
  }, unsavedPip, labelMarkup, disclosureMarkup)), removeFilterButtonMarkup));
  const clearButtonMarkup = !hideClearButton && /*#__PURE__*/React.createElement("div", {
    className: FilterPill_module.default.ClearButtonWrapper
  }, /*#__PURE__*/React.createElement(Button.Button, {
    onClick: handleClear,
    variant: "plain",
    disabled: !selected,
    textAlign: "left"
  }, i18n.translate('Polaris.FilterPill.clear')));
  if (disabled) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", {
    ref: elementRef
  }, /*#__PURE__*/React.createElement(Popover.Popover, {
    active: popoverActive,
    activator: activator,
    key: filterKey,
    onClose: handlePopoverClose,
    preferredAlignment: "left",
    zIndexOverride: disclosureZIndexOverride,
    preventCloseOnChildOverlayClick: !closeOnChildOverlayClick
  }, /*#__PURE__*/React.createElement("div", {
    className: FilterPill_module.default.PopoverWrapper
  }, /*#__PURE__*/React.createElement(Popover.Popover.Section, null, /*#__PURE__*/React.createElement(BlockStack.BlockStack, {
    gap: "100"
  }, filter, clearButtonMarkup)))));
}

exports.FilterPill = FilterPill;
