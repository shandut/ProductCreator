'use strict';

function isSection(arr) {
  return typeof arr[0] === 'object' && Object.prototype.hasOwnProperty.call(arr[0], 'options');
}

exports.isSection = isSection;
