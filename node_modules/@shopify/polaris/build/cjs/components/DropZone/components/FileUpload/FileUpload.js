'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../../../utilities/css.js');
var capitalize = require('../../../../utilities/capitalize.js');
var context = require('../../context.js');
var index = require('../../utils/index.js');
var FileUpload_module = require('./FileUpload.css.js');
var hooks = require('../../../../utilities/i18n/hooks.js');
var Icon = require('../../../Icon/Icon.js');
var BlockStack = require('../../../BlockStack/BlockStack.js');
var Button = require('../../../Button/Button.js');
var Text = require('../../../Text/Text.js');

function FileUpload(props) {
  const i18n = hooks.useI18n();
  const {
    size,
    measuring,
    type,
    disabled,
    allowMultiple
  } = React.useContext(context.DropZoneContext);
  const typeSuffix = capitalize.capitalize(type);
  const allowMultipleKey = index.createAllowMultipleKey(allowMultiple);
  const {
    actionTitle = i18n.translate(`Polaris.DropZone.${allowMultipleKey}.actionTitle${typeSuffix}`),
    actionHint
  } = props;
  const actionMarkup = /*#__PURE__*/React.createElement(Button.Button, {
    disabled: disabled
  }, actionTitle);
  const fileUploadClassName = css.classNames(FileUpload_module.default.FileUpload, measuring && FileUpload_module.default.measuring, size === 'large' && FileUpload_module.default.large, size === 'small' && FileUpload_module.default.small);
  const actionHintMarkup = actionHint && /*#__PURE__*/React.createElement(Text.Text, {
    variant: "bodySm",
    as: "p",
    tone: "subdued"
  }, actionHint);
  let viewMarkup;
  switch (size) {
    case 'large':
    case 'medium':
      viewMarkup = /*#__PURE__*/React.createElement(BlockStack.BlockStack, {
        inlineAlign: "center",
        gap: "200"
      }, actionMarkup, actionHintMarkup);
      break;
    case 'small':
      viewMarkup = /*#__PURE__*/React.createElement("div", {
        className: css.classNames(FileUpload_module.default.UploadIcon, disabled && FileUpload_module.default.disabled)
      }, /*#__PURE__*/React.createElement(Icon.Icon, {
        source: polarisIcons.UploadIcon
      }));
      break;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: fileUploadClassName
  }, viewMarkup);
}

exports.FileUpload = FileUpload;
