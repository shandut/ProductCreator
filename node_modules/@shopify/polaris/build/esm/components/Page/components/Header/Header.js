import React from 'react';
import { classNames } from '../../../../utilities/css.js';
import { ConditionalRender, ConditionalWrapper } from '../../../../utilities/components.js';
import { isInterface } from '../../../../utilities/is-interface.js';
import { isReactElement } from '../../../../utilities/is-react-element.js';
import styles from './Header.css.js';
import { Breadcrumbs } from '../../../Breadcrumbs/Breadcrumbs.js';
import { Title } from './components/Title/Title.js';
import { hasGroupsWithActions, ActionMenu } from '../../../ActionMenu/ActionMenu.js';
import { FilterActionsProvider } from '../../../FilterActionsProvider/FilterActionsProvider.js';
import { useI18n } from '../../../../utilities/i18n/hooks.js';
import { useMediaQuery } from '../../../../utilities/media-query/hooks.js';
import { Box } from '../../../Box/Box.js';
import { Pagination } from '../../../Pagination/Pagination.js';
import { Text } from '../../../Text/Text.js';
import { InlineStack } from '../../../InlineStack/InlineStack.js';
import { buttonFrom } from '../../../Button/utils.js';
import { Tooltip } from '../../../Tooltip/Tooltip.js';

const SHORT_TITLE = 20;
const REALLY_SHORT_TITLE = 8;
const LONG_TITLE = 34;
function Header({
  title,
  subtitle,
  pageReadyAccessibilityLabel,
  titleMetadata,
  additionalMetadata,
  titleHidden = false,
  primaryAction,
  pagination,
  filterActions,
  backAction,
  secondaryActions = [],
  actionGroups = [],
  compactTitle = false,
  onActionRollup
}) {
  const i18n = useI18n();
  const {
    isNavigationCollapsed
  } = useMediaQuery();
  const isSingleRow = !primaryAction && !pagination && (isInterface(secondaryActions) && !secondaryActions.length || isReactElement(secondaryActions)) && !actionGroups.length;
  const hasActionGroupsOrSecondaryActions = actionGroups.length > 0 || isInterface(secondaryActions) && secondaryActions.length > 0 || isReactElement(secondaryActions);
  const breadcrumbMarkup = backAction ? /*#__PURE__*/React.createElement("div", {
    className: styles.BreadcrumbWrapper
  }, /*#__PURE__*/React.createElement(Box, {
    maxWidth: "100%",
    paddingInlineEnd: "100",
    printHidden: true
  }, /*#__PURE__*/React.createElement(Breadcrumbs, {
    backAction: backAction
  }))) : null;
  const paginationMarkup = pagination && !isNavigationCollapsed ? /*#__PURE__*/React.createElement("div", {
    className: styles.PaginationWrapper
  }, /*#__PURE__*/React.createElement(Box, {
    printHidden: true
  }, /*#__PURE__*/React.createElement(Pagination, Object.assign({}, pagination, {
    hasPrevious: pagination.hasPrevious,
    hasNext: pagination.hasNext
  })))) : null;
  const pageTitleMarkup = /*#__PURE__*/React.createElement("div", {
    className: classNames(styles.TitleWrapper, !hasActionGroupsOrSecondaryActions && styles.TitleWrapperExpand)
  }, /*#__PURE__*/React.createElement(Title, {
    title: title,
    subtitle: subtitle,
    titleMetadata: titleMetadata,
    compactTitle: compactTitle,
    hasSubtitleMaxWidth: hasActionGroupsOrSecondaryActions
  }));
  const labelForPageReadyAccessibilityLabel = pageReadyAccessibilityLabel || title;
  const pageReadyAccessibilityLabelMarkup = labelForPageReadyAccessibilityLabel ? /*#__PURE__*/React.createElement("div", {
    role: "status"
  }, /*#__PURE__*/React.createElement(Text, {
    visuallyHidden: true,
    as: "p"
  }, i18n.translate('Polaris.Page.Header.pageReadyAccessibilityLabel', {
    title: labelForPageReadyAccessibilityLabel
  }))) : undefined;
  const primaryActionMarkup = primaryAction ? /*#__PURE__*/React.createElement(PrimaryActionMarkup, {
    primaryAction: primaryAction
  }) : null;
  let actionMenuMarkup = null;
  if (isInterface(secondaryActions) && (secondaryActions.length > 0 || hasGroupsWithActions(actionGroups))) {
    actionMenuMarkup = /*#__PURE__*/React.createElement(ActionMenu, {
      actions: secondaryActions,
      groups: actionGroups,
      rollup: isNavigationCollapsed,
      rollupActionsLabel: title ? i18n.translate('Polaris.Page.Header.rollupActionsLabel', {
        title
      }) : undefined,
      onActionRollup: onActionRollup
    });
  } else if (isReactElement(secondaryActions)) {
    actionMenuMarkup = /*#__PURE__*/React.createElement(React.Fragment, null, secondaryActions);
  }
  const navigationMarkup = breadcrumbMarkup || paginationMarkup ? /*#__PURE__*/React.createElement(Box, {
    printHidden: true,
    paddingBlockEnd: "100",
    paddingInlineEnd: actionMenuMarkup && isNavigationCollapsed ? '1000' : undefined
  }, /*#__PURE__*/React.createElement(InlineStack, {
    gap: "400",
    align: "space-between",
    blockAlign: "center"
  }, breadcrumbMarkup, paginationMarkup)) : null;
  const additionalMetadataMarkup = additionalMetadata ? /*#__PURE__*/React.createElement("div", {
    className: styles.AdditionalMetaData
  }, /*#__PURE__*/React.createElement(Text, {
    tone: "subdued",
    as: "span",
    variant: "bodySm"
  }, additionalMetadata)) : null;
  const headerClassNames = classNames(isSingleRow && styles.isSingleRow, navigationMarkup && styles.hasNavigation, actionMenuMarkup && styles.hasActionMenu, isNavigationCollapsed && styles.mobileView, !backAction && styles.noBreadcrumbs, title && title.length < LONG_TITLE && styles.mediumTitle, title && title.length > LONG_TITLE && styles.longTitle);
  const {
    slot1,
    slot2,
    slot3,
    slot4,
    slot5
  } = determineLayout({
    actionMenuMarkup,
    additionalMetadataMarkup,
    breadcrumbMarkup,
    isNavigationCollapsed,
    pageTitleMarkup,
    paginationMarkup,
    primaryActionMarkup,
    title
  });
  return /*#__PURE__*/React.createElement(Box, {
    position: "relative",
    paddingBlockStart: {
      xs: '400',
      md: '600'
    },
    paddingBlockEnd: {
      xs: '400',
      md: '600'
    },
    paddingInlineStart: {
      xs: '400',
      sm: '0'
    },
    paddingInlineEnd: {
      xs: '400',
      sm: '0'
    },
    visuallyHidden: titleHidden
  }, pageReadyAccessibilityLabelMarkup, /*#__PURE__*/React.createElement("div", {
    className: headerClassNames
  }, /*#__PURE__*/React.createElement(FilterActionsProvider, {
    filterActions: Boolean(filterActions)
  }, /*#__PURE__*/React.createElement(ConditionalRender, {
    condition: [slot1, slot2, slot3, slot4].some(notNull)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.Row
  }, slot1, slot2, /*#__PURE__*/React.createElement(ConditionalRender, {
    condition: [slot3, slot4].some(notNull)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.RightAlign
  }, /*#__PURE__*/React.createElement(ConditionalWrapper, {
    condition: [slot3, slot4].every(notNull),
    wrapper: children => /*#__PURE__*/React.createElement("div", {
      className: styles.Actions
    }, children)
  }, slot3, slot4))))), /*#__PURE__*/React.createElement(ConditionalRender, {
    condition: [slot5].some(notNull)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.Row
  }, /*#__PURE__*/React.createElement(InlineStack, {
    gap: "400"
  }, slot5))))));
}
function PrimaryActionMarkup({
  primaryAction
}) {
  const {
    isNavigationCollapsed
  } = useMediaQuery();
  let actionMarkup;
  if (isInterface(primaryAction)) {
    const {
      primary: isPrimary,
      helpText
    } = primaryAction;
    const primary = isPrimary === undefined ? true : isPrimary;
    const content = buttonFrom(shouldShowIconOnly(isNavigationCollapsed, primaryAction), {
      variant: primary ? 'primary' : undefined
    });
    actionMarkup = helpText ? /*#__PURE__*/React.createElement(Tooltip, {
      content: helpText
    }, content) : content;
  } else {
    actionMarkup = primaryAction;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: styles.PrimaryActionWrapper
  }, /*#__PURE__*/React.createElement(Box, {
    printHidden: true
  }, actionMarkup));
}
function shouldShowIconOnly(isMobile, action) {
  let {
    content,
    accessibilityLabel
  } = action;
  const {
    icon
  } = action;
  if (icon == null) return {
    ...action,
    icon: undefined
  };
  if (isMobile) {
    accessibilityLabel = accessibilityLabel || content;
    content = undefined;
  }
  return {
    ...action,
    content,
    accessibilityLabel,
    icon
  };
}
function notNull(value) {
  return value != null;
}
function determineLayout({
  actionMenuMarkup,
  additionalMetadataMarkup,
  breadcrumbMarkup,
  isNavigationCollapsed,
  pageTitleMarkup,
  paginationMarkup,
  primaryActionMarkup,
  title
}) {
  //    Header Layout
  // |----------------------------------------------------|
  // | slot1 | slot2 |                    | slot3 | slot4 |
  // |----------------------------------------------------|
  // | slot5 |                                            |
  // |----------------------------------------------------|
  //
  const layouts = {
    mobileCompact: {
      slots: {
        slot1: null,
        slot2: pageTitleMarkup,
        slot3: actionMenuMarkup,
        slot4: primaryActionMarkup,
        slot5: additionalMetadataMarkup
      },
      condition: isNavigationCollapsed && breadcrumbMarkup == null && title != null && title.length <= REALLY_SHORT_TITLE
    },
    mobileDefault: {
      slots: {
        slot1: breadcrumbMarkup,
        slot2: pageTitleMarkup,
        slot3: actionMenuMarkup,
        slot4: primaryActionMarkup,
        slot5: additionalMetadataMarkup
      },
      condition: isNavigationCollapsed
    },
    desktopCompact: {
      slots: {
        slot1: breadcrumbMarkup,
        slot2: pageTitleMarkup,
        slot3: actionMenuMarkup,
        slot4: primaryActionMarkup,
        slot5: additionalMetadataMarkup
      },
      condition: !isNavigationCollapsed && paginationMarkup == null && actionMenuMarkup == null && title != null && title.length <= SHORT_TITLE
    },
    desktopDefault: {
      slots: {
        slot1: breadcrumbMarkup,
        slot2: pageTitleMarkup,
        slot3: /*#__PURE__*/React.createElement(React.Fragment, null, actionMenuMarkup, primaryActionMarkup),
        slot4: paginationMarkup,
        slot5: additionalMetadataMarkup
      },
      condition: !isNavigationCollapsed
    }
  };
  const layout = Object.values(layouts).find(layout => layout.condition) || layouts.desktopDefault;
  return layout.slots;
}

export { Header };
