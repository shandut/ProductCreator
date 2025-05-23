'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var SkeletonTabs_module = require('./SkeletonTabs.css.js');

function SkeletonTabs({
  count = 2,
  fitted = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: css.classNames(SkeletonTabs_module.default.Tabs, fitted && SkeletonTabs_module.default.fitted)
  }, [...Array(count).keys()].map(key => {
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      className: css.classNames(SkeletonTabs_module.default.Tab)
    }, /*#__PURE__*/React.createElement("div", {
      className: SkeletonTabs_module.default.TabText
    }));
  }));
}

exports.SkeletonTabs = SkeletonTabs;
