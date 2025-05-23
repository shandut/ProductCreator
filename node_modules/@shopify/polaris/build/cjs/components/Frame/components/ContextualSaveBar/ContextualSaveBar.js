'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../../../utilities/css.js');
var getWidth = require('../../../../utilities/get-width.js');
var useToggle = require('../../../../utilities/use-toggle.js');
var ContextualSaveBar_module = require('./ContextualSaveBar.css.js');
var DiscardConfirmationModal = require('./components/DiscardConfirmationModal/DiscardConfirmationModal.js');
var hooks = require('../../../../utilities/i18n/hooks.js');
var hooks$1 = require('../../../../utilities/frame/hooks.js');
var Button = require('../../../Button/Button.js');
var Image = require('../../../Image/Image.js');
var Icon = require('../../../Icon/Icon.js');
var Text = require('../../../Text/Text.js');
var LegacyStack = require('../../../LegacyStack/LegacyStack.js');

function ContextualSaveBar({
  alignContentFlush,
  message,
  saveAction,
  discardAction,
  fullWidth,
  contextControl,
  secondaryMenu
}) {
  const i18n = hooks.useI18n();
  const {
    logo
  } = hooks$1.useFrame();
  const {
    value: discardConfirmationModalVisible,
    toggle: toggleDiscardConfirmationModal,
    setFalse: closeDiscardConfirmationModal
  } = useToggle.useToggle(false);
  const handleDiscardAction = React.useCallback(() => {
    if (discardAction && discardAction.onAction) {
      discardAction.onAction();
    }
    closeDiscardConfirmationModal();
  }, [closeDiscardConfirmationModal, discardAction]);
  const discardActionContent = discardAction && discardAction.content ? discardAction.content : i18n.translate('Polaris.ContextualSaveBar.discard');
  let discardActionHandler;
  if (discardAction && discardAction.discardConfirmationModal) {
    discardActionHandler = toggleDiscardConfirmationModal;
  } else if (discardAction) {
    discardActionHandler = discardAction.onAction;
  }
  const discardConfirmationModalMarkup = discardAction && discardAction.onAction && discardAction.discardConfirmationModal && /*#__PURE__*/React.createElement(DiscardConfirmationModal.DiscardConfirmationModal, {
    open: discardConfirmationModalVisible,
    onCancel: toggleDiscardConfirmationModal,
    onDiscard: handleDiscardAction
  });
  const discardActionMarkup = discardAction && /*#__PURE__*/React.createElement(Button.Button, {
    variant: "tertiary",
    size: "large",
    url: discardAction.url,
    onClick: discardActionHandler,
    loading: discardAction.loading,
    disabled: discardAction.disabled,
    accessibilityLabel: discardAction.content
  }, discardActionContent);
  const saveActionContent = saveAction && saveAction.content ? saveAction.content : i18n.translate('Polaris.ContextualSaveBar.save');
  const saveActionMarkup = saveAction && /*#__PURE__*/React.createElement(Button.Button, {
    variant: "primary",
    tone: "success",
    size: "large",
    url: saveAction.url,
    onClick: saveAction.onAction,
    loading: saveAction.loading,
    disabled: saveAction.disabled,
    accessibilityLabel: saveAction.content
  }, saveActionContent);
  const width = getWidth.getWidth(logo, 104);
  const imageMarkup = logo && /*#__PURE__*/React.createElement(Image.Image, {
    style: {
      width
    },
    source: logo.contextualSaveBarSource || '',
    alt: ""
  });
  const logoMarkup = alignContentFlush || contextControl ? null : /*#__PURE__*/React.createElement("div", {
    className: ContextualSaveBar_module.default.LogoContainer,
    style: {
      width
    }
  }, imageMarkup);
  const contextControlMarkup = contextControl ? /*#__PURE__*/React.createElement("div", {
    className: ContextualSaveBar_module.default.ContextControl
  }, contextControl) : null;
  const contentsClassName = css.classNames(ContextualSaveBar_module.default.Contents, fullWidth && ContextualSaveBar_module.default.fullWidth);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: ContextualSaveBar_module.default.ContextualSaveBar
  }, contextControlMarkup, logoMarkup, /*#__PURE__*/React.createElement("div", {
    className: contentsClassName
  }, /*#__PURE__*/React.createElement("div", {
    className: ContextualSaveBar_module.default.MessageContainer
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.AlertTriangleIcon
  }), message && /*#__PURE__*/React.createElement(Text.Text, {
    as: "h2",
    variant: "headingMd",
    tone: "text-inverse",
    truncate: true
  }, message)), /*#__PURE__*/React.createElement("div", {
    className: ContextualSaveBar_module.default.ActionContainer
  }, /*#__PURE__*/React.createElement(LegacyStack.LegacyStack, {
    spacing: "tight",
    wrap: false
  }, secondaryMenu, discardActionMarkup, saveActionMarkup)))), discardConfirmationModalMarkup);
}

exports.ContextualSaveBar = ContextualSaveBar;
