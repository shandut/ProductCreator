import React, { useState, useRef, useEffect, useCallback } from 'react';
import { focusFirstFocusableNode } from '../../../../../../utilities/focus.js';
import { Form } from '../../../../../Form/Form.js';
import { FormLayout } from '../../../../../FormLayout/FormLayout.js';
import { useI18n } from '../../../../../../utilities/i18n/hooks.js';
import { Modal } from '../../../../../Modal/Modal.js';
import { TextField } from '../../../../../TextField/TextField.js';

function RenameModal({
  open,
  isModalLoading,
  name,
  onClose,
  onClickPrimaryAction,
  onClickSecondaryAction,
  helpText,
  viewNames
}) {
  const i18n = useI18n();
  const [value, setValue] = useState(name);
  const container = useRef(null);
  const hasSameNameError = viewNames?.filter(viewName => viewName !== name).some(viewName => viewName.trim().toLowerCase() === value.trim().toLowerCase());
  const isPrimaryActionDisabled = isModalLoading || hasSameNameError || value === name || !value;
  useEffect(() => {
    if (!container.current) return;
    if (open) {
      focusFirstFocusableNode(container.current);
    }
  }, [open]);
  useEffect(() => {
    if (open) {
      setValue(name);
    }
  }, [name, open]);
  const handleChange = useCallback(newValue => {
    setValue(newValue);
  }, []);
  async function handlePrimaryAction() {
    if (isPrimaryActionDisabled) {
      return;
    }
    await onClickPrimaryAction(value);
    setValue('');
    onClose();
  }
  function handleSecondaryAction() {
    onClickSecondaryAction?.();
    setValue(name);
    onClose();
  }
  return /*#__PURE__*/React.createElement(Modal, {
    open: open,
    onClose: onClose,
    title: i18n.translate('Polaris.Tabs.RenameModal.title'),
    primaryAction: {
      content: i18n.translate('Polaris.Tabs.RenameModal.create'),
      onAction: handlePrimaryAction,
      disabled: isPrimaryActionDisabled
    },
    secondaryActions: [{
      content: i18n.translate('Polaris.Tabs.RenameModal.cancel'),
      onAction: handleSecondaryAction
    }],
    instant: true
  }, /*#__PURE__*/React.createElement(Modal.Section, null, /*#__PURE__*/React.createElement(Form, {
    onSubmit: handlePrimaryAction
  }, /*#__PURE__*/React.createElement(FormLayout, null, /*#__PURE__*/React.createElement("div", {
    ref: container
  }, /*#__PURE__*/React.createElement(TextField, {
    label: i18n.translate('Polaris.Tabs.RenameModal.label'),
    value: value,
    onChange: handleChange,
    autoComplete: "off",
    helpText: helpText,
    maxLength: 40,
    showCharacterCount: true,
    error: hasSameNameError ? i18n.translate('Polaris.Tabs.RenameModal.errors.sameName', {
      name: value
    }) : undefined
  }))))));
}

export { RenameModal };
