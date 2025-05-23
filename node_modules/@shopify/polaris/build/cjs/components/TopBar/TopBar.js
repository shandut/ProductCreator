'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../utilities/css.js');
var getWidth = require('../../utilities/get-width.js');
var useToggle = require('../../utilities/use-toggle.js');
var TopBar_module = require('./TopBar.css.js');
var Search = require('./components/Search/Search.js');
var SearchField = require('./components/SearchField/SearchField.js');
var UserMenu = require('./components/UserMenu/UserMenu.js');
var hooks = require('../../utilities/i18n/hooks.js');
var hooks$1 = require('../../utilities/frame/hooks.js');
var Icon = require('../Icon/Icon.js');
var UnstyledLink = require('../UnstyledLink/UnstyledLink.js');
var Image = require('../Image/Image.js');
var Menu = require('./components/Menu/Menu.js');

// TypeScript can't generate types that correctly infer the typing of
// subcomponents so explicitly state the subcomponents in the type definition.
// Letting this be implicit works in this project but fails in projects that use
// generated *.d.ts files.

const TopBar = function TopBar({
  showNavigationToggle,
  userMenu,
  searchResults,
  searchField,
  secondaryMenu,
  searchResultsVisible,
  searchResultsOverlayVisible = false,
  onNavigationToggle,
  onSearchResultsDismiss,
  contextControl,
  logoSuffix
}) {
  const i18n = hooks.useI18n();
  const {
    logo
  } = hooks$1.useFrame();
  const {
    value: focused,
    setTrue: forceTrueFocused,
    setFalse: forceFalseFocused
  } = useToggle.useToggle(false);
  const iconClassName = css.classNames(TopBar_module.default.NavigationIcon, focused && TopBar_module.default.focused);
  const navigationButtonMarkup = showNavigationToggle ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: iconClassName,
    onClick: onNavigationToggle,
    onFocus: forceTrueFocused,
    onBlur: forceFalseFocused,
    "aria-label": i18n.translate('Polaris.TopBar.toggleMenuLabel')
  }, /*#__PURE__*/React.createElement("div", {
    className: TopBar_module.default.IconWrapper
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.MenuIcon
  }))) : null;
  const width = getWidth.getWidth(logo, 104);
  let contextMarkup;
  if (contextControl) {
    contextMarkup = /*#__PURE__*/React.createElement("div", {
      className: TopBar_module.default.ContextControl
    }, contextControl);
  } else if (logo) {
    const className = css.classNames(TopBar_module.default.LogoContainer, showNavigationToggle || searchField ? TopBar_module.default.LogoDisplayControl : TopBar_module.default.LogoDisplayContainer, logoSuffix && TopBar_module.default.hasLogoSuffix);
    contextMarkup = /*#__PURE__*/React.createElement("div", {
      className: className
    }, /*#__PURE__*/React.createElement(UnstyledLink.UnstyledLink, {
      url: logo.url || '',
      className: TopBar_module.default.LogoLink,
      style: {
        width
      }
    }, /*#__PURE__*/React.createElement(Image.Image, {
      source: logo.topBarSource || '',
      alt: logo.accessibilityLabel || '',
      className: TopBar_module.default.Logo,
      style: {
        width
      }
    })), logoSuffix);
  }
  const searchMarkup = searchField ? /*#__PURE__*/React.createElement(React.Fragment, null, searchField, /*#__PURE__*/React.createElement(Search.Search, {
    visible: searchResultsVisible,
    onDismiss: onSearchResultsDismiss,
    overlayVisible: searchResultsOverlayVisible
  }, searchResults)) : null;
  return /*#__PURE__*/React.createElement("div", {
    className: TopBar_module.default.TopBar
  }, /*#__PURE__*/React.createElement("div", {
    className: TopBar_module.default.Container
  }, /*#__PURE__*/React.createElement("div", {
    className: TopBar_module.default.LeftContent
  }, navigationButtonMarkup, contextMarkup), /*#__PURE__*/React.createElement("div", {
    className: TopBar_module.default.Search
  }, searchMarkup), /*#__PURE__*/React.createElement("div", {
    className: TopBar_module.default.RightContent
  }, /*#__PURE__*/React.createElement("div", {
    className: TopBar_module.default.SecondaryMenu
  }, secondaryMenu), userMenu)));
};
TopBar.Menu = Menu.Menu;
TopBar.SearchField = SearchField.SearchField;
TopBar.UserMenu = UserMenu.UserMenu;

exports.TopBar = TopBar;
