'use strict';

var React = require('react');
var css = require('../../../../../../utilities/css.js');
var Title_module = require('./Title.css.js');
var Text = require('../../../../../Text/Text.js');
var Bleed = require('../../../../../Bleed/Bleed.js');

function Title({
  title,
  subtitle,
  titleMetadata,
  compactTitle,
  hasSubtitleMaxWidth
}) {
  const className = css.classNames(Title_module.default.Title, subtitle && Title_module.default.TitleWithSubtitle);
  const titleMarkup = title ? /*#__PURE__*/React.createElement("h1", {
    className: className
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "headingLg",
    fontWeight: "bold"
  }, title)) : null;
  const titleMetadataMarkup = titleMetadata ? /*#__PURE__*/React.createElement(Bleed.Bleed, {
    marginBlock: "100"
  }, titleMetadata) : null;
  const wrappedTitleMarkup = /*#__PURE__*/React.createElement("div", {
    className: Title_module.default.TitleWrapper
  }, titleMarkup, titleMetadataMarkup);
  const subtitleMarkup = subtitle ? /*#__PURE__*/React.createElement("div", {
    className: css.classNames(Title_module.default.SubTitle, compactTitle && Title_module.default.SubtitleCompact, hasSubtitleMaxWidth && Title_module.default.SubtitleMaxWidth)
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "p",
    variant: "bodySm",
    tone: "subdued"
  }, subtitle)) : null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, wrappedTitleMarkup, subtitleMarkup);
}

exports.Title = Title;
