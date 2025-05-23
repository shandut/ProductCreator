'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var isInterface = require('../../utilities/is-interface.js');
var isReactElement = require('../../utilities/is-react-element.js');
var Page_module = require('./Page.css.js');
var Header = require('./components/Header/Header.js');

function Page({
  children,
  fullWidth,
  narrowWidth,
  ...rest
}) {
  const pageClassName = css.classNames(Page_module.default.Page, fullWidth && Page_module.default.fullWidth, narrowWidth && Page_module.default.narrowWidth);
  const hasHeaderContent = rest.title != null && rest.title !== '' || rest.subtitle != null && rest.subtitle !== '' || rest.primaryAction != null || rest.secondaryActions != null && (isInterface.isInterface(rest.secondaryActions) && rest.secondaryActions.length > 0 || isReactElement.isReactElement(rest.secondaryActions)) || rest.actionGroups != null && rest.actionGroups.length > 0 || rest.backAction != null;
  const contentClassName = css.classNames(!hasHeaderContent && Page_module.default.Content);
  const headerMarkup = hasHeaderContent ? /*#__PURE__*/React.createElement(Header.Header, Object.assign({
    filterActions: true
  }, rest)) : null;
  return /*#__PURE__*/React.createElement("div", {
    className: pageClassName
  }, headerMarkup, /*#__PURE__*/React.createElement("div", {
    className: contentClassName
  }, children));
}

exports.Page = Page;
