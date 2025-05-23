'use strict';

var React = require('react');
var polarisTokens = require('@shopify/polaris-tokens');
var css = require('../../utilities/css.js');
var Collapsible_module = require('./Collapsible.css.js');

function Collapsible({
  id,
  expandOnPrint,
  open,
  variant = 'block',
  transition = true,
  children,
  onAnimationEnd
}) {
  const [size, setSize] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(open);
  const collapsibleContainer = React.useRef(null);
  const animateIn = typeof transition === 'object' && transition.animateIn;
  const [animationState, setAnimationState] = React.useState(animateIn ? 'measuring' : 'idle');
  const isFullyOpen = animationState === 'idle' && open && isOpen;
  const isFullyClosed = animationState === 'idle' && !open && !isOpen;
  const content = expandOnPrint || !isFullyClosed ? children : null;
  const vertical = variant === 'block';
  const wrapperClassName = css.classNames(Collapsible_module.default.Collapsible, isFullyClosed && Collapsible_module.default.isFullyClosed, expandOnPrint && Collapsible_module.default.expandOnPrint, variant === 'inline' && Collapsible_module.default.inline, animateIn && Collapsible_module.default.animateIn);
  const transitionDisabled = isTransitionDisabled(transition);
  const transitionStyles = typeof transition === 'object' && {
    transitionDelay: polarisTokens.createVar(`motion-duration-${transition.delay ?? '0'}`),
    transitionDuration: transition.duration,
    transitionTimingFunction: transition.timingFunction
  };
  const collapsibleStyles = {
    ...transitionStyles,
    ...(vertical ? {
      maxHeight: isFullyOpen ? 'none' : `${size}px`,
      overflow: isFullyOpen ? 'visible' : 'hidden'
    } : {
      maxWidth: isFullyOpen ? 'none' : `${size}px`,
      overflow: isFullyOpen ? 'visible' : 'hidden'
    })
  };
  const handleCompleteAnimation = React.useCallback(({
    target
  }) => {
    if (target === collapsibleContainer.current) {
      setAnimationState('idle');
      setIsOpen(open);
      onAnimationEnd && onAnimationEnd();
    }
  }, [onAnimationEnd, open]);
  const startAnimation = React.useCallback(() => {
    if (transitionDisabled) {
      setIsOpen(open);
      setAnimationState('idle');
      if (open && collapsibleContainer.current) {
        setSize(vertical ? collapsibleContainer.current.scrollHeight : collapsibleContainer.current.scrollWidth);
      } else {
        setSize(0);
      }
    } else {
      setAnimationState('measuring');
    }
  }, [open, vertical, transitionDisabled]);
  React.useEffect(() => {
    if (open !== isOpen) {
      startAnimation();
    }
    // startAnimation should only be fired if the open state changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isOpen]);
  React.useEffect(() => {
    if (!open || !collapsibleContainer.current) return;
    // If collapsible defaults to open, set an initial height
    setSize(vertical ? collapsibleContainer.current.scrollHeight : collapsibleContainer.current.scrollWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    if (!collapsibleContainer.current) return;
    switch (animationState) {
      case 'idle':
        break;
      case 'measuring':
        setSize(vertical ? collapsibleContainer.current.scrollHeight : collapsibleContainer.current.scrollWidth);
        setAnimationState('animating');
        break;
      case 'animating':
        setSize(
        // eslint-disable-next-line no-nested-ternary
        open ? vertical ? collapsibleContainer.current.scrollHeight : collapsibleContainer.current.scrollWidth : 0);
    }
  }, [animationState, vertical, open, isOpen]);
  return /*#__PURE__*/React.createElement("div", {
    id: id,
    style: collapsibleStyles,
    ref: collapsibleContainer,
    className: wrapperClassName,
    onTransitionEnd: handleCompleteAnimation,
    "aria-hidden": !open
  }, content);
}
const zeroDurationRegex = /^0(ms|s)$/;
function isTransitionDisabled(transitionProp) {
  if (typeof transitionProp === 'boolean') {
    return !transitionProp;
  }
  const {
    duration
  } = transitionProp;
  if (duration && zeroDurationRegex.test(duration.trim())) {
    return true;
  }
  return false;
}

exports.Collapsible = Collapsible;
