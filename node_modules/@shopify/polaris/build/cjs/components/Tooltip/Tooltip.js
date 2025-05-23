'use strict';

var React = require('react');
var focus = require('../../utilities/focus.js');
var useToggle = require('../../utilities/use-toggle.js');
var css = require('../../utilities/css.js');
var Tooltip_module = require('./Tooltip.css.js');
var hooks = require('../../utilities/ephemeral-presence-manager/hooks.js');
var Portal = require('../Portal/Portal.js');
var TooltipOverlay = require('./components/TooltipOverlay/TooltipOverlay.js');
var Text = require('../Text/Text.js');

const HOVER_OUT_TIMEOUT = 150;
function Tooltip({
  children,
  content,
  dismissOnMouseOut,
  active: originalActive,
  hoverDelay,
  preferredPosition = 'above',
  activatorWrapper = 'span',
  accessibilityLabel,
  width = 'default',
  padding = 'default',
  borderRadius: borderRadiusProp,
  zIndexOverride,
  hasUnderline,
  persistOnClick,
  onOpen,
  onClose
}) {
  const borderRadius = borderRadiusProp || '200';
  const WrapperComponent = activatorWrapper;
  const {
    value: active,
    setTrue: setActiveTrue,
    setFalse: handleBlur
  } = useToggle.useToggle(Boolean(originalActive));
  const {
    value: persist,
    toggle: togglePersisting
  } = useToggle.useToggle(Boolean(originalActive) && Boolean(persistOnClick));
  const [activatorNode, setActivatorNode] = React.useState(null);
  const {
    presenceList,
    addPresence,
    removePresence
  } = hooks.useEphemeralPresenceManager();
  const id = React.useId();
  const activatorContainer = React.useRef(null);
  const mouseEntered = React.useRef(false);
  const [shouldAnimate, setShouldAnimate] = React.useState(Boolean(!originalActive));
  const hoverDelayTimeout = React.useRef(null);
  const hoverOutTimeout = React.useRef(null);
  const handleFocus = React.useCallback(() => {
    if (originalActive !== false) {
      setActiveTrue();
    }
  }, [originalActive, setActiveTrue]);
  React.useEffect(() => {
    const firstFocusable = activatorContainer.current ? focus.findFirstFocusableNode(activatorContainer.current) : null;
    const accessibilityNode = firstFocusable || activatorContainer.current;
    if (!accessibilityNode) return;
    accessibilityNode.tabIndex = 0;
    accessibilityNode.setAttribute('aria-describedby', id);
    accessibilityNode.setAttribute('data-polaris-tooltip-activator', 'true');
  }, [id, children]);
  React.useEffect(() => {
    return () => {
      if (hoverDelayTimeout.current) {
        clearTimeout(hoverDelayTimeout.current);
      }
      if (hoverOutTimeout.current) {
        clearTimeout(hoverOutTimeout.current);
      }
    };
  }, []);
  const handleOpen = React.useCallback(() => {
    setShouldAnimate(!presenceList.tooltip && !active);
    onOpen?.();
    addPresence('tooltip');
  }, [addPresence, presenceList.tooltip, onOpen, active]);
  const handleClose = React.useCallback(() => {
    onClose?.();
    setShouldAnimate(false);
    hoverOutTimeout.current = setTimeout(() => {
      removePresence('tooltip');
    }, HOVER_OUT_TIMEOUT);
  }, [removePresence, onClose]);
  const handleKeyUp = React.useCallback(event => {
    if (event.key !== 'Escape') return;
    handleClose?.();
    handleBlur();
    persistOnClick && togglePersisting();
  }, [handleBlur, handleClose, persistOnClick, togglePersisting]);
  React.useEffect(() => {
    if (originalActive === false && active) {
      handleClose();
      handleBlur();
    }
  }, [originalActive, active, handleClose, handleBlur]);
  const portal = activatorNode ? /*#__PURE__*/React.createElement(Portal.Portal, {
    idPrefix: "tooltip"
  }, /*#__PURE__*/React.createElement(TooltipOverlay.TooltipOverlay, {
    id: id,
    preferredPosition: preferredPosition,
    activator: activatorNode,
    active: active,
    accessibilityLabel: accessibilityLabel,
    onClose: noop,
    preventInteraction: dismissOnMouseOut,
    width: width,
    padding: padding,
    borderRadius: borderRadius,
    zIndexOverride: zIndexOverride,
    instant: !shouldAnimate
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "bodyMd"
  }, content))) : null;
  const wrapperClassNames = css.classNames(activatorWrapper === 'div' && Tooltip_module.default.TooltipContainer, hasUnderline && Tooltip_module.default.HasUnderline);
  return /*#__PURE__*/React.createElement(WrapperComponent, {
    onFocus: () => {
      handleOpen();
      handleFocus();
    },
    onBlur: () => {
      handleClose();
      handleBlur();
      if (persistOnClick) {
        togglePersisting();
      }
    },
    onMouseLeave: handleMouseLeave,
    onMouseOver: handleMouseEnterFix,
    onMouseDown: persistOnClick ? togglePersisting : undefined,
    ref: setActivator,
    onKeyUp: handleKeyUp,
    className: wrapperClassNames
  }, children, portal);
  function setActivator(node) {
    const activatorContainerRef = activatorContainer;
    if (node == null) {
      activatorContainerRef.current = null;
      setActivatorNode(null);
      return;
    }
    if (node.firstElementChild) {
      setActivatorNode(node.firstElementChild);
    }
    activatorContainerRef.current = node;
  }
  function handleMouseEnter() {
    mouseEntered.current = true;
    if (hoverDelay && !presenceList.tooltip) {
      hoverDelayTimeout.current = setTimeout(() => {
        handleOpen();
        handleFocus();
      }, hoverDelay);
    } else {
      handleOpen();
      handleFocus();
    }
  }
  function handleMouseLeave() {
    if (hoverDelayTimeout.current) {
      clearTimeout(hoverDelayTimeout.current);
      hoverDelayTimeout.current = null;
    }
    mouseEntered.current = false;
    handleClose();
    if (!persist) {
      handleBlur();
    }
  }

  // https://github.com/facebook/react/issues/10109
  // Mouseenter event not triggered when cursor moves from disabled button
  function handleMouseEnterFix() {
    !mouseEntered.current && handleMouseEnter();
  }
}
function noop() {}

exports.Tooltip = Tooltip;
