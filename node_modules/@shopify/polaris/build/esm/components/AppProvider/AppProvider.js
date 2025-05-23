import React, { Component } from 'react';
import { themeNames, createThemeClassName, themeNameDefault } from '@shopify/polaris-tokens';
import { ThemeNameContext, ThemeContext, getTheme } from '../../utilities/use-theme.js';
import './global.css.js';
import { StickyManager } from '../../utilities/sticky-manager/sticky-manager.js';
import { ScrollLockManager } from '../../utilities/scroll-lock-manager/scroll-lock-manager.js';
import { I18n } from '../../utilities/i18n/I18n.js';
import { FeaturesContext } from '../../utilities/features/context.js';
import { I18nContext } from '../../utilities/i18n/context.js';
import { ScrollLockManagerContext } from '../../utilities/scroll-lock-manager/context.js';
import { StickyManagerContext } from '../../utilities/sticky-manager/context.js';
import { LinkContext } from '../../utilities/link/context.js';
import { MediaQueryProvider } from '../MediaQueryProvider/MediaQueryProvider.js';
import { PortalsManager } from '../PortalsManager/PortalsManager.js';
import { FocusManager } from '../FocusManager/FocusManager.js';
import { EphemeralPresenceManager } from '../EphemeralPresenceManager/EphemeralPresenceManager.js';

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
class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.setBodyStyles = () => {
      document.body.style.backgroundColor = 'var(--p-color-bg)';
      document.body.style.color = 'var(--p-color-text)';
    };
    this.setRootAttributes = () => {
      const activeThemeName = this.getThemeName();
      themeNames.forEach(themeName => {
        document.documentElement.classList.toggle(createThemeClassName(themeName), themeName === activeThemeName);
      });
    };
    this.getThemeName = () => this.props.theme ?? themeNameDefault;
    this.stickyManager = new StickyManager();
    this.scrollLockManager = new ScrollLockManager();
    const {
      i18n,
      linkComponent
    } = this.props;

    // eslint-disable-next-line react/state-in-constructor
    this.state = {
      link: linkComponent,
      intl: new I18n(i18n)
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
      intl: new I18n(i18n)
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
    return /*#__PURE__*/React.createElement(ThemeNameContext.Provider, {
      value: themeName
    }, /*#__PURE__*/React.createElement(ThemeContext.Provider, {
      value: getTheme(themeName)
    }, /*#__PURE__*/React.createElement(FeaturesContext.Provider, {
      value: features
    }, /*#__PURE__*/React.createElement(I18nContext.Provider, {
      value: intl
    }, /*#__PURE__*/React.createElement(ScrollLockManagerContext.Provider, {
      value: this.scrollLockManager
    }, /*#__PURE__*/React.createElement(StickyManagerContext.Provider, {
      value: this.stickyManager
    }, /*#__PURE__*/React.createElement(LinkContext.Provider, {
      value: link
    }, /*#__PURE__*/React.createElement(MediaQueryProvider, null, /*#__PURE__*/React.createElement(PortalsManager, null, /*#__PURE__*/React.createElement(FocusManager, null, /*#__PURE__*/React.createElement(EphemeralPresenceManager, null, children)))))))))));
  }
}

export { AppProvider };
