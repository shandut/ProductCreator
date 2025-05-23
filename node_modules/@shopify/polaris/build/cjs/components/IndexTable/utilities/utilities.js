'use strict';

function getTableHeadingsBySelector(wrapperElement, selector) {
  return wrapperElement ? Array.from(wrapperElement.querySelectorAll(selector)) : [];
}

exports.getTableHeadingsBySelector = getTableHeadingsBySelector;
