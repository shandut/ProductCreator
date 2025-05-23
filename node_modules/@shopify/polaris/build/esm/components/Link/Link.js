import React from 'react';
import { BannerContext } from '../../utilities/banner-context.js';
import { classNames } from '../../utilities/css.js';
import styles from './Link.css.js';
import { UnstyledLink } from '../UnstyledLink/UnstyledLink.js';

function Link({
  url,
  children,
  onClick,
  external,
  target,
  id,
  monochrome,
  removeUnderline,
  accessibilityLabel,
  dataPrimaryLink
}) {
  return /*#__PURE__*/React.createElement(BannerContext.Consumer, null, BannerContext => {
    const shouldBeMonochrome = monochrome || BannerContext;
    const className = classNames(styles.Link, shouldBeMonochrome && styles.monochrome, removeUnderline && styles.removeUnderline);
    return url ? /*#__PURE__*/React.createElement(UnstyledLink, {
      onClick: onClick,
      className: className,
      url: url,
      external: external,
      target: target,
      id: id,
      "aria-label": accessibilityLabel,
      "data-primary-link": dataPrimaryLink
    }, children) : /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: onClick,
      className: className,
      id: id,
      "aria-label": accessibilityLabel,
      "data-primary-link": dataPrimaryLink
    }, children);
  });
}

export { Link };
