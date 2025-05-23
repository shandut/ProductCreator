'use strict';

var React = require('react');
var focus = require('../../../../utilities/focus.js');
var useIsTouchDevice = require('../../../../utilities/use-is-touch-device.js');
var hooks = require('../../../../utilities/i18n/hooks.js');
var Button = require('../../../Button/Button.js');
var InlineStack = require('../../../InlineStack/InlineStack.js');
var Modal = require('../../../Modal/Modal.js');
var Form = require('../../../Form/Form.js');
var FormLayout = require('../../../FormLayout/FormLayout.js');
var TextField = require('../../../TextField/TextField.js');

const MAX_VIEW_NAME_LENGTH = 40;
function UpdateButtons({
  primaryAction,
  cancelAction,
  viewNames,
  disabled
}) {
  const i18n = hooks.useI18n();
  const [savedViewName, setSavedViewName] = React.useState('');
  const [savedViewModalOpen, setSavedViewModalOpen] = React.useState(false);
  const container = React.useRef(null);
  const isTouchDevice = useIsTouchDevice.useIsTouchDevice();
  React.useEffect(() => {
    if (!container.current || isTouchDevice) return;
    if (savedViewModalOpen) {
      focus.focusFirstFocusableNode(container.current);
    }
  }, [savedViewModalOpen, isTouchDevice]);
  async function handleClickSaveButton() {
    if (primaryAction?.type === 'save-as') {
      handleOpenModal();
    } else {
      await primaryAction?.onAction('');
    }
  }
  function handleOpenModal() {
    setSavedViewModalOpen(true);
  }
  function handleCloseModal() {
    setSavedViewModalOpen(false);
  }
  function handleChange(value) {
    setSavedViewName(value);
  }
  async function handlePrimaryAction() {
    if (isPrimaryActionDisabled) return;
    await primaryAction?.onAction(savedViewName);
    handleCloseModal();
  }
  const buttonText = React.useMemo(() => {
    switch (primaryAction?.type) {
      case 'save':
        return i18n.translate('Polaris.IndexFilters.UpdateButtons.save');
      case 'save-as':
      default:
        return i18n.translate('Polaris.IndexFilters.UpdateButtons.saveAs');
    }
  }, [primaryAction?.type, i18n]);
  const saveButton = /*#__PURE__*/React.createElement(Button.Button, {
    size: "micro",
    onClick: handleClickSaveButton,
    disabled: primaryAction?.disabled || disabled
  }, buttonText);
  const hasSameNameError = viewNames.some(name => name.trim().toLowerCase() === savedViewName.trim().toLowerCase());
  const isPrimaryActionDisabled = hasSameNameError || !savedViewName || primaryAction?.loading || savedViewName.length > MAX_VIEW_NAME_LENGTH;
  const cancelButtonMarkup = cancelAction ? /*#__PURE__*/React.createElement(Button.Button, {
    variant: "tertiary",
    size: "micro",
    onClick: cancelAction.onAction,
    disabled: disabled
  }, i18n.translate('Polaris.IndexFilters.UpdateButtons.cancel')) : null;
  if (!primaryAction) {
    return cancelButtonMarkup;
  }
  return /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    align: "start",
    blockAlign: "center",
    gap: "100"
  }, cancelButtonMarkup, primaryAction.type === 'save-as' ? /*#__PURE__*/React.createElement(Modal.Modal, {
    activator: /*#__PURE__*/React.createElement(InlineStack.InlineStack, null, saveButton),
    open: savedViewModalOpen,
    title: i18n.translate('Polaris.IndexFilters.UpdateButtons.modal.title'),
    onClose: handleCloseModal,
    primaryAction: {
      onAction: handlePrimaryAction,
      content: i18n.translate('Polaris.IndexFilters.UpdateButtons.modal.save'),
      disabled: isPrimaryActionDisabled
    },
    secondaryActions: [{
      onAction: handleCloseModal,
      content: i18n.translate('Polaris.IndexFilters.UpdateButtons.modal.cancel')
    }]
  }, /*#__PURE__*/React.createElement(Modal.Modal.Section, null, /*#__PURE__*/React.createElement(Form.Form, {
    onSubmit: handlePrimaryAction
  }, /*#__PURE__*/React.createElement(FormLayout.FormLayout, null, /*#__PURE__*/React.createElement("div", {
    ref: container
  }, /*#__PURE__*/React.createElement(TextField.TextField, {
    label: i18n.translate('Polaris.IndexFilters.UpdateButtons.modal.label'),
    value: savedViewName,
    onChange: handleChange,
    autoComplete: "off",
    maxLength: MAX_VIEW_NAME_LENGTH,
    showCharacterCount: true,
    error: hasSameNameError ? i18n.translate('Polaris.IndexFilters.UpdateButtons.modal.sameName', {
      name: savedViewName
    }) : undefined
  })))))) : saveButton);
}

exports.UpdateButtons = UpdateButtons;
