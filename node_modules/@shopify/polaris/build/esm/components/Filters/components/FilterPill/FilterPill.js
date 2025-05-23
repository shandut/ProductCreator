import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronDownIcon, XSmallIcon } from '@shopify/polaris-icons';
import { useToggle } from '../../../../utilities/use-toggle.js';
import { classNames } from '../../../../utilities/css.js';
import styles from './FilterPill.css.js';
import { useI18n } from '../../../../utilities/i18n/hooks.js';
import { Icon } from '../../../Icon/Icon.js';
import { UnstyledButton } from '../../../UnstyledButton/UnstyledButton.js';
import { InlineStack } from '../../../InlineStack/InlineStack.js';
import { Button } from '../../../Button/Button.js';
import { Popover } from '../../../Popover/Popover.js';
import { BlockStack } from '../../../BlockStack/BlockStack.js';
import { Box } from '../../../Box/Box.js';
import { Text } from '../../../Text/Text.js';

function FilterPill({
  unsavedChanges = false,
  filterKey,
  label,
  filter,
  disabled,
  hideClearButton,
  selected,
  initialActive,
  disclosureZIndexOverride,
  closeOnChildOverlayClick,
  onRemove,
  onClick
}) {
  const i18n = useI18n();
  const elementRef = useRef(null);
  const {
    value: focused,
    setTrue: setFocusedTrue,
    setFalse: setFocusedFalse
  } = useToggle(false);
  const [popoverActive, setPopoverActive] = useState(initialActive);
  useEffect(() => {
    const node = elementRef.current;
    if (!node || !popoverActive) {
      return;
    }
    const parent = node.parentElement?.parentElement;
    if (!parent) {
      return;
    }
    parent.scroll?.({
      left: node.offsetLeft
    });
  }, [elementRef, popoverActive]);
  const togglePopoverActive = useCallback(() => {
    if (filter) {
      setPopoverActive(popoverActive => !popoverActive);
    }
    if (onClick) {
      onClick(filterKey);
    }
  }, [filter, filterKey, onClick]);
  const handlePopoverClose = useCallback(() => {
    togglePopoverActive();
    if (!selected) {
      onRemove?.(filterKey);
    }
  }, [onRemove, selected, filterKey, togglePopoverActive]);
  const handleClear = () => {
    if (onRemove) onRemove(filterKey);
    setPopoverActive(false);
  };
  const buttonClasses = classNames(styles.FilterButton, selected && styles.ActiveFilterButton, popoverActive && styles.FocusFilterButton, focused && styles.focusedFilterButton);
  const clearButtonClassNames = classNames(styles.PlainButton, styles.clearButton);
  const toggleButtonClassNames = classNames(styles.PlainButton, styles.ToggleButton);
  const disclosureMarkup = !selected ? /*#__PURE__*/React.createElement("div", {
    className: styles.IconWrapper
  }, /*#__PURE__*/React.createElement(Icon, {
    source: ChevronDownIcon,
    tone: "base"
  })) : null;
  const labelMarkup = /*#__PURE__*/React.createElement(Box, {
    paddingInlineStart: unsavedChanges ? '0' : '050'
  }, /*#__PURE__*/React.createElement(InlineStack, null, /*#__PURE__*/React.createElement(Text, {
    variant: "bodySm",
    as: "span"
  }, label)));
  const unsavedPip = unsavedChanges ? /*#__PURE__*/React.createElement(Box, {
    paddingInlineEnd: "150"
  }, /*#__PURE__*/React.createElement(Box, {
    background: "bg-fill-emphasis",
    borderRadius: "050",
    width: "6px",
    minHeight: "6px"
  })) : null;
  const removeFilterButtonMarkup = selected ? /*#__PURE__*/React.createElement(UnstyledButton, {
    onClick: handleClear,
    className: clearButtonClassNames,
    type: "button",
    "aria-label": i18n.translate('Polaris.FilterPill.clear')
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.IconWrapper
  }, /*#__PURE__*/React.createElement(Icon, {
    source: XSmallIcon,
    tone: "base"
  }))) : null;
  const activator = /*#__PURE__*/React.createElement("div", {
    className: buttonClasses
  }, /*#__PURE__*/React.createElement(InlineStack, {
    gap: "0",
    wrap: false
  }, /*#__PURE__*/React.createElement(UnstyledButton, {
    onFocus: setFocusedTrue,
    onBlur: setFocusedFalse,
    onClick: togglePopoverActive,
    className: toggleButtonClassNames,
    type: "button",
    accessibilityLabel: unsavedChanges ? i18n.translate('Polaris.FilterPill.unsavedChanges', {
      label
    }) : label
  }, /*#__PURE__*/React.createElement(InlineStack, {
    wrap: false,
    align: "center",
    blockAlign: "center",
    gap: "0"
  }, unsavedPip, labelMarkup, disclosureMarkup)), removeFilterButtonMarkup));
  const clearButtonMarkup = !hideClearButton && /*#__PURE__*/React.createElement("div", {
    className: styles.ClearButtonWrapper
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: handleClear,
    variant: "plain",
    disabled: !selected,
    textAlign: "left"
  }, i18n.translate('Polaris.FilterPill.clear')));
  if (disabled) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", {
    ref: elementRef
  }, /*#__PURE__*/React.createElement(Popover, {
    active: popoverActive,
    activator: activator,
    key: filterKey,
    onClose: handlePopoverClose,
    preferredAlignment: "left",
    zIndexOverride: disclosureZIndexOverride,
    preventCloseOnChildOverlayClick: !closeOnChildOverlayClick
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.PopoverWrapper
  }, /*#__PURE__*/React.createElement(Popover.Section, null, /*#__PURE__*/React.createElement(BlockStack, {
    gap: "100"
  }, filter, clearButtonMarkup)))));
}

export { FilterPill };
