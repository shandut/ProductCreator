'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var CSSAnimation_module = require('./CSSAnimation.css.js');

var TransitionStatus = /*#__PURE__*/function (TransitionStatus) {
  TransitionStatus["Entering"] = "entering";
  TransitionStatus["Entered"] = "entered";
  TransitionStatus["Exiting"] = "exiting";
  TransitionStatus["Exited"] = "exited";
  return TransitionStatus;
}(TransitionStatus || {});
function CSSAnimation({
  in: inProp,
  className,
  type,
  children
}) {
  const [transitionStatus, setTransitionStatus] = React.useState(inProp ? TransitionStatus.Entering : TransitionStatus.Exited);
  const isMounted = React.useRef(false);
  const node = React.useRef(null);
  React.useEffect(() => {
    if (!isMounted.current) return;
    transitionStatus === TransitionStatus.Entering && changeTransitionStatus(TransitionStatus.Entered);
  }, [transitionStatus]);
  React.useEffect(() => {
    if (!isMounted.current) return;
    inProp && changeTransitionStatus(TransitionStatus.Entering);
    !inProp && changeTransitionStatus(TransitionStatus.Exiting);
  }, [inProp]);
  React.useEffect(() => {
    isMounted.current = true;
  }, []);
  const wrapperClassName = css.classNames(className, CSSAnimation_module.default[css.variationName('start', type)], inProp && CSSAnimation_module.default[css.variationName('end', type)]);
  const content = transitionStatus === TransitionStatus.Exited && !inProp ? null : children;
  return /*#__PURE__*/React.createElement("div", {
    className: wrapperClassName,
    ref: node,
    onTransitionEnd: handleTransitionEnd
  }, content);
  function handleTransitionEnd() {
    transitionStatus === TransitionStatus.Exiting && changeTransitionStatus(TransitionStatus.Exited);
  }
  function changeTransitionStatus(transitionStatus) {
    setTransitionStatus(transitionStatus);
    // Forcing a reflow to enable the animation
    if (transitionStatus === TransitionStatus.Entering) node.current && node.current.getBoundingClientRect();
  }
}

exports.CSSAnimation = CSSAnimation;
