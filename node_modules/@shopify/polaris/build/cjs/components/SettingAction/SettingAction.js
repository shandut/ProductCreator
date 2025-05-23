'use strict';

var React = require('react');
var SettingAction_module = require('./SettingAction.css.js');

function SettingAction({
  action,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: SettingAction_module.default.SettingAction
  }, /*#__PURE__*/React.createElement("div", {
    className: SettingAction_module.default.Setting
  }, children), /*#__PURE__*/React.createElement("div", {
    className: SettingAction_module.default.Action
  }, action));
}

exports.SettingAction = SettingAction;
