'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var ExceptionList_module = require('./ExceptionList.css.js');
var Truncate = require('../Truncate/Truncate.js');
var Icon = require('../Icon/Icon.js');

function ExceptionList({
  items: itemsList
}) {
  const items = itemsList.map((item, index) => {
    const {
      status,
      icon,
      title,
      description,
      truncate = false
    } = item;
    const itemClasses = css.classNames(ExceptionList_module.default.Item, status && ExceptionList_module.default[css.variationName('status', status)]);
    const iconMarkup = icon ? /*#__PURE__*/React.createElement(Icon.Icon, {
      source: icon
    }) : /*#__PURE__*/React.createElement("span", {
      className: ExceptionList_module.default.Bullet
    });
    const titleMarkup = title && /*#__PURE__*/React.createElement("span", {
      className: ExceptionList_module.default.Title
    }, title);
    const descriptionMarkup = description && /*#__PURE__*/React.createElement("span", {
      className: ExceptionList_module.default.Description
    }, description);
    const Element = truncate ? Truncate.Truncate : React.Fragment;
    return /*#__PURE__*/React.createElement("li", {
      className: itemClasses,
      key: index
    }, /*#__PURE__*/React.createElement("span", {
      className: ExceptionList_module.default.Icon
    }, iconMarkup), /*#__PURE__*/React.createElement(Element, null, titleMarkup, descriptionMarkup));
  });
  return /*#__PURE__*/React.createElement("ul", {
    className: ExceptionList_module.default.ExceptionList
  }, items);
}

exports.ExceptionList = ExceptionList;
