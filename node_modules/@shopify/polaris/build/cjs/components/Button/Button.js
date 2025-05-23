'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var breakpoints = require('../../utilities/breakpoints.js');
var css = require('../../utilities/css.js');
var focus = require('../../utilities/focus.js');
var Button_module = require('./Button.css.js');
var Icon = require('../Icon/Icon.js');
var Spinner = require('../Spinner/Spinner.js');
var UnstyledButton = require('../UnstyledButton/UnstyledButton.js');
var hooks = require('../../utilities/i18n/hooks.js');
var Text = require('../Text/Text.js');

function Button({
  id,
  children,
  url,
  disabled,
  external,
  download,
  target,
  submit,
  loading,
  pressed,
  accessibilityLabel,
  role,
  ariaControls,
  ariaExpanded,
  ariaDescribedBy,
  ariaChecked,
  onClick,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyPress,
  onKeyUp,
  onMouseEnter,
  onTouchStart,
  onPointerDown,
  icon,
  disclosure,
  removeUnderline,
  size = 'medium',
  textAlign = 'center',
  fullWidth,
  dataPrimaryLink,
  tone,
  variant = 'secondary'
}) {
  const i18n = hooks.useI18n();
  const isDisabled = disabled || loading;
  const {
    mdUp
  } = breakpoints.useBreakpoints();
  const className = css.classNames(Button_module.default.Button, Button_module.default.pressable, Button_module.default[css.variationName('variant', variant)], Button_module.default[css.variationName('size', size)], Button_module.default[css.variationName('textAlign', textAlign)], fullWidth && Button_module.default.fullWidth, disclosure && Button_module.default.disclosure, icon && children && Button_module.default.iconWithText, icon && children == null && Button_module.default.iconOnly, isDisabled && Button_module.default.disabled, loading && Button_module.default.loading, pressed && !disabled && !url && Button_module.default.pressed, removeUnderline && Button_module.default.removeUnderline, tone && Button_module.default[css.variationName('tone', tone)]);
  const disclosureMarkup = disclosure ? /*#__PURE__*/React.createElement("span", {
    className: loading ? Button_module.default.hidden : Button_module.default.Icon
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: loading ? 'placeholder' : getDisclosureIconSource(disclosure, polarisIcons.ChevronUpIcon, polarisIcons.ChevronDownIcon)
  })) : null;
  const iconSource = isIconSource(icon) ? /*#__PURE__*/React.createElement(Icon.Icon, {
    source: loading ? 'placeholder' : icon
  }) : icon;
  const iconMarkup = iconSource ? /*#__PURE__*/React.createElement("span", {
    className: loading ? Button_module.default.hidden : Button_module.default.Icon
  }, iconSource) : null;
  const hasPlainText = ['plain', 'monochromePlain'].includes(variant);
  let textFontWeight = 'medium';
  if (hasPlainText) {
    textFontWeight = 'regular';
  } else if (variant === 'primary') {
    textFontWeight = mdUp ? 'medium' : 'semibold';
  }
  let textVariant = 'bodySm';
  if (size === 'large' || hasPlainText && size !== 'micro') {
    textVariant = 'bodyMd';
  }
  const childMarkup = children ? /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: textVariant,
    fontWeight: textFontWeight
    // Fixes Safari bug that doesn't re-render button text to correct color
    ,
    key: disabled ? 'text-disabled' : 'text'
  }, children) : null;
  const spinnerSVGMarkup = loading ? /*#__PURE__*/React.createElement("span", {
    className: Button_module.default.Spinner
  }, /*#__PURE__*/React.createElement(Spinner.Spinner, {
    size: "small",
    accessibilityLabel: i18n.translate('Polaris.Button.spinnerAccessibilityLabel')
  })) : null;
  const commonProps = {
    id,
    className,
    accessibilityLabel,
    ariaDescribedBy,
    role,
    onClick,
    onFocus,
    onBlur,
    onMouseUp: focus.handleMouseUpByBlurring,
    onMouseEnter,
    onTouchStart,
    'data-primary-link': dataPrimaryLink
  };
  const linkProps = {
    url,
    external,
    download,
    target
  };
  const actionProps = {
    submit,
    disabled: isDisabled,
    loading,
    ariaControls,
    ariaExpanded,
    ariaChecked,
    pressed,
    onKeyDown,
    onKeyUp,
    onKeyPress,
    onPointerDown
  };
  const buttonMarkup = /*#__PURE__*/React.createElement(UnstyledButton.UnstyledButton, Object.assign({}, commonProps, linkProps, actionProps), spinnerSVGMarkup, iconMarkup, childMarkup, disclosureMarkup);
  return buttonMarkup;
}
function isIconSource(x) {
  return typeof x === 'string' || typeof x === 'object' && x.body || typeof x === 'function';
}
function getDisclosureIconSource(disclosure, upIcon, downIcon) {
  if (disclosure === 'select') {
    return polarisIcons.SelectIcon;
  }
  return disclosure === 'up' ? upIcon : downIcon;
}

exports.Button = Button;
