import React, { useMemo } from 'react';
import { WithinContentContext } from '../../utilities/within-content-context.js';
import { classNames } from '../../utilities/css.js';
import { getWidth } from '../../utilities/get-width.js';
import { useBreakpoints } from '../../utilities/breakpoints.js';
import { NavigationContext } from './context.js';
import styles from './Navigation.css.js';
import { Section } from './components/Section/Section.js';
import { useFrame } from '../../utilities/frame/hooks.js';
import { UnstyledLink } from '../UnstyledLink/UnstyledLink.js';
import { Image } from '../Image/Image.js';
import { Scrollable } from '../Scrollable/Scrollable.js';
import { Item } from './components/Item/Item.js';

const Navigation = function Navigation({
  children,
  contextControl,
  location,
  onDismiss,
  ariaLabelledBy,
  logoSuffix
}) {
  const {
    logo
  } = useFrame();
  const width = getWidth(logo, 104);
  const {
    mdUp
  } = useBreakpoints();
  const logoMarkup = logo ? /*#__PURE__*/React.createElement("div", {
    className: classNames(styles.LogoContainer, logoSuffix && styles.hasLogoSuffix)
  }, /*#__PURE__*/React.createElement(UnstyledLink, {
    url: logo.url || '',
    className: styles.LogoLink,
    style: {
      width
    }
  }, /*#__PURE__*/React.createElement(Image, {
    source: logo.topBarSource || '',
    alt: logo.accessibilityLabel || '',
    className: styles.Logo,
    style: {
      width
    }
  })), logoSuffix) : null;
  const mediaMarkup = contextControl ? /*#__PURE__*/React.createElement("div", {
    className: styles.ContextControl
  }, contextControl) : logoMarkup;
  const context = useMemo(() => ({
    location,
    onNavigationDismiss: onDismiss
  }), [location, onDismiss]);
  return /*#__PURE__*/React.createElement(NavigationContext.Provider, {
    value: context
  }, /*#__PURE__*/React.createElement(WithinContentContext.Provider, {
    value: true
  }, /*#__PURE__*/React.createElement("nav", {
    className: styles.Navigation,
    "aria-labelledby": ariaLabelledBy
  }, mdUp ? mediaMarkup : null, /*#__PURE__*/React.createElement(Scrollable, {
    className: styles.PrimaryNavigation
  }, children))));
};
Navigation.Item = Item;
Navigation.Section = Section;

export { Navigation };
