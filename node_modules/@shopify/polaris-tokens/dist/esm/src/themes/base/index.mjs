import { createMetaThemeBase } from '../../utils.mjs';
import { border } from './border.mjs';
import { breakpoints } from './breakpoints.mjs';
import { color } from './color.mjs';
import { font } from './font.mjs';
import { height } from './height.mjs';
import { motion } from './motion.mjs';
import { shadow } from './shadow.mjs';
import { space } from './space.mjs';
import { text } from './text.mjs';
import { width } from './width.mjs';
import { zIndex } from './zIndex.mjs';

var metaThemeBase = createMetaThemeBase({
  border: border,
  breakpoints: breakpoints,
  color: color,
  font: font,
  height: height,
  motion: motion,
  shadow: shadow,
  space: space,
  text: text,
  width: width,
  zIndex: zIndex
});

export { metaThemeBase };
