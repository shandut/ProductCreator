import React from 'react';
import { classNames } from '../../../../../../utilities/css.js';
import styles from './Title.css.js';
import { Text } from '../../../../../Text/Text.js';
import { Bleed } from '../../../../../Bleed/Bleed.js';

function Title({
  title,
  subtitle,
  titleMetadata,
  compactTitle,
  hasSubtitleMaxWidth
}) {
  const className = classNames(styles.Title, subtitle && styles.TitleWithSubtitle);
  const titleMarkup = title ? /*#__PURE__*/React.createElement("h1", {
    className: className
  }, /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "headingLg",
    fontWeight: "bold"
  }, title)) : null;
  const titleMetadataMarkup = titleMetadata ? /*#__PURE__*/React.createElement(Bleed, {
    marginBlock: "100"
  }, titleMetadata) : null;
  const wrappedTitleMarkup = /*#__PURE__*/React.createElement("div", {
    className: styles.TitleWrapper
  }, titleMarkup, titleMetadataMarkup);
  const subtitleMarkup = subtitle ? /*#__PURE__*/React.createElement("div", {
    className: classNames(styles.SubTitle, compactTitle && styles.SubtitleCompact, hasSubtitleMaxWidth && styles.SubtitleMaxWidth)
  }, /*#__PURE__*/React.createElement(Text, {
    as: "p",
    variant: "bodySm",
    tone: "subdued"
  }, subtitle)) : null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, wrappedTitleMarkup, subtitleMarkup);
}

export { Title };
