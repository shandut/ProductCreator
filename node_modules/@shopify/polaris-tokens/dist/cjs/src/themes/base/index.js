'use strict';

var utils = require('../../utils.js');
var border = require('./border.js');
var breakpoints = require('./breakpoints.js');
var color = require('./color.js');
var font = require('./font.js');
var height = require('./height.js');
var motion = require('./motion.js');
var shadow = require('./shadow.js');
var space = require('./space.js');
var text = require('./text.js');
var width = require('./width.js');
var zIndex = require('./zIndex.js');

var metaThemeBase = utils.createMetaThemeBase({
  border: border.border,
  breakpoints: breakpoints.breakpoints,
  color: color.color,
  font: font.font,
  height: height.height,
  motion: motion.motion,
  shadow: shadow.shadow,
  space: space.space,
  text: text.text,
  width: width.width,
  zIndex: zIndex.zIndex
});

exports.metaThemeBase = metaThemeBase;
