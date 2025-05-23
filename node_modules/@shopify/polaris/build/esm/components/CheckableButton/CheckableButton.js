import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import styles from './CheckableButton.css.js';
import { Checkbox } from '../Checkbox/Checkbox.js';
import { Text } from '../Text/Text.js';

const CheckableButton = /*#__PURE__*/forwardRef(function CheckableButton({
  accessibilityLabel,
  label = '',
  onToggleAll,
  selected,
  disabled,
  ariaLive
}, ref) {
  const checkBoxRef = useRef(null);
  function focus() {
    checkBoxRef?.current?.focus();
  }
  useImperativeHandle(ref, () => {
    return {
      focus
    };
  });
  return /*#__PURE__*/React.createElement("div", {
    className: styles.CheckableButton,
    onClick: onToggleAll
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.Checkbox
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: accessibilityLabel,
    labelHidden: true,
    checked: selected,
    disabled: disabled,
    onChange: onToggleAll,
    ref: checkBoxRef
  })), label ? /*#__PURE__*/React.createElement("span", {
    className: styles.Label,
    "aria-live": ariaLive
  }, /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "bodySm",
    fontWeight: "medium"
  }, label)) : null);
});

export { CheckableButton };
