'use strict';

var React = require('react');
var polarisTokens = require('@shopify/polaris-tokens');
var useTheme = require('../../utilities/use-theme.js');
require('./global.css.js');
var stickyManager = require('../../utilities/sticky-manager/sticky-manager.js');
var scrollLockManager = require('../../utilities/scroll-lock-manager/scroll-lock-manager.js');
var I18n = require('../../utilities/i18n/I18n.js');
var context = require('../../utilities/features/context.js');
var context$1 = require('../../utilities/i18n/context.js');
var context$2 = require('../../utilities/scroll-lock-manager/context.js');
var context$3 = require('../../utilities/sticky-manager/context.js');
var context$4 = require('../../utilities/link/context.js');
var MediaQueryProvider = require('../MediaQueryProvider/MediaQueryProvider.js');
var PortalsManager = require('../PortalsManager/PortalsManager.js');
var FocusManager = require('../FocusManager/FocusManager.js');
var EphemeralPresenceManager = require('../EphemeralPresenceManager/EphemeralPresenceManager.js');

const MAX_SCROLLBAR_WIDTH = 20;
const SCROLLBAR_TEST_ELEMENT_PARENT_SIZE = 30;
const SCROLLBAR_TEST_ELEMENT_CHILD_SIZE = SCROLLBAR_TEST_ELEMENT_PARENT_SIZE + 10;
function measureScrollbars() {
  const parentEl = document.createElement('div');
  parentEl.setAttribute('style', `position: absolute; opacity: 0; transform: translate3d(-9999px, -9999px, 0); pointer-events: none; width:${SCROLLBAR_TEST_ELEMENT_PARENT_SIZE}px; height:${SCROLLBAR_TEST_ELEMENT_PARENT_SIZE}px;`);
  const child = document.createElement('div');
  child.setAttribute('style', `width:100%; height: ${SCROLLBAR_TEST_ELEMENT_CHILD_SIZE}; overflow:scroll; scrollbar-width: thin;`);
  parentEl.appendChild(child);
  document.body.appendChild(parentEl);
  const scrollbarWidth = SCROLLBAR_TEST_ELEMENT_PARENT_SIZE - (parentEl.firstElementChild?.clientWidth ?? 0);
  const scrollbarWidthWithSafetyHatch = Math.min(scrollbarWidth, MAX_SCROLLBAR_WIDTH);
  document.documentElement.style.setProperty('--pc-app-provider-scrollbar-width', `${scrollbarWidthWithSafetyHatch}px`);
  document.body.removeChild(parentEl);
}
class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.setBodyStyles = () => {
      document.body.style.backgroundColor = 'var(--p-color-bg)';
      document.body.style.color = 'var(--p-color-text)';
    };
    this.setRootAttributes = () => {
      const activeThemeName = this.getThemeName();
      polarisTokens.themeNames.forEach(themeName => {
        document.documentElement.classList.toggle(polarisTokens.createThemeClassName(themeName), themeName === activeThemeName);
      });
    };
    this.getThemeName = () => this.props.theme ?? polarisTokens.themeNameDefault;
    this.stickyManager = new stickyManager.StickyManager();
    this.scrollLockManager = new scrollLockManager.ScrollLockManager();
    const {
      i18n,
      linkComponent
    } = this.props;

    // eslint-disable-next-line react/state-in-constructor
    this.state = {
      link: linkComponent,
      intl: new I18n.I18n(i18n)
    };
  }
  componentDidMount() {
    if (document != null) {
      this.stickyManager.setContainer(document);
      this.setBodyStyles();
      this.setRootAttributes();
      const isSafari16 = navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome') && (navigator.userAgent.includes('Version/16.1') || navigator.userAgent.includes('Version/16.2') || navigator.userAgent.includes('Version/16.3'));
      const isMobileApp16 = navigator.userAgent.includes('Shopify Mobile/iOS') && (navigator.userAgent.includes('OS 16_1') || navigator.userAgent.includes('OS 16_2') || navigator.userAgent.includes('OS 16_3'));
      if (isSafari16 || isMobileApp16) {
        document.documentElement.classList.add('Polaris-Safari-16-Font-Optical-Sizing-Patch');
      }
    }
    measureScrollbars();
  }
  componentDidUpdate({
    i18n: prevI18n,
    linkComponent: prevLinkComponent
  }) {
    const {
      i18n,
      linkComponent
    } = this.props;
    this.setRootAttributes();
    if (i18n === prevI18n && linkComponent === prevLinkComponent) {
      return;
    }
    this.setState({
      link: linkComponent,
      intl: new I18n.I18n(i18n)
    });
  }
  render() {
    const {
      children,
      features = {}
    } = this.props;
    const themeName = this.getThemeName();
    const {
      intl,
      link
    } = this.state;
    return /*#__PURE__*/React.createElement(useTheme.ThemeNameContext.Provider, {
      value: themeName
    }, /*#__PURE__*/React.createElement(useTheme.ThemeContext.Provider, {
      value: useTheme.getTheme(themeName)
    }, /*#__PURE__*/React.createElement(context.FeaturesContext.Provider, {
      value: features
    }, /*#__PURE__*/React.createElement(context$1.I18nContext.Provider, {
      value: intl
    }, /*#__PURE__*/React.createElement(context$2.ScrollLockManagerContext.Provider, {
      value: this.scrollLockManager
    }, /*#__PURE__*/React.createElement(context$3.StickyManagerContext.Provider, {
      value: this.stickyManager
    }, /*#__PURE__*/React.createElement(context$4.LinkContext.Provider, {
      value: link
    }, /*#__PURE__*/React.createElement(MediaQueryProvider.MediaQueryProvider, null, /*#__PURE__*/React.createElement(PortalsManager.PortalsManager, null, /*#__PURE__*/React.createElement(FocusManager.FocusManager, null, /*#__PURE__*/React.createElement(EphemeralPresenceManager.EphemeralPresenceManager, null, children)))))))))));
  }
}

exports.AppProvider = AppProvider;
