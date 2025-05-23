import React from 'react';
import { ExitIcon } from '@shopify/polaris-icons';
import styles from './FullscreenBar.css.js';
import { useI18n } from '../../utilities/i18n/hooks.js';
import { Text } from '../Text/Text.js';
import { Icon } from '../Icon/Icon.js';

function FullscreenBar({
  onAction,
  children
}) {
  const i18n = useI18n();
  const backButtonMarkup = /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "bodyLg"
  }, i18n.translate('Polaris.FullscreenBar.back'));
  return /*#__PURE__*/React.createElement("div", {
    className: styles.FullscreenBar
  }, /*#__PURE__*/React.createElement("button", {
    className: styles.BackAction,
    onClick: onAction,
    "aria-label": i18n.translate('Polaris.FullscreenBar.accessibilityLabel')
  }, /*#__PURE__*/React.createElement(Icon, {
    source: ExitIcon
  }), backButtonMarkup), children);
}

export { FullscreenBar };
