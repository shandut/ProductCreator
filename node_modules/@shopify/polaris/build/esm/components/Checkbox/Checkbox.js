import React, { forwardRef, useRef, useId, useContext, useImperativeHandle } from 'react';
import { MinusIcon } from '@shopify/polaris-icons';
import { classNames, variationName } from '../../utilities/css.js';
import { WithinListboxContext } from '../../utilities/listbox/context.js';
import styles from './Checkbox.css.js';
import { Choice, helpTextID } from '../Choice/Choice.js';
import { errorTextID } from '../InlineError/InlineError.js';
import { Icon } from '../Icon/Icon.js';

const Checkbox = /*#__PURE__*/forwardRef(function Checkbox({
  ariaControls,
  ariaDescribedBy: ariaDescribedByProp,
  label,
  labelHidden,
  checked = false,
  helpText,
  disabled,
  id: idProp,
  name,
  value,
  error,
  onChange,
  onFocus,
  onBlur,
  labelClassName,
  fill,
  bleed,
  bleedBlockStart,
  bleedBlockEnd,
  bleedInlineStart,
  bleedInlineEnd,
  tone
}, ref) {
  const inputNode = useRef(null);
  const uniqId = useId();
  const id = idProp ?? uniqId;
  const isWithinListbox = useContext(WithinListboxContext);
  useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputNode.current) {
        inputNode.current.focus();
      }
    }
  }));
  const handleBlur = () => {
    onBlur && onBlur();
  };
  const handleOnClick = () => {
    if (onChange == null || inputNode.current == null || disabled) {
      return;
    }
    onChange(inputNode.current.checked, id);
    inputNode.current.focus();
  };
  const describedBy = [];
  if (error && typeof error !== 'boolean') {
    describedBy.push(errorTextID(id));
  }
  if (helpText) {
    describedBy.push(helpTextID(id));
  }
  if (ariaDescribedByProp) {
    describedBy.push(ariaDescribedByProp);
  }
  const ariaDescribedBy = describedBy.length ? describedBy.join(' ') : undefined;
  const wrapperClassName = classNames(styles.Checkbox, error && styles.error);
  const isIndeterminate = checked === 'indeterminate';
  const isChecked = !isIndeterminate && Boolean(checked);
  const indeterminateAttributes = isIndeterminate ? {
    indeterminate: 'true',
    'aria-checked': 'mixed'
  } : {
    'aria-checked': isChecked
  };
  const iconSource = /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 16 16",
    shapeRendering: "geometricPrecision",
    textRendering: "geometricPrecision"
  }, /*#__PURE__*/React.createElement("path", {
    className: classNames(checked && styles.checked),
    d: "M1.5,5.5L3.44655,8.22517C3.72862,8.62007,4.30578,8.64717,4.62362,8.28044L10.5,1.5",
    transform: "translate(2 2.980376)",
    opacity: "0",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    pathLength: "1"
  }));
  const inputClassName = classNames(styles.Input, isIndeterminate && styles['Input-indeterminate'], tone && styles[variationName('tone', tone)]);
  const extraChoiceProps = {
    helpText,
    error,
    bleed,
    bleedBlockStart,
    bleedBlockEnd,
    bleedInlineStart,
    bleedInlineEnd
  };
  return /*#__PURE__*/React.createElement(Choice, Object.assign({
    id: id,
    label: label,
    labelHidden: labelHidden,
    disabled: disabled,
    labelClassName: classNames(styles.ChoiceLabel, labelClassName),
    fill: fill,
    tone: tone
  }, extraChoiceProps), /*#__PURE__*/React.createElement("span", {
    className: wrapperClassName
  }, /*#__PURE__*/React.createElement("input", Object.assign({
    ref: inputNode,
    id: id,
    name: name,
    value: value,
    type: "checkbox",
    checked: isChecked,
    disabled: disabled,
    className: inputClassName,
    onBlur: handleBlur,
    onChange: noop,
    onClick: handleOnClick,
    onFocus: onFocus,
    "aria-invalid": error != null,
    "aria-controls": ariaControls,
    "aria-describedby": ariaDescribedBy,
    role: isWithinListbox ? 'presentation' : 'checkbox'
  }, indeterminateAttributes)), /*#__PURE__*/React.createElement("span", {
    className: styles.Backdrop,
    onClick: stopPropagation,
    onKeyUp: stopPropagation
  }), /*#__PURE__*/React.createElement("span", {
    className: classNames(styles.Icon, !isIndeterminate && styles.animated)
  }, isIndeterminate ? /*#__PURE__*/React.createElement(Icon, {
    source: MinusIcon
  }) : iconSource)));
});
function noop() {}
function stopPropagation(event) {
  event.stopPropagation();
}

export { Checkbox };
