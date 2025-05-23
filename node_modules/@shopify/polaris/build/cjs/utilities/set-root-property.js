'use strict';

function setRootProperty(name, value, node) {
  if (!document) return;
  const element = node || document.documentElement;
  element.style.setProperty(name, value);
}

exports.setRootProperty = setRootProperty;
