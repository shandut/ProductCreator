import React from 'react';
import { classNames, variationName } from '../../utilities/css.js';
import styles from './List.css.js';
import { Item } from './components/Item/Item.js';

const List = function List({
  children,
  gap = 'loose',
  type = 'bullet'
}) {
  const className = classNames(styles.List, gap && styles[variationName('spacing', gap)], type && styles[variationName('type', type)]);
  const ListElement = type === 'bullet' ? 'ul' : 'ol';
  return /*#__PURE__*/React.createElement(ListElement, {
    className: className
  }, children);
};
List.Item = Item;

export { List };
