'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var breakpoints = require('../../../../utilities/breakpoints.js');
var hooks = require('../../../../utilities/i18n/hooks.js');
var Text = require('../../../Text/Text.js');
var TextField = require('../../../TextField/TextField.js');
var Icon = require('../../../Icon/Icon.js');

function SearchField({
  onChange,
  onClear,
  onFocus,
  onBlur,
  focused,
  value,
  placeholder,
  disabled,
  borderlessQueryField,
  loading,
  selectedViewName
}) {
  const i18n = hooks.useI18n();
  const id = React.useId();
  const {
    mdUp
  } = breakpoints.useBreakpoints();
  const suffix = value && selectedViewName && mdUp ? /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "bodyMd",
    tone: "subdued"
  }, i18n.translate('Polaris.Filters.searchInView', {
    viewName: selectedViewName
  })) : null;
  function handleChange(eventValue) {
    onChange(eventValue ?? value);
  }
  function handleClear() {
    if (onClear) {
      onClear();
    } else {
      onChange('');
    }
  }
  return /*#__PURE__*/React.createElement(TextField.TextField, {
    id: id,
    value: value,
    onChange: handleChange,
    onFocus: onFocus,
    onBlur: onBlur,
    onClearButtonClick: handleClear,
    autoComplete: "off",
    placeholder: placeholder,
    disabled: disabled,
    variant: borderlessQueryField ? 'borderless' : 'inherit',
    size: "slim",
    prefix: mdUp ? /*#__PURE__*/React.createElement(Icon.Icon, {
      source: polarisIcons.SearchIcon
    }) : undefined,
    suffix: suffix,
    focused: focused,
    label: placeholder,
    labelHidden: true,
    clearButton: true,
    autoSize: Boolean(suffix),
    loading: loading
  });
}

exports.SearchField = SearchField;
