import React from 'react';
import { classNames, variationName } from '../../utilities/css.js';
import { useBreakpoints } from '../../utilities/breakpoints.js';
import styles from './Icon.css.js';
import { Text } from '../Text/Text.js';

function Icon({
  source,
  tone,
  accessibilityLabel
}) {
  let sourceType;
  if (typeof source === 'function') {
    sourceType = 'function';
  } else if (source === 'placeholder') {
    sourceType = 'placeholder';
  } else {
    sourceType = 'external';
  }
  if (tone && sourceType === 'external' && process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn('Recoloring external SVGs is not supported. Set the intended color on your SVG instead.');
  }
  const className = classNames(styles.Icon, tone && styles[variationName('tone', tone)]);
  const {
    mdDown
  } = useBreakpoints();
  const SourceComponent = source;
  const contentMarkup = {
    function: /*#__PURE__*/React.createElement(SourceComponent, Object.assign({
      className: styles.Svg,
      focusable: "false",
      "aria-hidden": "true"
      // On Mobile we're scaling the viewBox to 18x18 to make the icons bigger
      // Also, we're setting the viewport origin to 1x1 to center the icon
      // We use this syntax so we don't override the existing viewBox value if we don't need to.
    }, mdDown ? {
      viewBox: '1 1 18 18'
    } : {})),
    placeholder: /*#__PURE__*/React.createElement("div", {
      className: styles.Placeholder
    }),
    external: /*#__PURE__*/React.createElement("img", {
      className: styles.Img,
      src: `data:image/svg+xml;utf8,${source}`,
      alt: "",
      "aria-hidden": "true"
    })
  };
  return /*#__PURE__*/React.createElement("span", {
    className: className
  }, accessibilityLabel && /*#__PURE__*/React.createElement(Text, {
    as: "span",
    visuallyHidden: true
  }, accessibilityLabel), contentMarkup[sourceType]);
}

export { Icon };
