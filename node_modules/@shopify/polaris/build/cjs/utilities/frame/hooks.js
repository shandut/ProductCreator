'use strict';

var React = require('react');
var context = require('./context.js');

function useFrame() {
  const frame = React.useContext(context.FrameContext);
  if (!frame) {
    throw new Error('No Frame context was provided. Your component must be wrapped in a <Frame> component. See https://polaris.shopify.com/components/internal-only/frame for implementation instructions.');
  }
  return frame;
}

exports.useFrame = useFrame;
