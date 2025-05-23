import React from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@shopify/polaris-icons';
import styles from '../../TextField.css.js';
import { Icon } from '../../../Icon/Icon.js';

const Spinner = /*#__PURE__*/React.forwardRef(function Spinner({
  onChange,
  onClick,
  onMouseDown,
  onMouseUp,
  onBlur
}, ref) {
  function handleStep(step) {
    return () => onChange(step);
  }
  function handleMouseDown(onChange) {
    return event => {
      if (event.button !== 0) return;
      onMouseDown?.(onChange);
    };
  }
  return /*#__PURE__*/React.createElement("div", {
    className: styles.Spinner,
    onClick: onClick,
    "aria-hidden": true,
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    role: "button",
    className: styles.Segment,
    tabIndex: -1,
    onClick: handleStep(1),
    onMouseDown: handleMouseDown(handleStep(1)),
    onMouseUp: onMouseUp,
    onBlur: onBlur
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.SpinnerIcon
  }, /*#__PURE__*/React.createElement(Icon, {
    source: ChevronUpIcon
  }))), /*#__PURE__*/React.createElement("div", {
    role: "button",
    className: styles.Segment,
    tabIndex: -1,
    onClick: handleStep(-1),
    onMouseDown: handleMouseDown(handleStep(-1)),
    onMouseUp: onMouseUp,
    onBlur: onBlur
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.SpinnerIcon
  }, /*#__PURE__*/React.createElement(Icon, {
    source: ChevronDownIcon
  }))));
});

export { Spinner };
