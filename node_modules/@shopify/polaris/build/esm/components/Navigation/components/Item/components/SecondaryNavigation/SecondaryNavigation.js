import React, { useId, useContext, useState } from 'react';
import isEqual from 'react-fast-compare';
import { classNames } from '../../../../../../utilities/css.js';
import { NavigationContext } from '../../../../context.js';
import styles from '../../../../Navigation.css.js';
import { Collapsible } from '../../../../../Collapsible/Collapsible.js';

function SecondaryNavigation({
  ItemComponent,
  icon,
  longestMatch,
  subNavigationItems,
  showExpanded,
  truncateText,
  secondaryNavigationId
}) {
  const uid = useId();
  const {
    onNavigationDismiss
  } = useContext(NavigationContext);
  const [hoveredItem, setHoveredItem] = useState();
  const matchedItemPosition = subNavigationItems.findIndex(item => isEqual(item, longestMatch));
  const hoveredItemPosition = subNavigationItems.findIndex(item => isEqual(item, hoveredItem));
  return /*#__PURE__*/React.createElement("div", {
    className: classNames(styles.SecondaryNavigation, showExpanded && styles.SecondaryNavigationOpen, !icon && styles['SecondaryNavigation-noIcon'])
  }, /*#__PURE__*/React.createElement(Collapsible, {
    id: secondaryNavigationId || uid,
    open: showExpanded,
    transition: false
  }, /*#__PURE__*/React.createElement("ul", {
    className: styles.List
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

export { SecondaryNavigation };
