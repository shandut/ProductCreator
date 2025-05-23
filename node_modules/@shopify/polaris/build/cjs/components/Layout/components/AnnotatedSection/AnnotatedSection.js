'use strict';

var React = require('react');
var Layout_module = require('../../Layout.css.js');
var TextContainer = require('../../../TextContainer/TextContainer.js');
var Text = require('../../../Text/Text.js');
var Box = require('../../../Box/Box.js');

function AnnotatedSection({
  children,
  title,
  description,
  id
}) {
  const descriptionMarkup = typeof description === 'string' ? /*#__PURE__*/React.createElement(Text.Text, {
    as: "p",
    variant: "bodyMd"
  }, description) : description;
  return /*#__PURE__*/React.createElement("div", {
    className: Layout_module.default.AnnotatedSection
  }, /*#__PURE__*/React.createElement("div", {
    className: Layout_module.default.AnnotationWrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: Layout_module.default.Annotation
  }, /*#__PURE__*/React.createElement(TextContainer.TextContainer, {
    spacing: "tight"
  }, /*#__PURE__*/React.createElement(Text.Text, {
    id: id,
    variant: "headingMd",
    as: "h2"
  }, title), descriptionMarkup && /*#__PURE__*/React.createElement(Box.Box, {
    color: "text-secondary"
  }, descriptionMarkup))), /*#__PURE__*/React.createElement("div", {
    className: Layout_module.default.AnnotationContent
  }, children)));
}

exports.AnnotatedSection = AnnotatedSection;
