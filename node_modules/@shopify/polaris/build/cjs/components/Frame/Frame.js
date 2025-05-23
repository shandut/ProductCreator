'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var reactTransitionGroup = require('react-transition-group');
var css = require('../../utilities/css.js');
var shared = require('../shared.js');
var setRootProperty = require('../../utilities/set-root-property.js');
var useTheme = require('../../utilities/use-theme.js');
var Frame_module = require('./Frame.css.js');
var hooks$1 = require('../../utilities/media-query/hooks.js');
var Loading = require('./components/Loading/Loading.js');
var CSSAnimation = require('./components/CSSAnimation/CSSAnimation.js');
var ContextualSaveBar = require('./components/ContextualSaveBar/ContextualSaveBar.js');
var ToastManager = require('./components/ToastManager/ToastManager.js');
var hooks = require('../../utilities/i18n/hooks.js');
var Text = require('../Text/Text.js');
var Backdrop = require('../Backdrop/Backdrop.js');
var context = require('../../utilities/frame/context.js');
var EventListener = require('../EventListener/EventListener.js');
var TrapFocus = require('../TrapFocus/TrapFocus.js');
var Icon = require('../Icon/Icon.js');

const APP_FRAME_MAIN = 'AppFrameMain';
const APP_FRAME_NAV = 'AppFrameNav';
const APP_FRAME_TOP_BAR = 'AppFrameTopBar';
const APP_FRAME_LOADING_BAR = 'AppFrameLoadingBar';
class FrameInner extends React.PureComponent {
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
    this.navigationNode = /*#__PURE__*/React.createRef();
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
      setRootProperty.setRootProperty('--pc-frame-offset', offset);
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
      setRootProperty.setRootProperty('--pc-frame-global-ribbon-height', `${globalRibbonHeight}px`);
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
    const navClassName = css.classNames(Frame_module.default.Navigation, showMobileNavigation && Frame_module.default['Navigation-visible']);
    const mobileNavHidden = isNavigationCollapsed && !showMobileNavigation;
    const mobileNavShowing = isNavigationCollapsed && showMobileNavigation;
    const tabIndex = mobileNavShowing ? 0 : -1;
    const mobileNavAttributes = {
      ...(mobileNavShowing && {
        'aria-modal': true,
        role: 'dialog'
      })
    };
    const navigationMarkup = navigation ? /*#__PURE__*/React.createElement(useTheme.UseTheme, null, theme => /*#__PURE__*/React.createElement(TrapFocus.TrapFocus, {
      trapping: mobileNavShowing
    }, /*#__PURE__*/React.createElement(reactTransitionGroup.CSSTransition, {
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
      className: Frame_module.default.NavigationDismiss,
      onClick: this.handleNavigationDismiss,
      "aria-hidden": mobileNavHidden || !isNavigationCollapsed && !showMobileNavigation,
      "aria-label": i18n.translate('Polaris.Frame.Navigation.closeMobileNavigationLabel'),
      tabIndex: tabIndex
    }, /*#__PURE__*/React.createElement(Icon.Icon, {
      source: polarisIcons.XIcon
    })))))) : null;
    const loadingMarkup = loadingStack > 0 ? /*#__PURE__*/React.createElement("div", {
      className: Frame_module.default.LoadingBar,
      id: APP_FRAME_LOADING_BAR
    }, /*#__PURE__*/React.createElement(Loading.Loading, null)) : null;
    const topBarMarkup = topBar ? /*#__PURE__*/React.createElement("div", Object.assign({
      className: Frame_module.default.TopBar
    }, shared.layer.props, shared.dataPolarisTopBar.props, {
      id: APP_FRAME_TOP_BAR
    }), topBar) : null;
    const globalRibbonMarkup = globalRibbon ? /*#__PURE__*/React.createElement("div", {
      className: Frame_module.default.GlobalRibbonContainer,
      ref: this.setGlobalRibbonContainer
    }, globalRibbon) : null;
    const skipClassName = css.classNames(Frame_module.default.Skip, skipFocused && Frame_module.default.focused);
    const skipTarget = skipToContentTarget?.current ? skipToContentTarget.current.id : APP_FRAME_MAIN;
    const skipMarkup = /*#__PURE__*/React.createElement("div", {
      className: skipClassName
    }, /*#__PURE__*/React.createElement("a", {
      href: `#${skipTarget}`,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onClick: this.handleClick
    }, /*#__PURE__*/React.createElement(Text.Text, {
      as: "span",
      variant: "bodyLg",
      fontWeight: "medium"
    }, i18n.translate('Polaris.Frame.skipToContent'))));
    const navigationAttributes = navigation ? {
      'data-has-navigation': true
    } : {};
    const getFrameClassName = () => css.classNames(Frame_module.default.Frame, navigation && Frame_module.default.hasNav, topBar && Frame_module.default.hasTopBar, sidebar && Frame_module.default.hasSidebar, this.state.scrollbarAlwaysVisible && Frame_module.default.ScrollbarAlwaysVisible);
    const contextualSaveBarMarkup = /*#__PURE__*/React.createElement(CSSAnimation.CSSAnimation, {
      in: showContextualSaveBar,
      className: Frame_module.default.ContextualSaveBar,
      type: "fade"
    }, /*#__PURE__*/React.createElement(ContextualSaveBar.ContextualSaveBar, this.contextualSaveBar));
    const navigationOverlayMarkup = showMobileNavigation && isNavigationCollapsed ? /*#__PURE__*/React.createElement(Backdrop.Backdrop, {
      belowNavigation: true,
      onClick: this.handleNavigationDismiss,
      onTouchStart: this.handleNavigationDismiss
    }) : null;

    // This is probably a legit error but I don't have the time to refactor this
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const context$1 = {
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
    return /*#__PURE__*/React.createElement(context.FrameContext.Provider, {
      value: context$1
    }, /*#__PURE__*/React.createElement("div", Object.assign({
      className: getFrameClassName()
    }, shared.layer.props, navigationAttributes), skipMarkup, topBarMarkup, navigationMarkup, contextualSaveBarMarkup, loadingMarkup, navigationOverlayMarkup, /*#__PURE__*/React.createElement("main", {
      className: Frame_module.default.Main,
      id: APP_FRAME_MAIN,
      "data-has-global-ribbon": Boolean(globalRibbon)
    }, /*#__PURE__*/React.createElement("div", {
      className: Frame_module.default.Content
    }, children)), /*#__PURE__*/React.createElement(ToastManager.ToastManager, {
      toastMessages: toastMessages
    }), globalRibbonMarkup, /*#__PURE__*/React.createElement(EventListener.EventListener, {
      event: "resize",
      handler: this.handleResize
    })));
  }
}
const navTransitionClasses = {
  enter: css.classNames(Frame_module.default['Navigation-enter']),
  enterActive: css.classNames(Frame_module.default['Navigation-enterActive']),
  enterDone: css.classNames(Frame_module.default['Navigation-enterActive']),
  exit: css.classNames(Frame_module.default['Navigation-exit']),
  exitActive: css.classNames(Frame_module.default['Navigation-exitActive'])
};
function Frame(props) {
  const i18n = hooks.useI18n();
  const mediaQuery = hooks$1.useMediaQuery();
  return /*#__PURE__*/React.createElement(FrameInner, Object.assign({}, props, {
    i18n: i18n,
    mediaQuery: mediaQuery
  }));
}

exports.Frame = Frame;
