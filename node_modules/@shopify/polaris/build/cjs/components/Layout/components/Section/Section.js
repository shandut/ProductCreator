'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var Layout_module = require('../../Layout.css.js');

function Section({
  children,
  variant
}) {
  const className = css.classNames(Layout_module.default.Section, Layout_module.default[`Section-${variant}`]);
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, children);
}

exports.Section = Section;
