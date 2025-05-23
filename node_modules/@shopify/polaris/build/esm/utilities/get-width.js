import { pluckDeep } from './pluck-deep.js';

function getWidth(value = {}, defaultWidth = 0, key = 'width') {
  const width = typeof value === 'number' ? value : pluckDeep(value, key);
  return width ? `${width}px` : `${defaultWidth}px`;
}

export { getWidth };
