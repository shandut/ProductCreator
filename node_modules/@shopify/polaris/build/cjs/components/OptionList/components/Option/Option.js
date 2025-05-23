'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var useToggle = require('../../../../utilities/use-toggle.js');
var css = require('../../../../utilities/css.js');
var Option_module = require('./Option.css.js');
var Checkbox = require('../../../Checkbox/Checkbox.js');
var InlineStack = require('../../../InlineStack/InlineStack.js');
var Icon = require('../../../Icon/Icon.js');
var Scrollable = require('../../../Scrollable/Scrollable.js');

function Option({
  label,
  value,
  id,
  select,
  active,
  allowMultiple,
  disabled,
  media,
  onClick,
  section,
  index,
  verticalAlign,
  onPointerEnter,
  onFocus
}) {
  const {
    value: focused,
    toggle: toggleFocused
  } = useToggle.useToggle(false);
  const handleClick = React.useCallback(() => {
    if (disabled) {
      return;
    }
    onClick(section, index);
  }, [disabled, index, onClick, section]);
  const handlePointerEnter = React.useCallback(() => {
    if (disabled) {
      return;
    }
    onPointerEnter(section, index);
  }, [disabled, onPointerEnter, section, index]);
  const handleFocus = React.useCallback(() => {
    toggleFocused();
    onFocus(section, index);
  }, [toggleFocused, onFocus, section, index]);
  const mediaMarkup = media ? /*#__PURE__*/React.createElement("div", {
    className: Option_module.default.Media
  }, media) : null;
  const singleSelectClassName = css.classNames(Option_module.default.SingleSelectOption, focused && Option_module.default.focused, disabled && Option_module.default.disabled, select && Option_module.default.select, active && Option_module.default.active, verticalAlign && Option_module.default[css.variationName('verticalAlign', verticalAlign)]);
  const multiSelectClassName = css.classNames(Option_module.default.Label, disabled && Option_module.default.disabled, active && Option_module.default.active, select && Option_module.default.select, verticalAlign && Option_module.default[css.variationName('verticalAlign', verticalAlign)], allowMultiple && Option_module.default.CheckboxLabel, allowMultiple && Option_module.default.MultiSelectOption);
  const optionMarkup = allowMultiple ? /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    className: multiSelectClassName
  }, /*#__PURE__*/React.createElement("div", {
    className: Option_module.default.Checkbox
  }, /*#__PURE__*/React.createElement(Checkbox.Checkbox, {
    id: id,
    label: "",
    ariaDescribedBy: `${id}-label`,
    value: value,
    checked: select,
    disabled: disabled,
    onChange: handleClick
  })), mediaMarkup, /*#__PURE__*/React.createElement("span", {
    id: `${id}-label`
  }, label)) : /*#__PURE__*/React.createElement("button", {
    id: id,
    type: "button",
    className: singleSelectClassName,
    onClick: handleClick,
    disabled: disabled,
    onFocus: handleFocus,
    onBlur: toggleFocused,
    "aria-pressed": active || select
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    wrap: false,
    blockAlign: verticalAlignToBlockAlign(verticalAlign)
  }, mediaMarkup, label), (select || active) && /*#__PURE__*/React.createElement("span", {
    className: Option_module.default.Icon
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.CheckIcon
  }))));
  const scrollMarkup = active ? /*#__PURE__*/React.createElement(Scrollable.Scrollable.ScrollTo, null) : null;
  return /*#__PURE__*/React.createElement("li", {
    key: id,
    className: Option_module.default.Option,
    tabIndex: -1,
    onPointerEnter: handlePointerEnter
  }, scrollMarkup, optionMarkup);
}
function verticalAlignToBlockAlign(verticalAlign) {
  switch (verticalAlign) {
    case 'top':
      return 'start';
    case 'center':
      return 'center';
    case 'bottom':
      return 'end';
    default:
      return 'start';
  }
}

exports.Option = Option;
