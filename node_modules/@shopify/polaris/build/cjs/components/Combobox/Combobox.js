'use strict';

var React = require('react');
var Combobox_module = require('./Combobox.css.js');
var context = require('../../utilities/combobox/context.js');
var TextField = require('./components/TextField/TextField.js');
var Popover = require('../Popover/Popover.js');

function Combobox({
  activator,
  allowMultiple,
  children,
  preferredPosition = 'below',
  willLoadMoreOptions,
  height,
  maxHeight,
  minHeight,
  onScrolledToBottom,
  onClose
}) {
  const [popoverActive, setPopoverActive] = React.useState(false);
  const [activeOptionId, setActiveOptionId] = React.useState();
  const [textFieldLabelId, setTextFieldLabelId] = React.useState();
  const [listboxId, setListboxId] = React.useState();
  const [textFieldFocused, setTextFieldFocused] = React.useState(false);
  const shouldOpen = !popoverActive;
  const popoverActiveWithChildren = popoverActive && React.Children.count(children) > 0;
  const ref = React.useRef(null);
  const handleClose = React.useCallback(() => {
    setPopoverActive(false);
    onClose?.();
    setActiveOptionId(undefined);
  }, [onClose]);
  const handleOpen = React.useCallback(() => {
    setPopoverActive(true);
    setActiveOptionId(undefined);
  }, []);
  const onOptionSelected = React.useCallback(() => {
    if (!allowMultiple) {
      handleClose();
      setActiveOptionId(undefined);
      return;
    }
    ref.current?.forceUpdatePosition();
  }, [allowMultiple, handleClose]);
  const handleFocus = React.useCallback(() => {
    if (shouldOpen) {
      handleOpen();
    }
  }, [shouldOpen, handleOpen]);
  const handleChange = React.useCallback(() => {
    if (shouldOpen) {
      handleOpen();
    }
  }, [shouldOpen, handleOpen]);
  const handleBlur = React.useCallback(() => {
    if (popoverActive) {
      handleClose();
    }
  }, [popoverActive, handleClose]);
  const textFieldContextValue = React.useMemo(() => ({
    activeOptionId,
    expanded: popoverActive,
    listboxId,
    setTextFieldFocused,
    setTextFieldLabelId,
    onTextFieldFocus: handleFocus,
    onTextFieldChange: handleChange,
    onTextFieldBlur: handleBlur
  }), [activeOptionId, popoverActive, listboxId, setTextFieldFocused, setTextFieldLabelId, handleFocus, handleChange, handleBlur]);
  const listboxOptionContextValue = React.useMemo(() => ({
    allowMultiple
  }), [allowMultiple]);
  const listboxContextValue = React.useMemo(() => ({
    listboxId,
    textFieldLabelId,
    textFieldFocused,
    willLoadMoreOptions,
    onOptionSelected,
    setActiveOptionId,
    setListboxId,
    onKeyToBottom: onScrolledToBottom
  }), [listboxId, textFieldLabelId, textFieldFocused, willLoadMoreOptions, onOptionSelected, setActiveOptionId, setListboxId, onScrolledToBottom]);
  return /*#__PURE__*/React.createElement(Popover.Popover, {
    ref: ref,
    active: popoverActiveWithChildren,
    activator: /*#__PURE__*/React.createElement(context.ComboboxTextFieldContext.Provider, {
      value: textFieldContextValue
    }, activator),
    autofocusTarget: "none",
    preventFocusOnClose: true,
    fullWidth: true,
    preferInputActivator: false,
    preferredPosition: preferredPosition,
    onClose: handleClose
  }, React.Children.count(children) > 0 ? /*#__PURE__*/React.createElement(Popover.Popover.Pane, {
    onScrolledToBottom: onScrolledToBottom,
    height: height,
    maxHeight: maxHeight,
    minHeight: minHeight
  }, /*#__PURE__*/React.createElement(context.ComboboxListboxContext.Provider, {
    value: listboxContextValue
  }, /*#__PURE__*/React.createElement(context.ComboboxListboxOptionContext.Provider, {
    value: listboxOptionContextValue
  }, /*#__PURE__*/React.createElement("div", {
    className: Combobox_module.default.Listbox
  }, children)))) : null);
}
Combobox.TextField = TextField.TextField;

exports.Combobox = Combobox;
