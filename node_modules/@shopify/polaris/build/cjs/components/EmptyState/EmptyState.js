'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var EmptyState_module = require('./EmptyState.css.js');
var utils = require('../Button/utils.js');
var Box = require('../Box/Box.js');
var BlockStack = require('../BlockStack/BlockStack.js');
var Image = require('../Image/Image.js');
var Text = require('../Text/Text.js');
var InlineStack = require('../InlineStack/InlineStack.js');

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
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const imageRef = React.useRef(null);
  React.useEffect(() => {
    if (imageRef.current?.complete) setImageLoaded(true);
  }, []);
  const imageClassNames = css.classNames(EmptyState_module.default.Image, imageLoaded && EmptyState_module.default.loaded, imageContained && EmptyState_module.default.imageContained);
  const loadedImageMarkup = largeImage ? /*#__PURE__*/React.createElement(Image.Image, {
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
  }) : /*#__PURE__*/React.createElement(Image.Image, {
    alt: "",
    role: "presentation",
    ref: imageRef,
    className: imageClassNames,
    source: image,
    onLoad: () => setImageLoaded(true)
  });
  const skeletonImageClassNames = css.classNames(EmptyState_module.default.SkeletonImage, imageLoaded && EmptyState_module.default.loaded);
  const imageContainerClassNames = css.classNames(EmptyState_module.default.ImageContainer, !imageLoaded && EmptyState_module.default.SkeletonImageContainer);
  const imageMarkup = /*#__PURE__*/React.createElement("div", {
    className: imageContainerClassNames
  }, loadedImageMarkup, /*#__PURE__*/React.createElement("div", {
    className: skeletonImageClassNames
  }));
  const secondaryActionMarkup = secondaryAction ? utils.buttonFrom(secondaryAction, {}) : null;
  const footerContentMarkup = footerContent ? /*#__PURE__*/React.createElement(Box.Box, {
    paddingBlockStart: "400"
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    alignment: "center",
    variant: "bodySm"
  }, footerContent)) : null;
  const primaryActionMarkup = action ? utils.buttonFrom(action, {
    variant: 'primary',
    size: 'medium'
  }) : null;
  const headingMarkup = heading ? /*#__PURE__*/React.createElement(Box.Box, {
    paddingBlockEnd: "150"
  }, /*#__PURE__*/React.createElement(Text.Text, {
    variant: "headingMd",
    as: "p",
    alignment: "center"
  }, heading)) : null;
  const childrenMarkup = children ? /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    alignment: "center",
    variant: "bodySm"
  }, children) : null;
  const textContentMarkup = headingMarkup || children ? /*#__PURE__*/React.createElement(Box.Box, {
    paddingBlockEnd: "400"
  }, headingMarkup, childrenMarkup) : null;
  const actionsMarkup = primaryActionMarkup || secondaryActionMarkup ? /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    align: "center",
    gap: "200"
  }, secondaryActionMarkup, primaryActionMarkup) : null;
  const detailsMarkup = textContentMarkup || actionsMarkup || footerContentMarkup ? /*#__PURE__*/React.createElement(Box.Box, {
    maxWidth: fullWidth ? '100%' : '400px'
  }, /*#__PURE__*/React.createElement(BlockStack.BlockStack, {
    inlineAlign: "center"
  }, textContentMarkup, actionsMarkup, footerContentMarkup)) : null;
  return /*#__PURE__*/React.createElement(Box.Box, {
    paddingInlineStart: "0",
    paddingInlineEnd: "0",
    paddingBlockStart: "500",
    paddingBlockEnd: "1600"
  }, /*#__PURE__*/React.createElement(BlockStack.BlockStack, {
    inlineAlign: "center"
  }, imageMarkup, detailsMarkup));
}

exports.EmptyState = EmptyState;
