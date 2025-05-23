import React, { forwardRef, useContext, useState, useRef, useCallback, useEffect } from 'react';
import { XIcon } from '@shopify/polaris-icons';
import { BannerContext } from '../../utilities/banner-context.js';
import { WithinContentContext } from '../../utilities/within-content-context.js';
import { classNames } from '../../utilities/css.js';
import { useBreakpoints } from '../../utilities/breakpoints.js';
import { useEventListener } from '../../utilities/use-event-listener.js';
import styles from './Banner.css.js';
import { useBannerFocus, bannerAttributes } from './utilities.js';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup.js';
import { useI18n } from '../../utilities/i18n/hooks.js';
import { Text } from '../Text/Text.js';
import { Icon } from '../Icon/Icon.js';
import { Button } from '../Button/Button.js';
import { Box } from '../Box/Box.js';
import { BlockStack } from '../BlockStack/BlockStack.js';
import { InlineStack } from '../InlineStack/InlineStack.js';

const Banner = /*#__PURE__*/forwardRef(function Banner(props, bannerRef) {
  const {
    tone,
    stopAnnouncements
  } = props;
  const withinContentContainer = useContext(WithinContentContext);
  const {
    wrapperRef,
    handleKeyUp,
    handleBlur,
    handleMouseUp,
    shouldShowFocus
  } = useBannerFocus(bannerRef);
  const className = classNames(styles.Banner, shouldShowFocus && styles.keyFocused, withinContentContainer ? styles.withinContentContainer : styles.withinPage);
  return /*#__PURE__*/React.createElement(BannerContext.Provider, {
    value: true
  }, /*#__PURE__*/React.createElement("div", {
    className: className
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    ,
    tabIndex: 0,
    ref: wrapperRef,
    role: tone === 'warning' || tone === 'critical' ? 'alert' : 'status',
    "aria-live": stopAnnouncements ? 'off' : 'polite',
    onMouseUp: handleMouseUp,
    onKeyUp: handleKeyUp,
    onBlur: handleBlur
  }, /*#__PURE__*/React.createElement(BannerLayout, props)));
});
function BannerLayout({
  tone = 'info',
  icon,
  hideIcon,
  onDismiss,
  action,
  secondaryAction,
  title,
  children
}) {
  const i18n = useI18n();
  const withinContentContainer = useContext(WithinContentContext);
  const isInlineIconBanner = !title && !withinContentContainer;
  const bannerTone = Object.keys(bannerAttributes).includes(tone) ? tone : 'info';
  const bannerColors = bannerAttributes[bannerTone][withinContentContainer ? 'withinContentContainer' : 'withinPage'];
  const sharedBannerProps = {
    backgroundColor: bannerColors.background,
    textColor: bannerColors.text,
    bannerTitle: title ? /*#__PURE__*/React.createElement(Text, {
      as: "h2",
      variant: "headingSm",
      breakWord: true
    }, title) : null,
    bannerIcon: hideIcon ? null : /*#__PURE__*/React.createElement("span", {
      className: styles[bannerColors.icon]
    }, /*#__PURE__*/React.createElement(Icon, {
      source: icon ?? bannerAttributes[bannerTone].icon
    })),
    actionButtons: action || secondaryAction ? /*#__PURE__*/React.createElement(ButtonGroup, null, action && /*#__PURE__*/React.createElement(Button, Object.assign({
      onClick: action.onAction
    }, action), action.content), secondaryAction && /*#__PURE__*/React.createElement(Button, Object.assign({
      onClick: secondaryAction.onAction
    }, secondaryAction), secondaryAction.content)) : null,
    dismissButton: onDismiss ? /*#__PURE__*/React.createElement(Button, {
      variant: "tertiary",
      icon: /*#__PURE__*/React.createElement("span", {
        className: styles[isInlineIconBanner ? 'icon-secondary' : bannerColors.icon]
      }, /*#__PURE__*/React.createElement(Icon, {
        source: XIcon
      })),
      onClick: onDismiss,
      accessibilityLabel: i18n.translate('Polaris.Banner.dismissButton')
    }) : null
  };
  const childrenMarkup = children ? /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "bodyMd"
  }, children) : null;
  if (withinContentContainer) {
    return /*#__PURE__*/React.createElement(WithinContentContainerBanner, sharedBannerProps, childrenMarkup);
  }
  if (isInlineIconBanner) {
    return /*#__PURE__*/React.createElement(InlineIconBanner, sharedBannerProps, childrenMarkup);
  }
  return /*#__PURE__*/React.createElement(DefaultBanner, sharedBannerProps, childrenMarkup);
}
function DefaultBanner({
  backgroundColor,
  textColor,
  bannerTitle,
  bannerIcon,
  actionButtons,
  dismissButton,
  children
}) {
  const {
    smUp
  } = useBreakpoints();
  const hasContent = children || actionButtons;
  return /*#__PURE__*/React.createElement(Box, {
    width: "100%"
  }, /*#__PURE__*/React.createElement(BlockStack, {
    align: "space-between"
  }, /*#__PURE__*/React.createElement(Box, {
    background: backgroundColor,
    color: textColor,
    borderStartStartRadius: smUp ? '300' : undefined,
    borderStartEndRadius: smUp ? '300' : undefined,
    borderEndStartRadius: !hasContent && smUp ? '300' : undefined,
    borderEndEndRadius: !hasContent && smUp ? '300' : undefined,
    padding: "300"
  }, /*#__PURE__*/React.createElement(InlineStack, {
    align: "space-between",
    blockAlign: "center",
    gap: "200",
    wrap: false
  }, /*#__PURE__*/React.createElement(InlineStack, {
    gap: "100",
    wrap: false
  }, bannerIcon, bannerTitle), dismissButton)), hasContent && /*#__PURE__*/React.createElement(Box, {
    padding: {
      xs: '300',
      md: '400'
    },
    paddingBlockStart: "300"
  }, /*#__PURE__*/React.createElement(BlockStack, {
    gap: "200"
  }, /*#__PURE__*/React.createElement("div", null, children), actionButtons))));
}
function InlineIconBanner({
  backgroundColor,
  bannerIcon,
  actionButtons,
  dismissButton,
  children
}) {
  const [blockAlign, setBlockAlign] = useState('center');
  const contentNode = useRef(null);
  const iconNode = useRef(null);
  const dismissIconNode = useRef(null);
  const handleResize = useCallback(() => {
    const contentHeight = contentNode.current?.offsetHeight;
    const iconBoxHeight = iconNode.current?.offsetHeight || dismissIconNode.current?.offsetHeight;
    if (!contentHeight || !iconBoxHeight) return;
    contentHeight > iconBoxHeight ? setBlockAlign('start') : setBlockAlign('center');
  }, []);
  useEffect(() => handleResize(), [handleResize]);
  useEventListener('resize', handleResize);
  return /*#__PURE__*/React.createElement(Box, {
    width: "100%",
    padding: "300",
    borderRadius: "300"
  }, /*#__PURE__*/React.createElement(InlineStack, {
    align: "space-between",
    blockAlign: blockAlign,
    wrap: false
  }, /*#__PURE__*/React.createElement(Box, {
    width: "100%"
  }, /*#__PURE__*/React.createElement(InlineStack, {
    gap: "200",
    wrap: false,
    blockAlign: blockAlign
  }, bannerIcon ? /*#__PURE__*/React.createElement("div", {
    ref: iconNode
  }, /*#__PURE__*/React.createElement(Box, {
    background: backgroundColor,
    borderRadius: "200",
    padding: "100"
  }, bannerIcon)) : null, /*#__PURE__*/React.createElement(Box, {
    ref: contentNode,
    width: "100%"
  }, /*#__PURE__*/React.createElement(BlockStack, {
    gap: "200"
  }, /*#__PURE__*/React.createElement("div", null, children), actionButtons)))), /*#__PURE__*/React.createElement("div", {
    ref: dismissIconNode,
    className: styles.DismissIcon
  }, dismissButton)));
}
function WithinContentContainerBanner({
  backgroundColor,
  textColor,
  bannerTitle,
  bannerIcon,
  actionButtons,
  dismissButton,
  children
}) {
  return /*#__PURE__*/React.createElement(Box, {
    width: "100%",
    background: backgroundColor,
    padding: "200",
    borderRadius: "200",
    color: textColor
  }, /*#__PURE__*/React.createElement(InlineStack, {
    align: "space-between",
    blockAlign: "start",
    wrap: false,
    gap: "200"
  }, /*#__PURE__*/React.createElement(InlineStack, {
    gap: "150",
    wrap: false
  }, bannerIcon, /*#__PURE__*/React.createElement(Box, {
    width: "100%"
  }, /*#__PURE__*/React.createElement(BlockStack, {
    gap: "200"
  }, /*#__PURE__*/React.createElement(BlockStack, {
    gap: "050"
  }, bannerTitle, /*#__PURE__*/React.createElement("div", null, children)), actionButtons))), dismissButton));
}

export { Banner, BannerLayout, DefaultBanner, InlineIconBanner, WithinContentContainerBanner };
