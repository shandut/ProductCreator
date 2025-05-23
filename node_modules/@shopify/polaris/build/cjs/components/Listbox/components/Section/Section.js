'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var selectors = require('./selectors.js');
var context = require('./context.js');
var Section_module = require('./Section.css.js');

function Section({
  children,
  divider = true,
  title
}) {
  const id = React.useId();
  return /*#__PURE__*/React.createElement(context.SectionContext.Provider, {
    value: id
  }, /*#__PURE__*/React.createElement("li", Object.assign({
    role: "presentation"
  }, selectors.listboxSectionDataSelector.props), title, /*#__PURE__*/React.createElement("ul", {
    role: "group",
    "aria-labelledby": id,
    className: css.classNames(Section_module.default.SectionGroup, !divider && Section_module.default.noDivider)
  }, children)));
}

exports.Section = Section;
