import React, { useState, useRef, useEffect } from 'react';
import { classNames } from '../../utilities/css.js';
import styles from './EmptyState.css.js';
import { buttonFrom } from '../Button/utils.js';
import { Box } from '../Box/Box.js';
import { BlockStack } from '../BlockStack/BlockStack.js';
import { Image } from '../Image/Image.js';
import { Text } from '../Text/Text.js';
import { InlineStack } from '../InlineStack/InlineStack.js';

function EmptyState({
  children,
  heading,
  image,
  largeImage,
  imageContained,
  fullWidth = false,
  action,
  secondaryAction,
  footerContent
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef(null);
  useEffect(() => {
    if (imageRef.current?.complete) setImageLoaded(true);
  }, []);
  const imageClassNames = classNames(styles.Image, imageLoaded && styles.loaded, imageContained && styles.imageContained);
  const loadedImageMarkup = largeImage ? /*#__PURE__*/React.createElement(Image, {
    alt: "",
    role: "presentation",
    ref: imageRef,
    source: largeImage,
    className: imageClassNames,
    sourceSet: [{
      source: image,
      descriptor: '568w'
    }, {
      source: largeImage,
      descriptor: '1136w'
    }],
    sizes: "(max-width: 568px) 60vw",
    onLoad: () => setImageLoaded(true)
  }) : /*#__PURE__*/React.createElement(Image, {
    alt: "",
    role: "presentation",
    ref: imageRef,
    className: imageClassNames,
    source: image,
    onLoad: () => setImageLoaded(true)
  });
  const skeletonImageClassNames = classNames(styles.SkeletonImage, imageLoaded && styles.loaded);
  const imageContainerClassNames = classNames(styles.ImageContainer, !imageLoaded && styles.SkeletonImageContainer);
  const imageMarkup = /*#__PURE__*/React.createElement("div", {
    className: imageContainerClassNames
  }, loadedImageMarkup, /*#__PURE__*/React.createElement("div", {
    className: skeletonImageClassNames
  }));
  const secondaryActionMarkup = secondaryAction ? buttonFrom(secondaryAction, {}) : null;
  const footerContentMarkup = footerContent ? /*#__PURE__*/React.createElement(Box, {
    paddingBlockStart: "400"
  }, /*#__PURE__*/React.createElement(Text, {
    as: "span",
    alignment: "center",
    variant: "bodySm"
  }, footerContent)) : null;
  const primaryActionMarkup = action ? buttonFrom(action, {
    variant: 'primary',
    size: 'medium'
  }) : null;
  const headingMarkup = heading ? /*#__PURE__*/React.createElement(Box, {
    paddingBlockEnd: "150"
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "headingMd",
    as: "p",
    alignment: "center"
  }, heading)) : null;
  const childrenMarkup = children ? /*#__PURE__*/React.createElement(Text, {
    as: "span",
    alignment: "center",
    variant: "bodySm"
  }, children) : null;
  const textContentMarkup = headingMarkup || children ? /*#__PURE__*/React.createElement(Box, {
    paddingBlockEnd: "400"
  }, headingMarkup, childrenMarkup) : null;
  const actionsMarkup = primaryActionMarkup || secondaryActionMarkup ? /*#__PURE__*/React.createElement(InlineStack, {
    align: "center",
    gap: "200"
  }, secondaryActionMarkup, primaryActionMarkup) : null;
  const detailsMarkup = textContentMarkup || actionsMarkup || footerContentMarkup ? /*#__PURE__*/React.createElement(Box, {
    maxWidth: fullWidth ? '100%' : '400px'
  }, /*#__PURE__*/React.createElement(BlockStack, {
    inlineAlign: "center"
  }, textContentMarkup, actionsMarkup, footerContentMarkup)) : null;
  return /*#__PURE__*/React.createElement(Box, {
    paddingInlineStart: "0",
    paddingInlineEnd: "0",
    paddingBlockStart: "500",
    paddingBlockEnd: "1600"
  }, /*#__PURE__*/React.createElement(BlockStack, {
    inlineAlign: "center"
  }, imageMarkup, detailsMarkup));
}

export { EmptyState };
