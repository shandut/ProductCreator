'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var Backdrop_module = require('./Backdrop.css.js');
var ScrollLock = require('../ScrollLock/ScrollLock.js');

function Backdrop(props) {
  const {
    onClick,
    onTouchStart,
    belowNavigation,
    transparent,
    setClosing
  } = props;
  const className = css.classNames(Backdrop_module.default.Backdrop, belowNavigation && Backdrop_module.default.belowNavigation, transparent && Backdrop_module.default.transparent);
  const handleMouseDown = () => {
    if (setClosing) {
      setClosing(true);
    }
  };
  const handleClick = () => {
    if (setClosing) {
      setClosing(false);
    }
    if (onClick) {
      onClick();
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ScrollLock.ScrollLock, null), /*#__PURE__*/React.createElement("div", {
    className: className,
    onClick: handleClick,
    onTouchStart: onTouchStart,
    onMouseDown: handleMouseDown
  }));
}

exports.Backdrop = Backdrop;
