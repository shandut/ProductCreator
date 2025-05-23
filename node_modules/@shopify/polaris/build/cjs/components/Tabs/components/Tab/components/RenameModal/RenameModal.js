'use strict';

var React = require('react');
var focus = require('../../../../../../utilities/focus.js');
var Form = require('../../../../../Form/Form.js');
var FormLayout = require('../../../../../FormLayout/FormLayout.js');
var hooks = require('../../../../../../utilities/i18n/hooks.js');
var Modal = require('../../../../../Modal/Modal.js');
var TextField = require('../../../../../TextField/TextField.js');

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
  const i18n = hooks.useI18n();
  const [value, setValue] = React.useState(name);
  const container = React.useRef(null);
  const hasSameNameError = viewNames?.filter(viewName => viewName !== name).some(viewName => viewName.trim().toLowerCase() === value.trim().toLowerCase());
  const isPrimaryActionDisabled = isModalLoading || hasSameNameError || value === name || !value;
  React.useEffect(() => {
    if (!container.current) return;
    if (open) {
      focus.focusFirstFocusableNode(container.current);
    }
  }, [open]);
  React.useEffect(() => {
    if (open) {
      setValue(name);
    }
  }, [name, open]);
  const handleChange = React.useCallback(newValue => {
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
  return /*#__PURE__*/React.createElement(Modal.Modal, {
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
  }, /*#__PURE__*/React.createElement(Modal.Modal.Section, null, /*#__PURE__*/React.createElement(Form.Form, {
    onSubmit: handlePrimaryAction
  }, /*#__PURE__*/React.createElement(FormLayout.FormLayout, null, /*#__PURE__*/React.createElement("div", {
    ref: container
  }, /*#__PURE__*/React.createElement(TextField.TextField, {
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

exports.RenameModal = RenameModal;
