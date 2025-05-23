import React, { useId, useCallback } from 'react';
import { SelectIcon } from '@shopify/polaris-icons';
import { classNames, variationName } from '../../utilities/css.js';
import { useToggle } from '../../utilities/use-toggle.js';
import styles from './Select.css.js';
import { Icon } from '../Icon/Icon.js';
import { Labelled, helpTextID } from '../Labelled/Labelled.js';
import { Box } from '../Box/Box.js';
import { Text } from '../Text/Text.js';

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
  } = useToggle(false);
  const uniqId = useId();
  const id = idProp ?? uniqId;
  const labelHidden = labelInline ? true : labelHiddenProp;
  const className = classNames(styles.Select, error && styles.error, tone && styles[variationName('tone', tone)], disabled && styles.disabled);
  const handleFocus = useCallback(event => {
    toggleFocused();
    onFocus?.(event);
  }, [onFocus, toggleFocused]);
  const handleBlur = useCallback(event => {
    toggleFocused();
    onBlur?.(event);
  }, [onBlur, toggleFocused]);
  const handleChange = onChange ? event => onChange(event.currentTarget.value, id) : undefined;
  const describedBy = [];
  if (helpText) {
    describedBy.push(helpTextID(id));
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
  const inlineLabelMarkup = labelInline && /*#__PURE__*/React.createElement(Box, {
    paddingInlineEnd: "100"
  }, /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "bodyMd",
    tone: tone && tone === 'magic' && !focused ? 'magic-subdued' : 'subdued',
    truncate: true
  }, label));
  const selectedOption = getSelectedOption(normalizedOptions, value);
  const prefixMarkup = selectedOption.prefix && /*#__PURE__*/React.createElement("div", {
    className: styles.Prefix
  }, selectedOption.prefix);
  const contentMarkup = /*#__PURE__*/React.createElement("div", {
    className: styles.Content,
    "aria-hidden": true,
    "aria-disabled": disabled
  }, inlineLabelMarkup, prefixMarkup, /*#__PURE__*/React.createElement("span", {
    className: styles.SelectedOption
  }, selectedOption.label), /*#__PURE__*/React.createElement("span", {
    className: styles.Icon
  }, /*#__PURE__*/React.createElement(Icon, {
    source: SelectIcon
  })));
  const optionsMarkup = normalizedOptions.map(renderOption);
  return /*#__PURE__*/React.createElement(Labelled, {
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
    className: styles.Input,
    disabled: disabled,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange,
    "aria-invalid": Boolean(error),
    "aria-describedby": describedBy.length ? describedBy.join(' ') : undefined,
    "aria-required": requiredIndicator
  }, optionsMarkup), contentMarkup, /*#__PURE__*/React.createElement("div", {
    className: styles.Backdrop
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

export { Select };
