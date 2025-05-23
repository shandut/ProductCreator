import React, { PureComponent, createRef } from 'react';
import { XIcon } from '@shopify/polaris-icons';
import { CSSTransition } from 'react-transition-group';
import { classNames } from '../../utilities/css.js';
import { layer, dataPolarisTopBar } from '../shared.js';
import { setRootProperty } from '../../utilities/set-root-property.js';
import { UseTheme } from '../../utilities/use-theme.js';
import styles from './Frame.css.js';
import { useMediaQuery } from '../../utilities/media-query/hooks.js';
import { Loading } from './components/Loading/Loading.js';
import { CSSAnimation } from './components/CSSAnimation/CSSAnimation.js';
import { ContextualSaveBar } from './components/ContextualSaveBar/ContextualSaveBar.js';
import { ToastManager } from './components/ToastManager/ToastManager.js';
import { useI18n } from '../../utilities/i18n/hooks.js';
import { Text } from '../Text/Text.js';
import { Backdrop } from '../Backdrop/Backdrop.js';
import { FrameContext } from '../../utilities/frame/context.js';
import { EventListener } from '../EventListener/EventListener.js';
import { TrapFocus } from '../TrapFocus/TrapFocus.js';
import { Icon } from '../Icon/Icon.js';

const APP_FRAME_MAIN = 'AppFrameMain';
const APP_FRAME_NAV = 'AppFrameNav';
const APP_FRAME_TOP_BAR = 'AppFrameTopBar';
const APP_FRAME_LOADING_BAR = 'AppFrameLoadingBar';
class FrameInner extends PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      skipFocused: false,
      globalRibbonHeight: 0,
      loadingStack: 0,
      toastMessages: [],
      showContextualSaveBar: false,
      scrollbarAlwaysVisible: false
    };
    this.contextualSaveBar = null;
    this.globalRibbonContainer = null;
    this.navigationNode = /*#__PURE__*/createRef();
    this.setGlobalRibbonHeight = () => {
      const {
        globalRibbonContainer
      } = this;
      if (globalRibbonContainer) {
        this.setState({
          globalRibbonHeight: globalRibbonContainer.offsetHeight
        }, this.setGlobalRibbonRootProperty);
      }
    };
    this.setOffset = () => {
      const {
        offset = '0px'
      } = this.props;
      setRootProperty('--pc-frame-offset', offset);
    };
    this.setScrollbarAlwaysVisible = () => {
      const scrollbarWidth = parseInt(document.documentElement.style.getPropertyValue('--pc-app-provider-scrollbar-width'), 10);
      this.setState({
        scrollbarAlwaysVisible: scrollbarWidth > 0
      });
    };
    this.setGlobalRibbonRootProperty = () => {
      const {
        globalRibbonHeight
      } = this.state;
      setRootProperty('--pc-frame-global-ribbon-height', `${globalRibbonHeight}px`);
    };
    this.showToast = toast => {
      this.setState(({
        toastMessages
      }) => {
        const hasToastById = toastMessages.find(({
          id
        }) => id === toast.id) != null;
        return {
          toastMessages: hasToastById ? toastMessages : [...toastMessages, toast]
        };
      });
    };
    this.hideToast = ({
      id
    }) => {
      this.setState(({
        toastMessages
      }) => {
        return {
          toastMessages: toastMessages.filter(({
            id: toastId
          }) => id !== toastId)
        };
      });
    };
    this.setContextualSaveBar = props => {
      const {
        showContextualSaveBar
      } = this.state;
      this.contextualSaveBar = {
        ...props
      };
      if (showContextualSaveBar === true) {
        this.forceUpdate();
      } else {
        this.setState({
          showContextualSaveBar: true
        });
      }
    };
    this.removeContextualSaveBar = () => {
      this.contextualSaveBar = null;
      this.setState({
        showContextualSaveBar: false
      });
    };
    this.startLoading = () => {
      this.setState(({
        loadingStack
      }) => ({
        loadingStack: loadingStack + 1
      }));
    };
    this.stopLoading = () => {
      this.setState(({
        loadingStack
      }) => ({
        loadingStack: Math.max(0, loadingStack - 1)
      }));
    };
    this.handleResize = () => {
      if (this.props.globalRibbon) {
        this.setGlobalRibbonHeight();
      }
    };
    this.handleFocus = () => {
      this.setState({
        skipFocused: true
      });
    };
    this.handleBlur = () => {
      this.setState({
        skipFocused: false
      });
    };
    this.handleClick = event => {
      const {
        skipToContentTarget
      } = this.props;
      if (skipToContentTarget && skipToContentTarget.current) {
        skipToContentTarget.current.focus();
        event?.preventDefault();
      }
    };
    this.handleNavigationDismiss = () => {
      const {
        onNavigationDismiss
      } = this.props;
      if (onNavigationDismiss != null) {
        onNavigationDismiss();
      }
    };
    this.setGlobalRibbonContainer = node => {
      this.globalRibbonContainer = node;
    };
    this.handleNavKeydown = event => {
      const {
        key
      } = event;
      const {
        mediaQuery: {
          isNavigationCollapsed
        },
        showMobileNavigation
      } = this.props;
      const mobileNavShowing = isNavigationCollapsed && showMobileNavigation;
      if (mobileNavShowing && key === 'Escape') {
        this.handleNavigationDismiss();
      }
    };
  }
  componentDidMount() {
    this.handleResize();
    if (this.props.globalRibbon) {
      return;
    }
    this.setGlobalRibbonRootProperty();
    this.setOffset();
    this.setScrollbarAlwaysVisible();
  }
  componentDidUpdate(prevProps) {
    if (this.props.globalRibbon !== prevProps.globalRibbon) {
      this.setGlobalRibbonHeight();
    }
    this.setOffset();
  }
  render() {
    const {
      skipFocused,
      loadingStack,
      toastMessages,
      showContextualSaveBar
    } = this.state;
    const {
      logo,
      children,
      navigation,
      topBar,
      globalRibbon,
      showMobileNavigation = false,
      skipToContentTarget,
      i18n,
      sidebar,
      mediaQuery: {
        isNavigationCollapsed
      }
    } = this.props;
    const navClassName = classNames(styles.Navigation, showMobileNavigation && styles['Navigation-visible']);
    const mobileNavHidden = isNavigationCollapsed && !showMobileNavigation;
    const mobileNavShowing = isNavigationCollapsed && showMobileNavigation;
    const tabIndex = mobileNavShowing ? 0 : -1;
    const mobileNavAttributes = {
      ...(mobileNavShowing && {
        'aria-modal': true,
        role: 'dialog'
      })
    };
    const navigationMarkup = navigation ? /*#__PURE__*/React.createElement(UseTheme, null, theme => /*#__PURE__*/React.createElement(TrapFocus, {
      trapping: mobileNavShowing
    }, /*#__PURE__*/React.createElement(CSSTransition, {
      nodeRef: this.navigationNode,
      appear: isNavigationCollapsed,
      exit: isNavigationCollapsed,
      in: showMobileNavigation,
      timeout: parseInt(theme.motion['motion-duration-300'], 10),
      classNames: navTransitionClasses
    }, /*#__PURE__*/React.createElement("div", Object.assign({
      key: "NavContent"
    }, mobileNavAttributes, {
      "aria-label": i18n.translate('Polaris.Frame.navigationLabel'),
      ref: this.navigationNode,
      className: navClassName,
      onKeyDown: this.handleNavKeydown,
      id: APP_FRAME_NAV,
      hidden: mobileNavHidden
    }), navigation, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: styles.NavigationDismiss,
      onClick: this.handleNavigationDismiss,
      "aria-hidden": mobileNavHidden || !isNavigationCollapsed && !showMobileNavigation,
      "aria-label": i18n.translate('Polaris.Frame.Navigation.closeMobileNavigationLabel'),
      tabIndex: tabIndex
    }, /*#__PURE__*/React.createElement(Icon, {
      source: XIcon
    })))))) : null;
    const loadingMarkup = loadingStack > 0 ? /*#__PURE__*/React.createElement("div", {
      className: styles.LoadingBar,
      id: APP_FRAME_LOADING_BAR
    }, /*#__PURE__*/React.createElement(Loading, null)) : null;
    const topBarMarkup = topBar ? /*#__PURE__*/React.createElement("div", Object.assign({
      className: styles.TopBar
    }, layer.props, dataPolarisTopBar.props, {
      id: APP_FRAME_TOP_BAR
    }), topBar) : null;
    const globalRibbonMarkup = globalRibbon ? /*#__PURE__*/React.createElement("div", {
      className: styles.GlobalRibbonContainer,
      ref: this.setGlobalRibbonContainer
    }, globalRibbon) : null;
    const skipClassName = classNames(styles.Skip, skipFocused && styles.focused);
    const skipTarget = skipToContentTarget?.current ? skipToContentTarget.current.id : APP_FRAME_MAIN;
    const skipMarkup = /*#__PURE__*/React.createElement("div", {
      className: skipClassName
    }, /*#__PURE__*/React.createElement("a", {
      href: `#${skipTarget}`,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onClick: this.handleClick
    }, /*#__PURE__*/React.createElement(Text, {
      as: "span",
      variant: "bodyLg",
      fontWeight: "medium"
    }, i18n.translate('Polaris.Frame.skipToContent'))));
    const navigationAttributes = navigation ? {
      'data-has-navigation': true
    } : {};
    const getFrameClassName = () => classNames(styles.Frame, navigation && styles.hasNav, topBar && styles.hasTopBar, sidebar && styles.hasSidebar, this.state.scrollbarAlwaysVisible && styles.ScrollbarAlwaysVisible);
    const contextualSaveBarMarkup = /*#__PURE__*/React.createElement(CSSAnimation, {
      in: showContextualSaveBar,
      className: styles.ContextualSaveBar,
      type: "fade"
    }, /*#__PURE__*/React.createElement(ContextualSaveBar, this.contextualSaveBar));
    const navigationOverlayMarkup = showMobileNavigation && isNavigationCollapsed ? /*#__PURE__*/React.createElement(Backdrop, {
      belowNavigation: true,
      onClick: this.handleNavigationDismiss,
      onTouchStart: this.handleNavigationDismiss
    }) : null;

    // This is probably a legit error but I don't have the time to refactor this
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const context = {
      logo,
      showToast: this.showToast,
      hideToast: this.hideToast,
      toastMessages,
      startLoading: this.startLoading,
      stopLoading: this.stopLoading,
      setContextualSaveBar: this.setContextualSaveBar,
      removeContextualSaveBar: this.removeContextualSaveBar,
      contextualSaveBarVisible: this.state.showContextualSaveBar,
      contextualSaveBarProps: this.contextualSaveBar
    };
    return /*#__PURE__*/React.createElement(FrameContext.Provider, {
      value: context
    }, /*#__PURE__*/React.createElement("div", Object.assign({
      className: getFrameClassName()
    }, layer.props, navigationAttributes), skipMarkup, topBarMarkup, navigationMarkup, contextualSaveBarMarkup, loadingMarkup, navigationOverlayMarkup, /*#__PURE__*/React.createElement("main", {
      className: styles.Main,
      id: APP_FRAME_MAIN,
      "data-has-global-ribbon": Boolean(globalRibbon)
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.Content
    }, children)), /*#__PURE__*/React.createElement(ToastManager, {
      toastMessages: toastMessages
    }), globalRibbonMarkup, /*#__PURE__*/React.createElement(EventListener, {
      event: "resize",
      handler: this.handleResize
    })));
  }
}
const navTransitionClasses = {
  enter: classNames(styles['Navigation-enter']),
  enterActive: classNames(styles['Navigation-enterActive']),
  enterDone: classNames(styles['Navigation-enterActive']),
  exit: classNames(styles['Navigation-exit']),
  exitActive: classNames(styles['Navigation-exitActive'])
};
function Frame(props) {
  const i18n = useI18n();
  const mediaQuery = useMediaQuery();
  return /*#__PURE__*/React.createElement(FrameInner, Object.assign({}, props, {
    i18n: i18n,
    mediaQuery: mediaQuery
  }));
}

export { Frame };
