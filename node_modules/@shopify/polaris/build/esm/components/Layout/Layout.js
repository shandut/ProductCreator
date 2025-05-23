import React from 'react';
import styles from './Layout.css.js';
import { AnnotatedSection } from './components/AnnotatedSection/AnnotatedSection.js';
import { Section } from './components/Section/Section.js';

const Layout = function Layout({
  sectioned,
  children
}) {
  const content = sectioned ? /*#__PURE__*/React.createElement(Section, null, children) : children;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.Layout
  }, content);
};
Layout.AnnotatedSection = AnnotatedSection;
Layout.Section = Section;

export { Layout };
