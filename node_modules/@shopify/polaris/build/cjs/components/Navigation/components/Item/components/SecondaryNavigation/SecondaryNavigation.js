'use strict';

var React = require('react');
var isEqual = require('react-fast-compare');
var css = require('../../../../../../utilities/css.js');
var context = require('../../../../context.js');
var Navigation_module = require('../../../../Navigation.css.js');
var Collapsible = require('../../../../../Collapsible/Collapsible.js');

function SecondaryNavigation({
  ItemComponent,
  icon,
  longestMatch,
  subNavigationItems,
  showExpanded,
  truncateText,
  secondaryNavigationId
}) {
  const uid = React.useId();
  const {
    onNavigationDismiss
  } = React.useContext(context.NavigationContext);
  const [hoveredItem, setHoveredItem] = React.useState();
  const matchedItemPosition = subNavigationItems.findIndex(item => isEqual(item, longestMatch));
  const hoveredItemPosition = subNavigationItems.findIndex(item => isEqual(item, hoveredItem));
  return /*#__PURE__*/React.createElement("div", {
    className: css.classNames(Navigation_module.default.SecondaryNavigation, showExpanded && Navigation_module.default.SecondaryNavigationOpen, !icon && Navigation_module.default['SecondaryNavigation-noIcon'])
  }, /*#__PURE__*/React.createElement(Collapsible.Collapsible, {
    id: secondaryNavigationId || uid,
    open: showExpanded,
    transition: false
  }, /*#__PURE__*/React.createElement("ul", {
    className: Navigation_module.default.List
  }, subNavigationItems.map((item, index) => {
    const {
      label,
      ...rest
    } = item;
    const onClick = () => {
      onNavigationDismiss?.();
      if (item.onClick && item.onClick !== onNavigationDismiss) {
        item.onClick();
      }
    };
    const shouldShowVerticalLine = index < matchedItemPosition;
    return /*#__PURE__*/React.createElement(ItemComponent, Object.assign({
      key: label
    }, rest, {
      label: label,
      showVerticalLine: shouldShowVerticalLine,
      showVerticalHoverPointer: index === hoveredItemPosition,
      level: 1,
      onMouseEnter: item.disabled ? undefined : () => setHoveredItem(item),
      onMouseLeave: item.disabled ? undefined : () => setHoveredItem(undefined),
      matches: isEqual(item, longestMatch),
      onClick: onClick,
      truncateText: truncateText
    }));
  }))));
}

exports.SecondaryNavigation = SecondaryNavigation;
