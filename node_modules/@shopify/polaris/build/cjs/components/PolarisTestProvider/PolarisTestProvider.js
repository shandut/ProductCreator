'use strict';

var React = require('react');
var polarisTokens = require('@shopify/polaris-tokens');
var merge = require('../../utilities/merge.js');
var useTheme = require('../../utilities/use-theme.js');
var I18n = require('../../utilities/i18n/I18n.js');
var scrollLockManager = require('../../utilities/scroll-lock-manager/scroll-lock-manager.js');
var stickyManager = require('../../utilities/sticky-manager/sticky-manager.js');
var context = require('../../utilities/features/context.js');
var context$1 = require('../../utilities/i18n/context.js');
var context$2 = require('../../utilities/scroll-lock-manager/context.js');
var context$3 = require('../../utilities/sticky-manager/context.js');
var context$4 = require('../../utilities/link/context.js');
var context$5 = require('../../utilities/media-query/context.js');
var PortalsManager = require('../PortalsManager/PortalsManager.js');
var FocusManager = require('../FocusManager/FocusManager.js');
var EphemeralPresenceManager = require('../EphemeralPresenceManager/EphemeralPresenceManager.js');
var context$6 = require('../../utilities/frame/context.js');

/**
 * When writing a custom mounting function `mountWithAppContext(node, options)`
 * this is the type of the options object. These values are customizable when
 * you call the app
 */

const defaultMediaQuery = {
  isNavigationCollapsed: false
};
function PolarisTestProvider({
  strict,
  children,
  i18n,
  link,
  mediaQuery,
  features = {},
  frame,
  theme: themeName = polarisTokens.themeNameDefault
}) {
  const Wrapper = strict ? React.StrictMode : React.Fragment;
  const intl = React.useMemo(() => new I18n.I18n(i18n || {}), [i18n]);
  const scrollLockManager$1 = React.useMemo(() => new scrollLockManager.ScrollLockManager(), []);
  const stickyManager$1 = React.useMemo(() => new stickyManager.StickyManager(), []);
  const mergedFrame = createFrameContext(frame);
  const mergedMediaQuery = merge.merge(defaultMediaQuery, mediaQuery);
  return /*#__PURE__*/React.createElement(Wrapper, null, /*#__PURE__*/React.createElement(useTheme.ThemeNameContext.Provider, {
    value: themeName
  }, /*#__PURE__*/React.createElement(useTheme.ThemeContext.Provider, {
    value: useTheme.getTheme(themeName)
  }, /*#__PURE__*/React.createElement(context.FeaturesContext.Provider, {
    value: features
  }, /*#__PURE__*/React.createElement(context$1.I18nContext.Provider, {
    value: intl
  }, /*#__PURE__*/React.createElement(context$2.ScrollLockManagerContext.Provider, {
    value: scrollLockManager$1
  }, /*#__PURE__*/React.createElement(context$3.StickyManagerContext.Provider, {
    value: stickyManager$1
  }, /*#__PURE__*/React.createElement(context$4.LinkContext.Provider, {
    value: link
  }, /*#__PURE__*/React.createElement(context$5.MediaQueryContext.Provider, {
    value: mergedMediaQuery
  }, /*#__PURE__*/React.createElement(PortalsManager.PortalsManager, null, /*#__PURE__*/React.createElement(FocusManager.FocusManager, null, /*#__PURE__*/React.createElement(EphemeralPresenceManager.EphemeralPresenceManager, null, /*#__PURE__*/React.createElement(context$6.FrameContext.Provider, {
    value: mergedFrame
  }, children)))))))))))));
}
function noop() {}
function createFrameContext({
  logo = undefined,
  showToast = noop,
  hideToast = noop,
  toastMessages = [],
  setContextualSaveBar = noop,
  removeContextualSaveBar = noop,
  contextualSaveBarVisible = false,
  contextualSaveBarProps = {},
  startLoading = noop,
  stopLoading = noop
} = {}) {
  return {
    logo,
    showToast,
    hideToast,
    toastMessages,
    setContextualSaveBar,
    removeContextualSaveBar,
    contextualSaveBarVisible,
    contextualSaveBarProps,
    startLoading,
    stopLoading
  };
}

exports.PolarisTestProvider = PolarisTestProvider;
