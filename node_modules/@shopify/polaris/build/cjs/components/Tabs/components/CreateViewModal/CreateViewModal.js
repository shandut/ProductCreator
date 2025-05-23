'use strict';

var React = require('react');
var useIsTouchDevice = require('../../../../utilities/use-is-touch-device.js');
var focus = require('../../../../utilities/focus.js');
var hooks = require('../../../../utilities/i18n/hooks.js');
var Modal = require('../../../Modal/Modal.js');
var Form = require('../../../Form/Form.js');
var FormLayout = require('../../../FormLayout/FormLayout.js');
var TextField = require('../../../TextField/TextField.js');

const MAX_VIEW_NAME_LENGTH = 40;
function CreateViewModal({
  activator,
  open,
  onClose,
  onClickPrimaryAction,
  onClickSecondaryAction,
  viewNames
}) {
  const i18n = hooks.useI18n();
  const [value, setValue] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const container = React.useRef(null);
  const isTouchDevice = useIsTouchDevice.useIsTouchDevice();
  const hasSameNameError = viewNames.some(viewName => viewName.trim().toLowerCase() === value.trim().toLowerCase());
  const isPrimaryActionDisabled = !value || hasSameNameError || loading || value.length > MAX_VIEW_NAME_LENGTH;
  React.useEffect(() => {
    if (!container.current || isTouchDevice) return;
    if (open) {
      focus.focusFirstFocusableNode(container.current);
      const timeout = setTimeout(() => {
        if (!container.current) return;
        focus.focusFirstFocusableNode(container.current);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [open, isTouchDevice]);
  const handleChange = React.useCallback(newValue => {
    setValue(newValue);
  }, []);
  async function handlePrimaryAction() {
    if (hasSameNameError || isPrimaryActionDisabled) {
      return;
    }
    setLoading(true);
    await onClickPrimaryAction(value);
    setLoading(false);
    setValue('');
    onClose();
  }
  function handleSecondaryAction() {
    onClickSecondaryAction?.();
    setValue('');
    onClose();
  }
  return /*#__PURE__*/React.createElement(Modal.Modal, {
    activator: activator,
    open: open,
    onClose: onClose,
    title: i18n.translate('Polaris.Tabs.CreateViewModal.title'),
    primaryAction: {
      content: i18n.translate('Polaris.Tabs.CreateViewModal.create'),
      onAction: handlePrimaryAction,
      disabled: isPrimaryActionDisabled
    },
    secondaryActions: [{
      content: i18n.translate('Polaris.Tabs.CreateViewModal.cancel'),
      onAction: handleSecondaryAction
    }]
  }, /*#__PURE__*/React.createElement(Modal.Modal.Section, null, /*#__PURE__*/React.createElement(Form.Form, {
    onSubmit: handlePrimaryAction
  }, /*#__PURE__*/React.createElement(FormLayout.FormLayout, null, /*#__PURE__*/React.createElement("div", {
    ref: container
  }, /*#__PURE__*/React.createElement(TextField.TextField, {
    label: i18n.translate('Polaris.Tabs.CreateViewModal.label'),
    value: value,
    onChange: handleChange,
    autoComplete: "off",
    maxLength: MAX_VIEW_NAME_LENGTH,
    showCharacterCount: true,
    error: hasSameNameError ? i18n.translate('Polaris.Tabs.CreateViewModal.errors.sameName', {
      name: value
    }) : undefined
  }))))));
}

exports.CreateViewModal = CreateViewModal;
