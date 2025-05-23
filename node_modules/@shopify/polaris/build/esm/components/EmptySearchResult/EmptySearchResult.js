import React from 'react';
import emptySearch from './illustrations/empty-search.svg.js';
import { useI18n } from '../../utilities/i18n/hooks.js';
import { LegacyStack } from '../LegacyStack/LegacyStack.js';
import { Text } from '../Text/Text.js';
import { Image } from '../Image/Image.js';

function EmptySearchResult({
  title,
  description,
  withIllustration
}) {
  const i18n = useI18n();
  const altText = i18n.translate('Polaris.EmptySearchResult.altText');
  const descriptionMarkup = description ? /*#__PURE__*/React.createElement("p", null, description) : null;
  const illustrationMarkup = withIllustration ? /*#__PURE__*/React.createElement(Image, {
    alt: altText,
    source: emptySearch,
    draggable: false
  }) : null;
  return /*#__PURE__*/React.createElement(LegacyStack, {
    alignment: "center",
    vertical: true
  }, illustrationMarkup, /*#__PURE__*/React.createElement(Text, {
    variant: "headingLg",
    as: "p"
  }, title), /*#__PURE__*/React.createElement(Text, {
    tone: "subdued",
    as: "span"
  }, descriptionMarkup));
}

export { EmptySearchResult };
