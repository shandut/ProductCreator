'use strict';

var React = require('react');
var Layout_module = require('./Layout.css.js');
var AnnotatedSection = require('./components/AnnotatedSection/AnnotatedSection.js');
var Section = require('./components/Section/Section.js');

const Layout = function Layout({
  sectioned,
  children
}) {
  const content = sectioned ? /*#__PURE__*/React.createElement(Section.Section, null, children) : children;
  return /*#__PURE__*/React.createElement("div", {
    className: Layout_module.default.Layout
  }, content);
};
Layout.AnnotatedSection = AnnotatedSection.AnnotatedSection;
Layout.Section = Section.Section;

exports.Layout = Layout;
