import React from 'react';
import { XIcon, MenuHorizontalIcon } from '@shopify/polaris-icons';
import { useToggle } from '../../utilities/use-toggle.js';
import { classNames } from '../../utilities/css.js';
import styles from './MediaCard.css.js';
import { useI18n } from '../../utilities/i18n/hooks.js';
import { Button } from '../Button/Button.js';
import { InlineStack } from '../InlineStack/InlineStack.js';
import { Popover } from '../Popover/Popover.js';
import { ActionList } from '../ActionList/ActionList.js';
import { buttonFrom } from '../Button/utils.js';
import { LegacyCard } from '../LegacyCard/LegacyCard.js';
import { Box } from '../Box/Box.js';
import { BlockStack } from '../BlockStack/BlockStack.js';
import { Text } from '../Text/Text.js';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup.js';

function MediaCard({
  title,
  children,
  primaryAction,
  secondaryAction,
  description,
  popoverActions = [],
  portrait = false,
  size = 'medium',
  onDismiss
}) {
  const i18n = useI18n();
  const {
    value: popoverActive,
    toggle: togglePopoverActive
  } = useToggle(false);
  let headerMarkup = null;
  if (title) {
    const headerContent = typeof title === 'string' ? /*#__PURE__*/React.createElement(Text, {
      variant: "headingSm",
      as: "h2"
    }, title) : title;
    headerMarkup = /*#__PURE__*/React.createElement("div", null, headerContent);
  }
  const dismissButtonMarkup = onDismiss ? /*#__PURE__*/React.createElement(Button, {
    icon: XIcon,
    onClick: onDismiss,
    size: "slim",
    accessibilityLabel: i18n.translate('Polaris.MediaCard.dismissButton'),
    variant: "tertiary"
  }) : null;
  const popoverActivator = /*#__PURE__*/React.createElement(InlineStack, {
    blockAlign: "center"
  }, /*#__PURE__*/React.createElement(Button, {
    icon: MenuHorizontalIcon,
    onClick: togglePopoverActive,
    size: "slim",
    accessibilityLabel: i18n.translate('Polaris.MediaCard.popoverButton'),
    variant: "tertiary"
  }));
  const popoverActionsMarkup = popoverActions.length > 0 ? /*#__PURE__*/React.createElement(Popover, {
    active: popoverActive,
    activator: popoverActivator,
    onClose: togglePopoverActive,
    preferredAlignment: "left",
    preferredPosition: "below"
  }, /*#__PURE__*/React.createElement(ActionList, {
    items: popoverActions,
    onActionAnyItem: togglePopoverActive
  })) : null;
  const primaryActionMarkup = primaryAction ? /*#__PURE__*/React.createElement("div", null, buttonFrom(primaryAction)) : null;
  const secondaryActionMarkup = secondaryAction ? /*#__PURE__*/React.createElement("div", null, buttonFrom(secondaryAction)) : null;
  const actionClassName = classNames(styles.ActionContainer, portrait && styles.portrait);
  const actionMarkup = primaryActionMarkup || secondaryActionMarkup ? /*#__PURE__*/React.createElement("div", {
    className: actionClassName
  }, /*#__PURE__*/React.createElement(ButtonGroup, null, primaryActionMarkup, secondaryActionMarkup)) : null;
  const mediaCardClassName = classNames(styles.MediaCard, portrait && styles.portrait);
  const mediaContainerClassName = classNames(styles.MediaContainer, portrait && styles.portrait, size === 'small' && styles.sizeSmall);
  const infoContainerClassName = classNames(styles.InfoContainer, portrait && styles.portrait, size === 'small' && styles.sizeSmall);
  const popoverOrDismissMarkup = popoverActionsMarkup || dismissButtonMarkup ? /*#__PURE__*/React.createElement(Box, {
    position: "absolute",
    insetInlineEnd: "500",
    zIndex: "var(--p-z-index-2)"
  }, /*#__PURE__*/React.createElement(InlineStack, {
    gap: "100",
    wrap: false
  }, popoverActionsMarkup, dismissButtonMarkup)) : null;
  return /*#__PURE__*/React.createElement(LegacyCard, null, /*#__PURE__*/React.createElement("div", {
    className: mediaCardClassName
  }, /*#__PURE__*/React.createElement("div", {
    className: mediaContainerClassName
  }, children), /*#__PURE__*/React.createElement("div", {
    className: infoContainerClassName
  }, /*#__PURE__*/React.createElement(Box, {
    padding: "500"
  }, /*#__PURE__*/React.createElement(BlockStack, {
    gap: "200"
  }, /*#__PURE__*/React.createElement(InlineStack, {
    wrap: false,
    align: "space-between",
    gap: "200"
  }, headerMarkup, popoverOrDismissMarkup), /*#__PURE__*/React.createElement(Text, {
    as: "p",
    variant: "bodySm"
  }, description), actionMarkup)))));
}

export { MediaCard };
