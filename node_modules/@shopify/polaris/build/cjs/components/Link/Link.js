'use strict';

var React = require('react');
var bannerContext = require('../../utilities/banner-context.js');
var css = require('../../utilities/css.js');
var Link_module = require('./Link.css.js');
var UnstyledLink = require('../UnstyledLink/UnstyledLink.js');

function Link({
  url,
  children,
  onClick,
  external,
  target,
  id,
  monochrome,
  removeUnderline,
  accessibilityLabel,
  dataPrimaryLink
}) {
  return /*#__PURE__*/React.createElement(bannerContext.BannerContext.Consumer, null, BannerContext => {
    const shouldBeMonochrome = monochrome || BannerContext;
    const className = css.classNames(Link_module.default.Link, shouldBeMonochrome && Link_module.default.monochrome, removeUnderline && Link_module.default.removeUnderline);
    return url ? /*#__PURE__*/React.createElement(UnstyledLink.UnstyledLink, {
      onClick: onClick,
      className: className,
      url: url,
      external: external,
      target: target,
      id: id,
      "aria-label": accessibilityLabel,
      "data-primary-link": dataPrimaryLink
    }, children) : /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: onClick,
      className: className,
      id: id,
      "aria-label": accessibilityLabel,
      "data-primary-link": dataPrimaryLink
    }, children);
  });
}

exports.Link = Link;
