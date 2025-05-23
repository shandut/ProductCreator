'use strict';

function isElementInViewport(element) {
  const {
    top,
    left,
    bottom,
    right
  } = element.getBoundingClientRect();
  const window = element.ownerDocument.defaultView || globalThis.window;
  return top >= 0 && right <= window.innerWidth && bottom <= window.innerHeight && left >= 0;
}

exports.isElementInViewport = isElementInViewport;
