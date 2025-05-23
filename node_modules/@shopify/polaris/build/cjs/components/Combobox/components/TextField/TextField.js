'use strict';

var React = require('react');
var hooks = require('../../../../utilities/combobox/hooks.js');
var Label = require('../../../Label/Label.js');
var TextField$1 = require('../../../TextField/TextField.js');

function TextField({
  value,
  id: idProp,
  type = 'text',
  ariaAutocomplete = 'list',
  onFocus,
  onBlur,
  onChange,
  ...rest
}) {
  const comboboxTextFieldContext = hooks.useComboboxTextField();
  const {
    activeOptionId,
    listboxId,
    expanded,
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
  return /*#__PURE__*/React.createElement(TextField$1.TextField, Object.assign({}, rest, {
    value: value,
    id: textFieldId,
    type: type,
    ariaAutocomplete: ariaAutocomplete,
    "aria-haspopup": "listbox",
    ariaActiveDescendant: activeOptionId,
    ariaControls: listboxId,
    role: "combobox",
    ariaExpanded: expanded,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange
  }));
}

exports.TextField = TextField;
