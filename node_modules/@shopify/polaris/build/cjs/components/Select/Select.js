'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../utilities/css.js');
var useToggle = require('../../utilities/use-toggle.js');
var Select_module = require('./Select.css.js');
var Icon = require('../Icon/Icon.js');
var Labelled = require('../Labelled/Labelled.js');
var Box = require('../Box/Box.js');
var Text = require('../Text/Text.js');

const PLACEHOLDER_VALUE = '';
function Select({
  options: optionsProp,
  label,
  labelAction,
  labelHidden: labelHiddenProp,
  labelInline,
  disabled,
  helpText,
  placeholder,
  id: idProp,
  name,
  value = PLACEHOLDER_VALUE,
  error,
  onChange,
  onFocus,
  onBlur,
  requiredIndicator,
  tone
}) {
  const {
    value: focused,
    toggle: toggleFocused
  } = useToggle.useToggle(false);
  const uniqId = React.useId();
  const id = idProp ?? uniqId;
  const labelHidden = labelInline ? true : labelHiddenProp;
  const className = css.classNames(Select_module.default.Select, error && Select_module.default.error, tone && Select_module.default[css.variationName('tone', tone)], disabled && Select_module.default.disabled);
  const handleFocus = React.useCallback(event => {
    toggleFocused();
    onFocus?.(event);
  }, [onFocus, toggleFocused]);
  const handleBlur = React.useCallback(event => {
    toggleFocused();
    onBlur?.(event);
  }, [onBlur, toggleFocused]);
  const handleChange = onChange ? event => onChange(event.currentTarget.value, id) : undefined;
  const describedBy = [];
  if (helpText) {
    describedBy.push(Labelled.helpTextID(id));
  }
  if (error) {
    describedBy.push(`${id}Error`);
  }
  const options = optionsProp || [];
  let normalizedOptions = options.map(normalizeOption);
  if (placeholder) {
    normalizedOptions = [{
      label: placeholder,
      value: PLACEHOLDER_VALUE,
      disabled: true
    }, ...normalizedOptions];
  }
  const inlineLabelMarkup = labelInline && /*#__PURE__*/React.createElement(Box.Box, {
    paddingInlineEnd: "100"
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "bodyMd",
    tone: tone && tone === 'magic' && !focused ? 'magic-subdued' : 'subdued',
    truncate: true
  }, label));
  const selectedOption = getSelectedOption(normalizedOptions, value);
  const prefixMarkup = selectedOption.prefix && /*#__PURE__*/React.createElement("div", {
    className: Select_module.default.Prefix
  }, selectedOption.prefix);
  const contentMarkup = /*#__PURE__*/React.createElement("div", {
    className: Select_module.default.Content,
    "aria-hidden": true,
    "aria-disabled": disabled
  }, inlineLabelMarkup, prefixMarkup, /*#__PURE__*/React.createElement("span", {
    className: Select_module.default.SelectedOption
  }, selectedOption.label), /*#__PURE__*/React.createElement("span", {
    className: Select_module.default.Icon
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.SelectIcon
  })));
  const optionsMarkup = normalizedOptions.map(renderOption);
  return /*#__PURE__*/React.createElement(Labelled.Labelled, {
    id: id,
    label: label,
    error: error,
    action: labelAction,
    labelHidden: labelHidden,
    helpText: helpText,
    requiredIndicator: requiredIndicator,
    disabled: disabled
  }, /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.createElement("select", {
    id: id,
    name: name,
    value: value,
    className: Select_module.default.Input,
    disabled: disabled,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange,
    "aria-invalid": Boolean(error),
    "aria-describedby": describedBy.length ? describedBy.join(' ') : undefined,
    "aria-required": requiredIndicator
  }, optionsMarkup), contentMarkup, /*#__PURE__*/React.createElement("div", {
    className: Select_module.default.Backdrop
  })));
}
function isString(option) {
  return typeof option === 'string';
}
function isGroup(option) {
  return typeof option === 'object' && 'options' in option && option.options != null;
}
function normalizeStringOption(option) {
  return {
    label: option,
    value: option
  };
}

/**
 * Converts a string option (and each string option in a Group) into
 * an Option object.
 */
function normalizeOption(option) {
  if (isString(option)) {
    return normalizeStringOption(option);
  } else if (isGroup(option)) {
    const {
      title,
      options
    } = option;
    return {
      title,
      options: options.map(option => {
        return isString(option) ? normalizeStringOption(option) : option;
      })
    };
  }
  return option;
}

/**
 * Gets the text to display in the UI, for the currently selected option
 */
function getSelectedOption(options, value) {
  const flatOptions = flattenOptions(options);
  let selectedOption = flatOptions.find(option => value === option.value);
  if (selectedOption === undefined) {
    // Get the first visible option (not the hidden placeholder)
    selectedOption = flatOptions.find(option => !option.hidden);
  }
  return selectedOption || {
    value: '',
    label: ''
  };
}

/**
 * Ungroups an options array
 */
function flattenOptions(options) {
  let flatOptions = [];
  options.forEach(optionOrGroup => {
    if (isGroup(optionOrGroup)) {
      flatOptions = flatOptions.concat(optionOrGroup.options);
    } else {
      flatOptions.push(optionOrGroup);
    }
  });
  return flatOptions;
}
function renderSingleOption(option) {
  const {
    value,
    label,
    prefix: _prefix,
    key,
    ...rest
  } = option;
  return /*#__PURE__*/React.createElement("option", Object.assign({
    key: key ?? value,
    value: value
  }, rest), label);
}
function renderOption(optionOrGroup) {
  if (isGroup(optionOrGroup)) {
    const {
      title,
      options
    } = optionOrGroup;
    return /*#__PURE__*/React.createElement("optgroup", {
      label: title,
      key: title
    }, options.map(renderSingleOption));
  }
  return renderSingleOption(optionOrGroup);
}

exports.Select = Select;
