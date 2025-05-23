import React, { useMemo, StrictMode, Fragment } from 'react';
import { themeNameDefault } from '@shopify/polaris-tokens';
import { merge } from '../../utilities/merge.js';
import { ThemeNameContext, ThemeContext, getTheme } from '../../utilities/use-theme.js';
import { I18n } from '../../utilities/i18n/I18n.js';
import { ScrollLockManager } from '../../utilities/scroll-lock-manager/scroll-lock-manager.js';
import { StickyManager } from '../../utilities/sticky-manager/sticky-manager.js';
import { FeaturesContext } from '../../utilities/features/context.js';
import { I18nContext } from '../../utilities/i18n/context.js';
import { ScrollLockManagerContext } from '../../utilities/scroll-lock-manager/context.js';
import { StickyManagerContext } from '../../utilities/sticky-manager/context.js';
import { LinkContext } from '../../utilities/link/context.js';
import { MediaQueryContext } from '../../utilities/media-query/context.js';
import { PortalsManager } from '../PortalsManager/PortalsManager.js';
import { FocusManager } from '../FocusManager/FocusManager.js';
import { EphemeralPresenceManager } from '../EphemeralPresenceManager/EphemeralPresenceManager.js';
import { FrameContext } from '../../utilities/frame/context.js';

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
  theme: themeName = themeNameDefault
}) {
  const Wrapper = strict ? StrictMode : Fragment;
  const intl = useMemo(() => new I18n(i18n || {}), [i18n]);
  const scrollLockManager = useMemo(() => new ScrollLockManager(), []);
  const stickyManager = useMemo(() => new StickyManager(), []);
  const mergedFrame = createFrameContext(frame);
  const mergedMediaQuery = merge(defaultMediaQuery, mediaQuery);
  return /*#__PURE__*/React.createElement(Wrapper, null, /*#__PURE__*/React.createElement(ThemeNameContext.Provider, {
    value: themeName
  }, /*#__PURE__*/React.createElement(ThemeContext.Provider, {
    value: getTheme(themeName)
  }, /*#__PURE__*/React.createElement(FeaturesContext.Provider, {
    value: features
  }, /*#__PURE__*/React.createElement(I18nContext.Provider, {
    value: intl
  }, /*#__PURE__*/React.createElement(ScrollLockManagerContext.Provider, {
    value: scrollLockManager
  }, /*#__PURE__*/React.createElement(StickyManagerContext.Provider, {
    value: stickyManager
  }, /*#__PURE__*/React.createElement(LinkContext.Provider, {
    value: link
  }, /*#__PURE__*/React.createElement(MediaQueryContext.Provider, {
    value: mergedMediaQuery
  }, /*#__PURE__*/React.createElement(PortalsManager, null, /*#__PURE__*/React.createElement(FocusManager, null, /*#__PURE__*/React.createElement(EphemeralPresenceManager, null, /*#__PURE__*/React.createElement(FrameContext.Provider, {
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

export { PolarisTestProvider };
