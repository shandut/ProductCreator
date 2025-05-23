'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var List_module = require('./List.css.js');
var Item = require('./components/Item/Item.js');

const List = function List({
  children,
  gap = 'loose',
  type = 'bullet'
}) {
  const className = css.classNames(List_module.default.List, gap && List_module.default[css.variationName('spacing', gap)], type && List_module.default[css.variationName('type', type)]);
  const ListElement = type === 'bullet' ? 'ul' : 'ol';
  return /*#__PURE__*/React.createElement(ListElement, {
    className: className
  }, children);
};
List.Item = Item.Item;

exports.List = List;
