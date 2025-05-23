'use strict';

var React = require('react');
var SearchField_module = require('./SearchField.css.js');
var hooks = require('../../../../utilities/combobox/hooks.js');
var Label = require('../../../Label/Label.js');
var InlineStack = require('../../../InlineStack/InlineStack.js');
var Text = require('../../../Text/Text.js');

function SearchField({
  value,
  id: idProp,
  type = 'text',
  onFocus,
  onBlur,
  onChange,
  label,
  prefix,
  placeholder,
  focused
}) {
  const inputRef = React.useRef(null);
  const comboboxTextFieldContext = hooks.useComboboxTextField();
  const {
    activeOptionId,
    listboxId,
    setTextFieldFocused,
    setTextFieldLabelId,
    onTextFieldFocus,
    onTextFieldChange,
    onTextFieldBlur
  } = comboboxTextFieldContext;
  const uniqueId = React.useId();
  const textFieldId = React.useMemo(() => idProp || uniqueId, [uniqueId, idProp]);
  const labelId = React.useMemo(() => Label.labelID(idProp || uniqueId), [uniqueId, idProp]);
  React.useEffect(() => {
    if (setTextFieldLabelId) setTextFieldLabelId(labelId);
  }, [labelId, setTextFieldLabelId]);
  const handleFocus = React.useCallback(event => {
    if (onFocus) onFocus(event);
    if (onTextFieldFocus) onTextFieldFocus();
    if (setTextFieldFocused) setTextFieldFocused(true);
  }, [onFocus, onTextFieldFocus, setTextFieldFocused]);
  const handleBlur = React.useCallback(event => {
    if (onBlur) onBlur(event);
    if (onTextFieldBlur) onTextFieldBlur();
    if (setTextFieldFocused) setTextFieldFocused(false);
  }, [onBlur, onTextFieldBlur, setTextFieldFocused]);
  const handleChange = React.useCallback((value, id) => {
    if (onChange) onChange(value, id);
    if (onTextFieldChange) onTextFieldChange(value);
  }, [onChange, onTextFieldChange]);
  if (focused && document.activeElement !== inputRef.current) {
    inputRef.current?.focus();
  }
  return /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    gap: "100",
    blockAlign: "center"
  }, /*#__PURE__*/React.createElement(Label.Label, {
    id: textFieldId
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    visuallyHidden: true
  }, label), /*#__PURE__*/React.createElement("span", null, prefix)), /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    id: textFieldId,
    className: SearchField_module.default.SearchField,
    value: value,
    type: type,
    role: "combobox",
    placeholder: placeholder,
    autoComplete: "off",
    "aria-activedescendant": activeOptionId,
    "aria-haspopup": "listbox",
    "aria-autocomplete": "list",
    "aria-expanded": "true",
    "aria-controls": listboxId,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: ({
      target
    }) => handleChange(target.value, textFieldId)
  }));
}

exports.SearchField = SearchField;
