'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var bannerContext = require('../../utilities/banner-context.js');
var withinContentContext = require('../../utilities/within-content-context.js');
var css = require('../../utilities/css.js');
var breakpoints = require('../../utilities/breakpoints.js');
var useEventListener = require('../../utilities/use-event-listener.js');
var Banner_module = require('./Banner.css.js');
var utilities = require('./utilities.js');
var ButtonGroup = require('../ButtonGroup/ButtonGroup.js');
var hooks = require('../../utilities/i18n/hooks.js');
var Text = require('../Text/Text.js');
var Icon = require('../Icon/Icon.js');
var Button = require('../Button/Button.js');
var Box = require('../Box/Box.js');
var BlockStack = require('../BlockStack/BlockStack.js');
var InlineStack = require('../InlineStack/InlineStack.js');

const Banner = /*#__PURE__*/React.forwardRef(function Banner(props, bannerRef) {
  const {
    tone,
    stopAnnouncements
  } = props;
  const withinContentContainer = React.useContext(withinContentContext.WithinContentContext);
  const {
    wrapperRef,
    handleKeyUp,
    handleBlur,
    handleMouseUp,
    shouldShowFocus
  } = utilities.useBannerFocus(bannerRef);
  const className = css.classNames(Banner_module.default.Banner, shouldShowFocus && Banner_module.default.keyFocused, withinContentContainer ? Banner_module.default.withinContentContainer : Banner_module.default.withinPage);
  return /*#__PURE__*/React.createElement(bannerContext.BannerContext.Provider, {
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
  const i18n = hooks.useI18n();
  const withinContentContainer = React.useContext(withinContentContext.WithinContentContext);
  const isInlineIconBanner = !title && !withinContentContainer;
  const bannerTone = Object.keys(utilities.bannerAttributes).includes(tone) ? tone : 'info';
  const bannerColors = utilities.bannerAttributes[bannerTone][withinContentContainer ? 'withinContentContainer' : 'withinPage'];
  const sharedBannerProps = {
    backgroundColor: bannerColors.background,
    textColor: bannerColors.text,
    bannerTitle: title ? /*#__PURE__*/React.createElement(Text.Text, {
      as: "h2",
      variant: "headingSm",
      breakWord: true
    }, title) : null,
    bannerIcon: hideIcon ? null : /*#__PURE__*/React.createElement("span", {
      className: Banner_module.default[bannerColors.icon]
    }, /*#__PURE__*/React.createElement(Icon.Icon, {
      source: icon ?? utilities.bannerAttributes[bannerTone].icon
    })),
    actionButtons: action || secondaryAction ? /*#__PURE__*/React.createElement(ButtonGroup.ButtonGroup, null, action && /*#__PURE__*/React.createElement(Button.Button, Object.assign({
      onClick: action.onAction
    }, action), action.content), secondaryAction && /*#__PURE__*/React.createElement(Button.Button, Object.assign({
      onClick: secondaryAction.onAction
    }, secondaryAction), secondaryAction.content)) : null,
    dismissButton: onDismiss ? /*#__PURE__*/React.createElement(Button.Button, {
      variant: "tertiary",
      icon: /*#__PURE__*/React.createElement("span", {
        className: Banner_module.default[isInlineIconBanner ? 'icon-secondary' : bannerColors.icon]
      }, /*#__PURE__*/React.createElement(Icon.Icon, {
        source: polarisIcons.XIcon
      })),
      onClick: onDismiss,
      accessibilityLabel: i18n.translate('Polaris.Banner.dismissButton')
    }) : null
  };
  const childrenMarkup = children ? /*#__PURE__*/React.createElement(Text.Text, {
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
  } = breakpoints.useBreakpoints();
  const hasContent = children || actionButtons;
  return /*#__PURE__*/React.createElement(Box.Box, {
    width: "100%"
  }, /*#__PURE__*/React.createElement(BlockStack.BlockStack, {
    align: "space-between"
  }, /*#__PURE__*/React.createElement(Box.Box, {
    background: backgroundColor,
    color: textColor,
    borderStartStartRadius: smUp ? '300' : undefined,
    borderStartEndRadius: smUp ? '300' : undefined,
    borderEndStartRadius: !hasContent && smUp ? '300' : undefined,
    borderEndEndRadius: !hasContent && smUp ? '300' : undefined,
    padding: "300"
  }, /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    align: "space-between",
    blockAlign: "center",
    gap: "200",
    wrap: false
  }, /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    gap: "100",
    wrap: false
  }, bannerIcon, bannerTitle), dismissButton)), hasContent && /*#__PURE__*/React.createElement(Box.Box, {
    padding: {
      xs: '300',
      md: '400'
    },
    paddingBlockStart: "300"
  }, /*#__PURE__*/React.createElement(BlockStack.BlockStack, {
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
  const [blockAlign, setBlockAlign] = React.useState('center');
  const contentNode = React.useRef(null);
  const iconNode = React.useRef(null);
  const dismissIconNode = React.useRef(null);
  const handleResize = React.useCallback(() => {
    const contentHeight = contentNode.current?.offsetHeight;
    const iconBoxHeight = iconNode.current?.offsetHeight || dismissIconNode.current?.offsetHeight;
    if (!contentHeight || !iconBoxHeight) return;
    contentHeight > iconBoxHeight ? setBlockAlign('start') : setBlockAlign('center');
  }, []);
  React.useEffect(() => handleResize(), [handleResize]);
  useEventListener.useEventListener('resize', handleResize);
  return /*#__PURE__*/React.createElement(Box.Box, {
    width: "100%",
    padding: "300",
    borderRadius: "300"
  }, /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    align: "space-between",
    blockAlign: blockAlign,
    wrap: false
  }, /*#__PURE__*/React.createElement(Box.Box, {
    width: "100%"
  }, /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    gap: "200",
    wrap: false,
    blockAlign: blockAlign
  }, bannerIcon ? /*#__PURE__*/React.createElement("div", {
    ref: iconNode
  }, /*#__PURE__*/React.createElement(Box.Box, {
    background: backgroundColor,
    borderRadius: "200",
    padding: "100"
  }, bannerIcon)) : null, /*#__PURE__*/React.createElement(Box.Box, {
    ref: contentNode,
    width: "100%"
  }, /*#__PURE__*/React.createElement(BlockStack.BlockStack, {
    gap: "200"
  }, /*#__PURE__*/React.createElement("div", null, children), actionButtons)))), /*#__PURE__*/React.createElement("div", {
    ref: dismissIconNode,
    className: Banner_module.default.DismissIcon
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
  return /*#__PURE__*/React.createElement(Box.Box, {
    width: "100%",
    background: backgroundColor,
    padding: "200",
    borderRadius: "200",
    color: textColor
  }, /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    align: "space-between",
    blockAlign: "start",
    wrap: false,
    gap: "200"
  }, /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    gap: "150",
    wrap: false
  }, bannerIcon, /*#__PURE__*/React.createElement(Box.Box, {
    width: "100%"
  }, /*#__PURE__*/React.createElement(BlockStack.BlockStack, {
    gap: "200"
  }, /*#__PURE__*/React.createElement(BlockStack.BlockStack, {
    gap: "050"
  }, bannerTitle, /*#__PURE__*/React.createElement("div", null, children)), actionButtons))), dismissButton));
}

exports.Banner = Banner;
exports.BannerLayout = BannerLayout;
exports.DefaultBanner = DefaultBanner;
exports.InlineIconBanner = InlineIconBanner;
exports.WithinContentContainerBanner = WithinContentContainerBanner;
