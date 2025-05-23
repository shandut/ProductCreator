import React, { useState, useRef, useId, useCallback, useEffect } from 'react';
import { XCircleIcon, SearchIcon } from '@shopify/polaris-icons';
import { classNames } from '../../../../utilities/css.js';
import styles from './SearchField.css.js';
import { useI18n } from '../../../../utilities/i18n/hooks.js';
import { Icon } from '../../../Icon/Icon.js';
import { Text } from '../../../Text/Text.js';

function SearchField({
  value,
  focused,
  active,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  onCancel,
  showFocusBorder
}) {
  const i18n = useI18n();
  const [forceActive, setForceActive] = useState(false);
  const input = useRef(null);
  const searchId = useId();
  const handleChange = useCallback(({
    currentTarget
  }) => {
    onChange(currentTarget.value);
  }, [onChange]);
  const handleFocus = useCallback(() => onFocus && onFocus(), [onFocus]);
  const handleBlur = useCallback(() => onBlur && onBlur(), [onBlur]);
  const handleClear = useCallback(() => {
    onCancel && onCancel();
    if (!input.current) {
      return;
    }
    input.current.value = '';
    onChange('');
    input.current.focus();
  }, [onCancel, onChange]);
  useEffect(() => {
    if (!input.current) {
      return;
    }
    if (focused) {
      input.current.focus();
    } else {
      input.current.blur();
    }
  }, [focused]);
  const clearMarkup = value !== '' && /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": i18n.translate('Polaris.TopBar.SearchField.clearButtonLabel'),
    className: styles.Clear,
    onClick: handleClear,
    onBlur: () => {
      setForceActive(false);
      handleClear();
    },
    onFocus: () => {
      handleFocus();
      setForceActive(true);
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    source: XCircleIcon
  }));
  const className = classNames(styles.SearchField, (focused || active || forceActive) && styles.focused);
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    onFocus: handleFocus,
    onBlur: handleBlur
  }, /*#__PURE__*/React.createElement(Text, {
    as: "span",
    visuallyHidden: true
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: searchId
  }, i18n.translate('Polaris.TopBar.SearchField.search'))), /*#__PURE__*/React.createElement("input", {
    id: searchId,
    className: styles.Input,
    placeholder: placeholder,
    type: "search",
    autoCapitalize: "off",
    autoComplete: "off",
    autoCorrect: "off",
    ref: input,
    value: value,
    onChange: handleChange,
    onKeyDown: preventDefault
  }), /*#__PURE__*/React.createElement("span", {
    className: styles.Icon
  }, /*#__PURE__*/React.createElement(Icon, {
    source: SearchIcon
  })), clearMarkup, /*#__PURE__*/React.createElement("div", {
    className: classNames(styles.Backdrop, showFocusBorder && styles.BackdropShowFocusBorder)
  }));
}
function preventDefault(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
}

export { SearchField };
