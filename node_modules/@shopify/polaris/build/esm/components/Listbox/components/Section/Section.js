import React, { useId } from 'react';
import { classNames } from '../../../../utilities/css.js';
import { listboxSectionDataSelector } from './selectors.js';
import { SectionContext } from './context.js';
import styles from './Section.css.js';

function Section({
  children,
  divider = true,
  title
}) {
  const id = useId();
  return /*#__PURE__*/React.createElement(SectionContext.Provider, {
    value: id
  }, /*#__PURE__*/React.createElement("li", Object.assign({
    role: "presentation"
  }, listboxSectionDataSelector.props), title, /*#__PURE__*/React.createElement("ul", {
    role: "group",
    "aria-labelledby": id,
    className: classNames(styles.SectionGroup, !divider && styles.noDivider)
  }, children)));
}

export { Section };
