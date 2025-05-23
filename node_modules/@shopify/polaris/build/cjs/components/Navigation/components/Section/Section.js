'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../../../utilities/css.js');
var useToggle = require('../../../../utilities/use-toggle.js');
var Navigation_module = require('../../Navigation.css.js');
var Item = require('../Item/Item.js');
var hooks = require('../../../../utilities/media-query/hooks.js');
var Icon = require('../../../Icon/Icon.js');
var Tooltip = require('../../../Tooltip/Tooltip.js');
var Text = require('../../../Text/Text.js');
var Collapsible = require('../../../Collapsible/Collapsible.js');

function Section({
  title,
  fill,
  action,
  items,
  rollup,
  separator
}) {
  const {
    value: expanded,
    toggle: toggleExpanded,
    setFalse: setExpandedFalse
  } = useToggle.useToggle(false);
  const animationFrame = React.useRef(null);
  const {
    isNavigationCollapsed
  } = hooks.useMediaQuery();
  const [expandedIndex, setExpandedIndex] = React.useState();
  const handleClick = (onClick, hasSubNavItems) => {
    return () => {
      if (onClick) {
        onClick();
      }
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      if (!hasSubNavItems || !isNavigationCollapsed) {
        animationFrame.current = requestAnimationFrame(setExpandedFalse);
      }
    };
  };
  React.useEffect(() => {
    return () => {
      animationFrame.current && cancelAnimationFrame(animationFrame.current);
    };
  });
  const className = css.classNames(Navigation_module.default.Section, separator && Navigation_module.default['Section-withSeparator'], fill && Navigation_module.default['Section-fill']);
  const buttonMarkup = action && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: Navigation_module.default.Action,
    "aria-label": action.accessibilityLabel,
    onClick: action.onClick
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: action.icon
  }));
  const actionMarkup = action && (action.tooltip ? /*#__PURE__*/React.createElement(Tooltip.Tooltip, action.tooltip, buttonMarkup) : buttonMarkup);
  const sectionHeadingMarkup = title && /*#__PURE__*/React.createElement("li", {
    className: Navigation_module.default.SectionHeading
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "bodySm",
    fontWeight: "medium",
    tone: "subdued"
  }, title), actionMarkup);
  const itemsMarkup = items.map((item, index) => {
    const {
      onClick,
      label,
      subNavigationItems,
      ...rest
    } = item;
    const hasSubNavItems = subNavigationItems != null && subNavigationItems.length > 0;
    const handleToggleExpandedState = () => {
      if (expandedIndex === index) {
        setExpandedIndex(-1);
      } else {
        setExpandedIndex(index);
      }
    };
    return /*#__PURE__*/React.createElement(Item.Item, Object.assign({
      key: label
    }, rest, {
      label: label,
      subNavigationItems: subNavigationItems,
      onClick: handleClick(onClick, hasSubNavItems),
      onToggleExpandedState: handleToggleExpandedState,
      expanded: expandedIndex === index
    }));
  });
  const toggleClassName = css.classNames(Navigation_module.default.Item, Navigation_module.default.RollupToggle);
  const ariaLabel = rollup && (expanded ? rollup.hide : rollup.view);
  const toggleRollup = rollup && items.length > rollup.after && /*#__PURE__*/React.createElement("div", {
    className: Navigation_module.default.ListItem,
    key: "List Item"
  }, /*#__PURE__*/React.createElement("div", {
    className: Navigation_module.default.ItemWrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: Navigation_module.default.ItemInnerWrapper
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: toggleClassName,
    onClick: toggleExpanded,
    "aria-label": ariaLabel
  }, /*#__PURE__*/React.createElement("span", {
    className: Navigation_module.default.Icon
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.MenuHorizontalIcon
  }))))));
  const activeItemIndex = items.findIndex(item => {
    if (!rollup) {
      return false;
    }
    return rollup.activePath === item.url || item.url && rollup.activePath.startsWith(item.url) || (item.subNavigationItems ? item.subNavigationItems.some(({
      url: itemUrl
    }) => rollup.activePath.startsWith(itemUrl)) : false);
  });
  const sectionItems = rollup ? itemsMarkup.slice(0, rollup.after) : itemsMarkup;
  const additionalItems = rollup ? itemsMarkup.slice(rollup.after) : [];
  if (rollup && activeItemIndex !== -1 && activeItemIndex > rollup.after - 1) {
    sectionItems.push(...additionalItems.splice(activeItemIndex - rollup.after, 1));
  }
  const additionalItemsId = React.useId();
  const activeItemsMarkup = rollup && additionalItems.length > 0 && /*#__PURE__*/React.createElement("li", {
    className: Navigation_module.default.RollupSection
  }, /*#__PURE__*/React.createElement(Collapsible.Collapsible, {
    id: additionalItemsId,
    open: expanded
  }, /*#__PURE__*/React.createElement("ul", {
    className: Navigation_module.default.List
  }, additionalItems)), toggleRollup);
  return /*#__PURE__*/React.createElement("ul", {
    className: className
  }, sectionHeadingMarkup, sectionItems, activeItemsMarkup);
}

exports.Section = Section;
