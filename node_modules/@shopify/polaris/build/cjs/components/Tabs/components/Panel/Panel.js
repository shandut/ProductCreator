'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var Tabs_module = require('../../Tabs.css.js');

function Panel({
  hidden,
  id,
  tabID,
  children
}) {
  const className = css.classNames(Tabs_module.default.Panel, hidden && Tabs_module.default['Panel-hidden']);
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    id: id,
    role: "tabpanel",
    "aria-labelledby": tabID,
    tabIndex: -1
  }, children);
}

exports.Panel = Panel;
