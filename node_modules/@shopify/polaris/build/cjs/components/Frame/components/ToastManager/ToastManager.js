'use strict';

var React = require('react');
var reactTransitionGroup = require('react-transition-group');
var css = require('../../../../utilities/css.js');
var useDeepEffect = require('../../../../utilities/use-deep-effect.js');
var useDeepCallback = require('../../../../utilities/use-deep-callback.js');
var ToastManager_module = require('./ToastManager.css.js');
var Toast = require('../Toast/Toast.js');
var Portal = require('../../../Portal/Portal.js');
var EventListener = require('../../../EventListener/EventListener.js');

const ADDITIONAL_TOAST_BASE_MOVEMENT = 10;
const TOAST_TRANSITION_DELAY = 30;

/**
 * Will calculate the vertical movement of the toast based on the index of the sequence. As toasts get further back
 * in the view, we want them to not move as much, to give the perception of perspective. This sequence will match this:
 * v(0) = 0
 * v(1) = 0
 * v(2) = 1 (increase of 1)
 * v(3) = 3 (increase of 2)
 * v(4) = 6 (increase of 3)
 * v(5) = 10 (increase of 4)
 * and so on...
 *
 * @param index The index of the sequence
 * @returns How many pixels we want to move the toast
 */
function generateAdditionalVerticalMovement(index) {
  const getAmountToRemove = idx => (idx - 1) * idx / 2;
  return index * ADDITIONAL_TOAST_BASE_MOVEMENT - getAmountToRemove(index);
}
const ToastManager = /*#__PURE__*/React.memo(function ToastManager({
  toastMessages
}) {
  const toastNodes = [];
  const [shouldExpand, setShouldExpand] = React.useState(false);
  const isFullyExpanded = React.useRef(false);
  const fullyExpandedTimeout = React.useRef(null);
  const firstToast = React.useRef(null);
  const updateToasts = useDeepCallback.useDeepCallback(() => {
    const zeroIndexTotalMessages = toastMessages.length - 1;
    toastMessages.forEach((_, index) => {
      const reversedOrder = zeroIndexTotalMessages - index;
      const currentToast = toastNodes[index];
      if (!currentToast.current) return;
      const toastHeight = currentToast.current.clientHeight;
      const scale = shouldExpand ? 1 : 0.9 ** reversedOrder;
      const additionalVerticalMovement = generateAdditionalVerticalMovement(reversedOrder);
      const targetInPos = shouldExpand ? toastHeight + (toastHeight - 8) * reversedOrder : toastHeight + additionalVerticalMovement;
      currentToast.current.style.setProperty('--pc-toast-manager-translate-y-in', `-${targetInPos}px`);
      currentToast.current.style.setProperty('--pc-toast-manager-scale-in', `${scale}`);
      currentToast.current.style.setProperty('--pc-toast-manager-blur-in', shouldExpand ? '0' : `${reversedOrder * 0.5}px`);
      currentToast.current.style.setProperty('--pc-toast-manager-transition-delay-in', `${shouldExpand ? reversedOrder * TOAST_TRANSITION_DELAY : 0}ms`);
      currentToast.current.style.setProperty('--pc-toast-manager-scale-out', `${reversedOrder === 0 ? 0.85 : scale ** 2}`);
      currentToast.current.style.setProperty('--pc-toast-manager-translate-y-out', `${-targetInPos}px`);
    });
  }, [toastMessages, toastNodes, shouldExpand]);
  useDeepEffect.useDeepEffect(() => {
    updateToasts();
    if (toastMessages.length === 0) {
      setShouldExpand(false);
    }
    if (shouldExpand) {
      fullyExpandedTimeout.current = setTimeout(() => {
        isFullyExpanded.current = true;
      }, toastMessages.length * TOAST_TRANSITION_DELAY + 400);
    } else if (fullyExpandedTimeout.current) {
      clearTimeout(fullyExpandedTimeout.current);
      isFullyExpanded.current = false;
    }
  }, [toastMessages, shouldExpand]);
  const toastsMarkup = toastMessages.map((toast, index) => {
    const reverseOrderIndex = toastMessages.length - index - 1;
    const toastNode = /*#__PURE__*/React.createRef();
    toastNodes[index] = toastNode;
    function handleMouseEnter() {
      setShouldExpand(true);
    }
    function handleMouseEnterFirstToast() {
      if (isFullyExpanded.current) {
        setShouldExpand(false);
      }
    }
    return /*#__PURE__*/React.createElement(reactTransitionGroup.CSSTransition, {
      nodeRef: toastNodes[index],
      key: toast.id,
      timeout: {
        enter: 0,
        exit: 200
      },
      classNames: toastClasses
    }, /*#__PURE__*/React.createElement("div", {
      ref: toastNode,
      onMouseEnter: reverseOrderIndex > 0 ? handleMouseEnter : handleMouseEnterFirstToast
    }, /*#__PURE__*/React.createElement("div", {
      ref: node => reverseOrderIndex === 0 ? firstToast.current = node : null
    }, /*#__PURE__*/React.createElement(Toast.Toast, Object.assign({}, toast, {
      isHovered: shouldExpand
    })))));
  });
  return /*#__PURE__*/React.createElement(Portal.Portal, {
    idPrefix: "toast"
  }, /*#__PURE__*/React.createElement(EventListener.EventListener, {
    event: "resize",
    handler: updateToasts
  }), /*#__PURE__*/React.createElement("div", {
    className: ToastManager_module.default.ToastManager,
    "aria-live": "assertive",
    onMouseEnter: function (event) {
      const target = event.target;
      const isInFirstToast = firstToast.current?.contains(target);
      setShouldExpand(!isInFirstToast);
    },
    onMouseLeave: function () {
      setShouldExpand(false);
    }
  }, /*#__PURE__*/React.createElement(reactTransitionGroup.TransitionGroup, {
    component: null
  }, toastsMarkup)));
});
const toastClasses = {
  enter: css.classNames(ToastManager_module.default.ToastWrapper, ToastManager_module.default['ToastWrapper-enter']),
  enterDone: css.classNames(ToastManager_module.default.ToastWrapper, ToastManager_module.default['ToastWrapper-enter-done']),
  exit: css.classNames(ToastManager_module.default.ToastWrapper, ToastManager_module.default['ToastWrapper-exit'])
};

exports.ToastManager = ToastManager;
