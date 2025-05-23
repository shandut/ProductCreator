import React, { useId, useContext, useRef, useState, useEffect } from 'react';
import { useIsomorphicLayoutEffect } from '../../../../utilities/use-isomorphic-layout-effect.js';
import { classNames } from '../../../../utilities/css.js';
import { NavigationContext } from '../../context.js';
import styles from '../../Navigation.css.js';
import { MatchState } from '../../types.js';
import { SecondaryNavigation } from './components/SecondaryNavigation/SecondaryNavigation.js';
import { useI18n } from '../../../../utilities/i18n/hooks.js';
import { useMediaQuery } from '../../../../utilities/media-query/hooks.js';
import { Indicator } from '../../../Indicator/Indicator.js';
import { Icon } from '../../../Icon/Icon.js';
import { Badge } from '../../../Badge/Badge.js';
import { Text } from '../../../Text/Text.js';
import { UnstyledLink } from '../../../UnstyledLink/UnstyledLink.js';
import { UnstyledButton } from '../../../UnstyledButton/UnstyledButton.js';
import { Tooltip } from '../../../Tooltip/Tooltip.js';

const MAX_SECONDARY_ACTIONS = 2;
const TOOLTIP_HOVER_DELAY = 1000;
function Item({
  url,
  icon: baseIcon,
  matchedItemIcon,
  label,
  subNavigationItems = [],
  secondaryAction,
  secondaryActions,
  displayActionsOnHover,
  disabled,
  onClick,
  accessibilityLabel,
  selected: selectedOverride,
  badge,
  new: isNew,
  matches,
  exactMatch,
  matchPaths,
  excludePaths,
  external,
  onToggleExpandedState,
  expanded,
  shouldResizeIcon,
  truncateText,
  showVerticalLine,
  showVerticalHoverPointer,
  level = 0,
  onMouseEnter,
  onMouseLeave
}) {
  const i18n = useI18n();
  const {
    isNavigationCollapsed
  } = useMediaQuery();
  const secondaryNavigationId = useId();
  const {
    location,
    onNavigationDismiss
  } = useContext(NavigationContext);
  const navTextRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);
  useEffect(() => {
    if (!isNavigationCollapsed && expanded) {
      onToggleExpandedState?.();
    }
  }, [expanded, isNavigationCollapsed, onToggleExpandedState]);
  useIsomorphicLayoutEffect(() => {
    const navTextNode = navTextRef.current;
    if (truncateText && navTextNode) {
      setIsTruncated(navTextNode.scrollHeight > navTextNode.clientHeight);
    }
  }, [truncateText]);
  const tabIndex = disabled ? -1 : 0;
  const hasNewChild = subNavigationItems.filter(subNavigationItem => subNavigationItem.new).length > 0;
  const indicatorMarkup = hasNewChild ? /*#__PURE__*/React.createElement("span", {
    className: styles.Indicator
  }, /*#__PURE__*/React.createElement(Indicator, {
    pulse: true
  })) : null;
  const matchState = matchStateForItem({
    url,
    matches,
    exactMatch,
    matchPaths,
    excludePaths
  }, location);
  const matchingSubNavigationItems = subNavigationItems.filter(item => {
    const subMatchState = matchStateForItem(item, location);
    return subMatchState === MatchState.MatchForced || subMatchState === MatchState.MatchUrl || subMatchState === MatchState.MatchPaths;
  });
  const childIsActive = matchingSubNavigationItems.length > 0;
  const selected = selectedOverride == null ? matchState === MatchState.MatchForced || matchState === MatchState.MatchUrl || matchState === MatchState.MatchPaths : selectedOverride;
  const icon = selected || childIsActive ? matchedItemIcon ?? baseIcon : baseIcon;
  const iconMarkup = icon ? /*#__PURE__*/React.createElement("div", {
    className: classNames(styles.Icon, shouldResizeIcon && styles['Icon-resized'])
  }, /*#__PURE__*/React.createElement(Icon, {
    source: icon
  })) : null;
  let badgeMarkup = null;
  if (isNew) {
    badgeMarkup = /*#__PURE__*/React.createElement(Badge, {
      tone: "new"
    }, i18n.translate('Polaris.Badge.TONE_LABELS.new'));
  } else if (typeof badge === 'string') {
    badgeMarkup = /*#__PURE__*/React.createElement(Badge, {
      tone: "new"
    }, badge);
  } else {
    badgeMarkup = badge;
  }
  const wrappedBadgeMarkup = badgeMarkup == null ? null : /*#__PURE__*/React.createElement("div", {
    className: styles.Badge
  }, badgeMarkup);
  const tone = !showVerticalHoverPointer && !matches && level !== 0 ? 'subdued' : undefined;
  let fontWeight = 'regular';
  if ((matches || selected) && !childIsActive) {
    fontWeight = 'semibold';
  } else if (level === 0 || showVerticalHoverPointer) {
    fontWeight = 'medium';
  }
  const itemLabelMarkup = /*#__PURE__*/React.createElement("span", {
    className: classNames(styles.Text, truncateText && styles['Text-truncated']),
    ref: navTextRef
  }, /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "bodyMd",
    tone: tone,
    fontWeight: fontWeight
  }, label), indicatorMarkup);
  if (url == null) {
    const className = classNames(styles.Item, disabled && styles['Item-disabled'], selectedOverride && styles['Item-selected']);
    return /*#__PURE__*/React.createElement("li", {
      className: styles.ListItem
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.ItemWrapper
    }, /*#__PURE__*/React.createElement("div", {
      className: classNames(styles.ItemInnerWrapper, disabled && styles.ItemInnerDisabled, selectedOverride && styles['ItemInnerWrapper-selected'])
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: className,
      disabled: disabled,
      "aria-disabled": disabled,
      "aria-label": accessibilityLabel,
      onClick: getClickHandler(onClick)
    }, iconMarkup, itemLabelMarkup, wrappedBadgeMarkup))));
  }
  if (secondaryAction && process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn('Deprecation: The `secondaryAction` prop on the `Navigation.Item` has been deprecated. Use `secondaryActions` instead.');
  }
  const actions = secondaryActions || secondaryAction && [secondaryAction];
  if (actions && actions.length > MAX_SECONDARY_ACTIONS) {
    actions.length = MAX_SECONDARY_ACTIONS;
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(`secondaryActions must have a maximum of ${MAX_SECONDARY_ACTIONS} actions. Only the first ${MAX_SECONDARY_ACTIONS} actions will be rendered.`);
    }
  }
  const secondaryActionMarkup = actions?.length ? /*#__PURE__*/React.createElement("span", {
    className: styles.SecondaryActions
  }, actions.map(action => /*#__PURE__*/React.createElement(ItemSecondaryAction, Object.assign({
    key: action.accessibilityLabel
  }, action, {
    tabIndex: tabIndex,
    disabled: disabled
  })))) : null;
  const itemContentMarkup = /*#__PURE__*/React.createElement(React.Fragment, null, iconMarkup, itemLabelMarkup, secondaryActionMarkup ? null : wrappedBadgeMarkup);
  const outerContentMarkup = /*#__PURE__*/React.createElement(React.Fragment, null, secondaryActionMarkup ? wrappedBadgeMarkup : null);
  const showExpanded = selected || expanded || childIsActive;
  const itemClassName = classNames(styles.Item, disabled && styles['Item-disabled'], (selected || childIsActive) && styles['Item-selected'], showExpanded && styles.subNavigationActive, childIsActive && styles['Item-child-active'], showVerticalLine && styles['Item-line'], matches && styles['Item-line-pointer'], showVerticalHoverPointer && styles['Item-hover-pointer']);
  let secondaryNavigationMarkup = null;
  if (subNavigationItems.length > 0) {
    const longestMatch = matchingSubNavigationItems.sort(({
      url: firstUrl
    }, {
      url: secondUrl
    }) => secondUrl.length - firstUrl.length)[0];
    secondaryNavigationMarkup = /*#__PURE__*/React.createElement(SecondaryNavigation, {
      ItemComponent: Item,
      icon: icon,
      longestMatch: longestMatch,
      subNavigationItems: subNavigationItems,
      showExpanded: showExpanded,
      truncateText: truncateText,
      secondaryNavigationId: secondaryNavigationId
    });
  }
  const className = classNames(styles.ListItem, Boolean(actions && actions.length) && styles['ListItem-hasAction']);
  const itemLinkMarkup = () => {
    const linkMarkup = /*#__PURE__*/React.createElement(UnstyledLink, Object.assign({
      url: url,
      className: itemClassName,
      external: external,
      tabIndex: tabIndex,
      "aria-disabled": disabled,
      "aria-label": accessibilityLabel,
      onClick: getClickHandler(onClick)
    }, normalizeAriaAttributes(secondaryNavigationId, subNavigationItems.length > 0, showExpanded)), itemContentMarkup);
    return isTruncated ? /*#__PURE__*/React.createElement(Tooltip, {
      hoverDelay: TOOLTIP_HOVER_DELAY,
      content: label,
      preferredPosition: "above"
    }, linkMarkup) : linkMarkup;
  };
  return /*#__PURE__*/React.createElement("li", {
    className: className,
    onMouseEnter: () => {
      onMouseEnter?.(label);
    },
    onMouseLeave: onMouseLeave
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.ItemWrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: classNames(styles.ItemInnerWrapper, selected && childIsActive && styles['ItemInnerWrapper-open'] || selected && !childIsActive && styles['ItemInnerWrapper-selected'], displayActionsOnHover && styles['ItemInnerWrapper-display-actions-on-hover'], disabled && styles.ItemInnerDisabled)
  }, displayActionsOnHover && secondaryActionMarkup && wrappedBadgeMarkup ? /*#__PURE__*/React.createElement("span", {
    className: styles.ItemWithFloatingActions
  }, itemLinkMarkup(), secondaryActionMarkup) : /*#__PURE__*/React.createElement(React.Fragment, null, itemLinkMarkup(), secondaryActionMarkup), outerContentMarkup)), secondaryNavigationMarkup);
  function getClickHandler(onClick) {
    return event => {
      const {
        currentTarget
      } = event;
      if (currentTarget.getAttribute('href') === location) {
        event.preventDefault();
      }
      if (subNavigationItems && subNavigationItems.length > 0 && isNavigationCollapsed) {
        event.preventDefault();
        onToggleExpandedState?.();
      } else if (onNavigationDismiss) {
        onNavigationDismiss();
        if (onClick && onClick !== onNavigationDismiss) {
          onClick();
        }
        return;
      }
      if (onClick) {
        onClick();
      }
    };
  }
}
function ItemSecondaryAction({
  url,
  icon,
  accessibilityLabel,
  tooltip,
  onClick,
  disabled,
  tabIndex
}) {
  const markup = url ? /*#__PURE__*/React.createElement(UnstyledLink, {
    external: true,
    url: url,
    className: styles.SecondaryAction,
    tabIndex: tabIndex,
    "aria-disabled": disabled,
    "aria-label": accessibilityLabel,
    onClick: onClick
  }, /*#__PURE__*/React.createElement(Icon, {
    source: icon
  })) : /*#__PURE__*/React.createElement(UnstyledButton, {
    className: styles.SecondaryAction,
    tabIndex: tabIndex,
    disabled: disabled,
    accessibilityLabel: accessibilityLabel,
    onClick: onClick
  }, /*#__PURE__*/React.createElement(Icon, {
    source: icon
  }));
  return tooltip ? /*#__PURE__*/React.createElement(Tooltip, tooltip, " ", markup, " ") : markup;
}
function isNavigationItemActive(navigationItem, currentPath) {
  const matchState = matchStateForItem(navigationItem, currentPath);
  const matchingSubNavigationItems = navigationItem.subNavigationItems && navigationItem.subNavigationItems.filter(item => {
    const subMatchState = matchStateForItem(item, currentPath);
    return subMatchState === MatchState.MatchForced || subMatchState === MatchState.MatchUrl || subMatchState === MatchState.MatchPaths;
  });
  const childIsActive = matchingSubNavigationItems && matchingSubNavigationItems.length > 0;
  const selected = matchState === MatchState.MatchForced || matchState === MatchState.MatchUrl || matchState === MatchState.MatchPaths;
  return selected || childIsActive;
}
function normalizePathname(pathname) {
  const barePathname = pathname.split('?')[0].split('#')[0];
  return barePathname.endsWith('/') ? barePathname : `${barePathname}/`;
}
function safeEqual(location, path) {
  return normalizePathname(location) === normalizePathname(path);
}
function safeStartsWith(location, path) {
  return normalizePathname(location).startsWith(normalizePathname(path));
}
function matchStateForItem({
  url,
  matches,
  exactMatch,
  matchPaths,
  excludePaths
}, location) {
  if (url == null) {
    return MatchState.NoMatch;
  }
  if (matches) {
    return MatchState.MatchForced;
  }
  if (matches === false || excludePaths && excludePaths.some(path => safeStartsWith(location, path))) {
    return MatchState.Excluded;
  }
  if (matchPaths && matchPaths.some(path => safeStartsWith(location, path))) {
    return MatchState.MatchPaths;
  }
  const matchesUrl = exactMatch ? safeEqual(location, url) : safeStartsWith(location, url);
  return matchesUrl ? MatchState.MatchUrl : MatchState.NoMatch;
}
function normalizeAriaAttributes(controlId, hasSubMenu, expanded) {
  return hasSubMenu ? {
    'aria-expanded': expanded,
    'aria-controls': controlId
  } : undefined;
}

export { Item, ItemSecondaryAction, MAX_SECONDARY_ACTIONS, isNavigationItemActive };
