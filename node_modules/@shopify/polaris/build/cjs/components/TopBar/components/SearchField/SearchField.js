'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../../../utilities/css.js');
var SearchField_module = require('./SearchField.css.js');
var hooks = require('../../../../utilities/i18n/hooks.js');
var Icon = require('../../../Icon/Icon.js');
var Text = require('../../../Text/Text.js');

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
  const i18n = hooks.useI18n();
  const [forceActive, setForceActive] = React.useState(false);
  const input = React.useRef(null);
  const searchId = React.useId();
  const handleChange = React.useCallback(({
    currentTarget
  }) => {
    onChange(currentTarget.value);
  }, [onChange]);
  const handleFocus = React.useCallback(() => onFocus && onFocus(), [onFocus]);
  const handleBlur = React.useCallback(() => onBlur && onBlur(), [onBlur]);
  const handleClear = React.useCallback(() => {
    onCancel && onCancel();
    if (!input.current) {
      return;
    }
    input.current.value = '';
    onChange('');
    input.current.focus();
  }, [onCancel, onChange]);
  React.useEffect(() => {
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
    className: SearchField_module.default.Clear,
    onClick: handleClear,
    onBlur: () => {
      setForceActive(false);
      handleClear();
    },
    onFocus: () => {
      handleFocus();
      setForceActive(true);
    }
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.XCircleIcon
  }));
  const className = css.classNames(SearchField_module.default.SearchField, (focused || active || forceActive) && SearchField_module.default.focused);
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    onFocus: handleFocus,
    onBlur: handleBlur
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    visuallyHidden: true
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: searchId
  }, i18n.translate('Polaris.TopBar.SearchField.search'))), /*#__PURE__*/React.createElement("input", {
    id: searchId,
    className: SearchField_module.default.Input,
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
    className: SearchField_module.default.Icon
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.SearchIcon
  })), clearMarkup, /*#__PURE__*/React.createElement("div", {
    className: css.classNames(SearchField_module.default.Backdrop, showFocusBorder && SearchField_module.default.BackdropShowFocusBorder)
  }));
}
function preventDefault(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
}

exports.SearchField = SearchField;
