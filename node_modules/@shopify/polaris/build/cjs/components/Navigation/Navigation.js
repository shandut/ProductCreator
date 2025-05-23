'use strict';

var React = require('react');
var withinContentContext = require('../../utilities/within-content-context.js');
var css = require('../../utilities/css.js');
var getWidth = require('../../utilities/get-width.js');
var breakpoints = require('../../utilities/breakpoints.js');
var context = require('./context.js');
var Navigation_module = require('./Navigation.css.js');
var Section = require('./components/Section/Section.js');
var hooks = require('../../utilities/frame/hooks.js');
var UnstyledLink = require('../UnstyledLink/UnstyledLink.js');
var Image = require('../Image/Image.js');
var Scrollable = require('../Scrollable/Scrollable.js');
var Item = require('./components/Item/Item.js');

const Navigation = function Navigation({
  children,
  contextControl,
  location,
  onDismiss,
  ariaLabelledBy,
  logoSuffix
}) {
  const {
    logo
  } = hooks.useFrame();
  const width = getWidth.getWidth(logo, 104);
  const {
    mdUp
  } = breakpoints.useBreakpoints();
  const logoMarkup = logo ? /*#__PURE__*/React.createElement("div", {
    className: css.classNames(Navigation_module.default.LogoContainer, logoSuffix && Navigation_module.default.hasLogoSuffix)
  }, /*#__PURE__*/React.createElement(UnstyledLink.UnstyledLink, {
    url: logo.url || '',
    className: Navigation_module.default.LogoLink,
    style: {
      width
    }
  }, /*#__PURE__*/React.createElement(Image.Image, {
    source: logo.topBarSource || '',
    alt: logo.accessibilityLabel || '',
    className: Navigation_module.default.Logo,
    style: {
      width
    }
  })), logoSuffix) : null;
  const mediaMarkup = contextControl ? /*#__PURE__*/React.createElement("div", {
    className: Navigation_module.default.ContextControl
  }, contextControl) : logoMarkup;
  const context$1 = React.useMemo(() => ({
    location,
    onNavigationDismiss: onDismiss
  }), [location, onDismiss]);
  return /*#__PURE__*/React.createElement(context.NavigationContext.Provider, {
    value: context$1
  }, /*#__PURE__*/React.createElement(withinContentContext.WithinContentContext.Provider, {
    value: true
  }, /*#__PURE__*/React.createElement("nav", {
    className: Navigation_module.default.Navigation,
    "aria-labelledby": ariaLabelledBy
  }, mdUp ? mediaMarkup : null, /*#__PURE__*/React.createElement(Scrollable.Scrollable, {
    className: Navigation_module.default.PrimaryNavigation
  }, children))));
};
Navigation.Item = Item.Item;
Navigation.Section = Section.Section;

exports.Navigation = Navigation;
