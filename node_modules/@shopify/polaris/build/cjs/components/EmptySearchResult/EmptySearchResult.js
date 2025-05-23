'use strict';

var React = require('react');
var emptySearch = require('./illustrations/empty-search.svg.js');
var hooks = require('../../utilities/i18n/hooks.js');
var LegacyStack = require('../LegacyStack/LegacyStack.js');
var Text = require('../Text/Text.js');
var Image = require('../Image/Image.js');

function EmptySearchResult({
  title,
  description,
  withIllustration
}) {
  const i18n = hooks.useI18n();
  const altText = i18n.translate('Polaris.EmptySearchResult.altText');
  const descriptionMarkup = description ? /*#__PURE__*/React.createElement("p", null, description) : null;
  const illustrationMarkup = withIllustration ? /*#__PURE__*/React.createElement(Image.Image, {
    alt: altText,
    source: emptySearch.default,
    draggable: false
  }) : null;
  return /*#__PURE__*/React.createElement(LegacyStack.LegacyStack, {
    alignment: "center",
    vertical: true
  }, illustrationMarkup, /*#__PURE__*/React.createElement(Text.Text, {
    variant: "headingLg",
    as: "p"
  }, title), /*#__PURE__*/React.createElement(Text.Text, {
    tone: "subdued",
    as: "span"
  }, descriptionMarkup));
}

exports.EmptySearchResult = EmptySearchResult;
