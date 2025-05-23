'use strict';

var React = require('react');
var polarisTokens = require('@shopify/polaris-tokens');
var focus = require('../../../../utilities/focus.js');
var css = require('../../../../utilities/css.js');
var components = require('../../../../utilities/components.js');
var types = require('../../../../types.js');
var shared = require('../../../shared.js');
var Popover_module = require('../../Popover.css.js');
var Pane = require('../Pane/Pane.js');
var context = require('../../../../utilities/portals/context.js');
var EventListener = require('../../../EventListener/EventListener.js');
var KeypressListener = require('../../../KeypressListener/KeypressListener.js');
var PositionedOverlay = require('../../../PositionedOverlay/PositionedOverlay.js');

let PopoverCloseSource = /*#__PURE__*/function (PopoverCloseSource) {
  PopoverCloseSource[PopoverCloseSource["Click"] = 0] = "Click";
  PopoverCloseSource[PopoverCloseSource["EscapeKeypress"] = 1] = "EscapeKeypress";
  PopoverCloseSource[PopoverCloseSource["FocusOut"] = 2] = "FocusOut";
  PopoverCloseSource[PopoverCloseSource["ScrollOut"] = 3] = "ScrollOut";
  return PopoverCloseSource;
}({});
var TransitionStatus = /*#__PURE__*/function (TransitionStatus) {
  TransitionStatus["Entering"] = "entering";
  TransitionStatus["Entered"] = "entered";
  TransitionStatus["Exiting"] = "exiting";
  TransitionStatus["Exited"] = "exited";
  return TransitionStatus;
}(TransitionStatus || {});
class PopoverOverlay extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      transitionStatus: this.props.active ? TransitionStatus.Entering : TransitionStatus.Exited
    };
    this.contentNode = /*#__PURE__*/React.createRef();
    // eslint-disable-next-line @shopify/react-no-multiple-render-methods
    this.renderPopover = overlayDetails => {
      const {
        measuring,
        desiredHeight,
        positioning
      } = overlayDetails;
      const {
        id,
        children,
        sectioned,
        fullWidth,
        fullHeight,
        fluidContent,
        hideOnPrint,
        autofocusTarget,
        captureOverscroll
      } = this.props;
      const isCovering = positioning === 'cover';
      const className = css.classNames(Popover_module.default.Popover, measuring && Popover_module.default.measuring, (fullWidth || isCovering) && Popover_module.default.fullWidth, hideOnPrint && Popover_module.default['PopoverOverlay-hideOnPrint'], positioning && Popover_module.default[css.variationName('positioned', positioning)]);
      const contentStyles = measuring ? undefined : {
        height: desiredHeight
      };
      const contentClassNames = css.classNames(Popover_module.default.Content, fullHeight && Popover_module.default['Content-fullHeight'], fluidContent && Popover_module.default['Content-fluidContent']);
      const {
        window
      } = this.state;
      return /*#__PURE__*/React.createElement("div", Object.assign({
        className: className
      }, shared.overlay.props), /*#__PURE__*/React.createElement(EventListener.EventListener, {
        event: "click",
        handler: this.handleClick,
        window: window
      }), /*#__PURE__*/React.createElement(EventListener.EventListener, {
        event: "touchstart",
        handler: this.handleClick,
        window: window
      }), /*#__PURE__*/React.createElement(KeypressListener.KeypressListener, {
        keyCode: types.Key.Escape,
        handler: this.handleEscape,
        document: window?.document
      }), /*#__PURE__*/React.createElement("div", {
        className: Popover_module.default.FocusTracker
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        ,
        tabIndex: 0,
        onFocus: this.handleFocusFirstItem
      }), /*#__PURE__*/React.createElement("div", {
        className: Popover_module.default.ContentContainer
      }, /*#__PURE__*/React.createElement("div", {
        id: id,
        tabIndex: autofocusTarget === 'none' ? undefined : -1,
        className: contentClassNames,
        style: contentStyles,
        ref: this.contentNode
      }, renderPopoverContent(children, {
        captureOverscroll,
        sectioned
      }))), /*#__PURE__*/React.createElement("div", {
        className: Popover_module.default.FocusTracker
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        ,
        tabIndex: 0,
        onFocus: this.handleFocusLastItem
      }));
    };
    this.handleClick = event => {
      const target = event.target;
      const {
        contentNode,
        props: {
          activator,
          onClose,
          preventCloseOnChildOverlayClick
        }
      } = this;
      const composedPath = event.composedPath();
      const wasDescendant = preventCloseOnChildOverlayClick ? wasPolarisPortalDescendant(composedPath, this.context.container) : wasContentNodeDescendant(composedPath, contentNode);
      const isActivatorDescendant = nodeContainsDescendant(activator, target);
      if (wasDescendant || isActivatorDescendant || this.state.transitionStatus !== TransitionStatus.Entered) {
        return;
      }
      onClose(PopoverCloseSource.Click);
    };
    this.handleScrollOut = () => {
      this.props.onClose(PopoverCloseSource.ScrollOut);
    };
    this.handleEscape = event => {
      const target = event.target;
      const {
        contentNode,
        props: {
          activator
        }
      } = this;
      const composedPath = event.composedPath();
      const wasDescendant = wasContentNodeDescendant(composedPath, contentNode);
      const isActivatorDescendant = nodeContainsDescendant(activator, target);
      if (wasDescendant || isActivatorDescendant) {
        this.props.onClose(PopoverCloseSource.EscapeKeypress);
      }
    };
    this.handleFocusFirstItem = () => {
      this.props.onClose(PopoverCloseSource.FocusOut);
    };
    this.handleFocusLastItem = () => {
      this.props.onClose(PopoverCloseSource.FocusOut);
    };
    this.overlayRef = /*#__PURE__*/React.createRef();
  }
  forceUpdatePosition() {
    this.overlayRef.current?.forceUpdatePosition();
  }
  changeTransitionStatus(transitionStatus, cb) {
    this.setState({
      transitionStatus
    }, cb);
    // Forcing a reflow to enable the animation
    this.contentNode.current && this.contentNode.current.getBoundingClientRect();
  }
  componentDidMount() {
    if (this.props.active) {
      this.focusContent();
      this.changeTransitionStatus(TransitionStatus.Entered);
    }
    this.observer = new ResizeObserver(() => {
      this.setState({
        /**
         * This is a workaround to enable event listeners to be
         * re-attached when moving from one document to another
         * when using a React portal across iframes.
         * Using a resize observer works because when the clientWidth
         * will go from 0 to the real width after the activator
         * gets rendered in its new place.
         */
        window: this.props.activator.ownerDocument.defaultView
      });
    });
    this.observer.observe(this.props.activator);
  }
  componentDidUpdate(oldProps) {
    if (this.props.active && !oldProps.active) {
      this.focusContent();
      this.changeTransitionStatus(TransitionStatus.Entering, () => {
        this.clearTransitionTimeout();
        this.enteringTimer = window.setTimeout(() => {
          this.setState({
            transitionStatus: TransitionStatus.Entered
          });
          // Important: This will not update when the active theme changes.
          // Update this to `useTheme` once converted to a function component.
        }, parseInt(polarisTokens.themeDefault.motion['motion-duration-100'], 10));
      });
    }
    if (!this.props.active && oldProps.active) {
      this.clearTransitionTimeout();
      this.setState({
        transitionStatus: TransitionStatus.Exited
      });
    }
    if (this.props.activator !== oldProps.activator) {
      this.observer?.unobserve(oldProps.activator);
      this.observer?.observe(this.props.activator);
    }
  }
  componentWillUnmount() {
    this.clearTransitionTimeout();
    this.observer?.disconnect();
  }
  render() {
    const {
      active,
      activator,
      fullWidth,
      preferredPosition = 'below',
      preferredAlignment = 'center',
      preferInputActivator = true,
      fixed,
      zIndexOverride
    } = this.props;
    const {
      transitionStatus
    } = this.state;
    if (transitionStatus === TransitionStatus.Exited && !active) return null;
    const className = css.classNames(Popover_module.default.PopoverOverlay, transitionStatus === TransitionStatus.Entering && Popover_module.default['PopoverOverlay-entering'], transitionStatus === TransitionStatus.Entered && Popover_module.default['PopoverOverlay-open'], transitionStatus === TransitionStatus.Exiting && Popover_module.default['PopoverOverlay-exiting'], preferredPosition === 'cover' && Popover_module.default['PopoverOverlay-noAnimation']);
    return /*#__PURE__*/React.createElement(PositionedOverlay.PositionedOverlay, {
      ref: this.overlayRef,
      fullWidth: fullWidth,
      active: active,
      activator: activator,
      preferInputActivator: preferInputActivator,
      preferredPosition: preferredPosition,
      preferredAlignment: preferredAlignment,
      render: this.renderPopover.bind(this),
      fixed: fixed,
      onScrollOut: this.handleScrollOut,
      classNames: className,
      zIndexOverride: zIndexOverride
    });
  }
  clearTransitionTimeout() {
    if (this.enteringTimer) {
      window.clearTimeout(this.enteringTimer);
    }
  }
  focusContent() {
    const {
      autofocusTarget = 'container'
    } = this.props;
    if (autofocusTarget === 'none' || this.contentNode == null) {
      return;
    }
    requestAnimationFrame(() => {
      if (this.contentNode.current == null) {
        return;
      }
      const focusableChild = focus.findFirstKeyboardFocusableNode(this.contentNode.current);
      if (focusableChild && autofocusTarget === 'first-node') {
        focusableChild.focus({
          preventScroll: process.env.NODE_ENV === 'development'
        });
      } else {
        this.contentNode.current.focus({
          preventScroll: process.env.NODE_ENV === 'development'
        });
      }
    });
  }
}
PopoverOverlay.contextType = context.PortalsManagerContext;
function renderPopoverContent(children, props) {
  const childrenArray = React.Children.toArray(children);
  if (components.isElementOfType(childrenArray[0], Pane.Pane)) {
    return childrenArray;
  }
  return components.wrapWithComponent(childrenArray, Pane.Pane, props);
}
function nodeContainsDescendant(rootNode, descendant) {
  if (rootNode === descendant) {
    return true;
  }
  let parent = descendant.parentNode;
  while (parent != null) {
    if (parent === rootNode) {
      return true;
    }
    parent = parent.parentNode;
  }
  return false;
}
function wasContentNodeDescendant(composedPath, contentNode) {
  return contentNode.current != null && composedPath.includes(contentNode.current);
}
function wasPolarisPortalDescendant(composedPath, portalsContainerElement) {
  return composedPath.some(eventTarget => eventTarget instanceof Node && portalsContainerElement?.contains(eventTarget));
}

exports.PopoverCloseSource = PopoverCloseSource;
exports.PopoverOverlay = PopoverOverlay;
exports.nodeContainsDescendant = nodeContainsDescendant;
