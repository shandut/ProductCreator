import React, { useId } from 'react';
import { SearchIcon } from '@shopify/polaris-icons';
import { useBreakpoints } from '../../../../utilities/breakpoints.js';
import { useI18n } from '../../../../utilities/i18n/hooks.js';
import { Text } from '../../../Text/Text.js';
import { TextField } from '../../../TextField/TextField.js';
import { Icon } from '../../../Icon/Icon.js';

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
  const i18n = useI18n();
  const id = useId();
  const {
    mdUp
  } = useBreakpoints();
  const suffix = value && selectedViewName && mdUp ? /*#__PURE__*/React.createElement(Text, {
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
  return /*#__PURE__*/React.createElement(TextField, {
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
    prefix: mdUp ? /*#__PURE__*/React.createElement(Icon, {
      source: SearchIcon
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

export { SearchField };
