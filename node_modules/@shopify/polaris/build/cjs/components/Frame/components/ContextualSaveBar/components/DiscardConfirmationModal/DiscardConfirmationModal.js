'use strict';

var React = require('react');
var Modal = require('../../../../../Modal/Modal.js');
var hooks = require('../../../../../../utilities/i18n/hooks.js');

function DiscardConfirmationModal({
  open,
  onDiscard,
  onCancel
}) {
  const i18n = hooks.useI18n();
  return /*#__PURE__*/React.createElement(Modal.Modal, {
    title: i18n.translate('Polaris.DiscardConfirmationModal.title'),
    open: open,
    onClose: onCancel,
    primaryAction: {
      content: i18n.translate('Polaris.DiscardConfirmationModal.primaryAction'),
      destructive: true,
      onAction: onDiscard
    },
    secondaryActions: [{
      content: i18n.translate('Polaris.DiscardConfirmationModal.secondaryAction'),
      onAction: onCancel
    }],
    sectioned: true
  }, i18n.translate('Polaris.DiscardConfirmationModal.message'));
}

exports.DiscardConfirmationModal = DiscardConfirmationModal;
