import React, { useContext } from 'react';
import { UploadIcon } from '@shopify/polaris-icons';
import { classNames } from '../../../../utilities/css.js';
import { capitalize } from '../../../../utilities/capitalize.js';
import { DropZoneContext } from '../../context.js';
import { createAllowMultipleKey } from '../../utils/index.js';
import styles from './FileUpload.css.js';
import { useI18n } from '../../../../utilities/i18n/hooks.js';
import { Icon } from '../../../Icon/Icon.js';
import { BlockStack } from '../../../BlockStack/BlockStack.js';
import { Button } from '../../../Button/Button.js';
import { Text } from '../../../Text/Text.js';

function FileUpload(props) {
  const i18n = useI18n();
  const {
    size,
    measuring,
    type,
    disabled,
    allowMultiple
  } = useContext(DropZoneContext);
  const typeSuffix = capitalize(type);
  const allowMultipleKey = createAllowMultipleKey(allowMultiple);
  const {
    actionTitle = i18n.translate(`Polaris.DropZone.${allowMultipleKey}.actionTitle${typeSuffix}`),
    actionHint
  } = props;
  const actionMarkup = /*#__PURE__*/React.createElement(Button, {
    disabled: disabled
  }, actionTitle);
  const fileUploadClassName = classNames(styles.FileUpload, measuring && styles.measuring, size === 'large' && styles.large, size === 'small' && styles.small);
  const actionHintMarkup = actionHint && /*#__PURE__*/React.createElement(Text, {
    variant: "bodySm",
    as: "p",
    tone: "subdued"
  }, actionHint);
  let viewMarkup;
  switch (size) {
    case 'large':
    case 'medium':
      viewMarkup = /*#__PURE__*/React.createElement(BlockStack, {
        inlineAlign: "center",
        gap: "200"
      }, actionMarkup, actionHintMarkup);
      break;
    case 'small':
      viewMarkup = /*#__PURE__*/React.createElement("div", {
        className: classNames(styles.UploadIcon, disabled && styles.disabled)
      }, /*#__PURE__*/React.createElement(Icon, {
        source: UploadIcon
      }));
      break;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: fileUploadClassName
  }, viewMarkup);
}

export { FileUpload };
