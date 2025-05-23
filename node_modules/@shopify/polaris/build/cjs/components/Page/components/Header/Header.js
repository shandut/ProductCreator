'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var components = require('../../../../utilities/components.js');
var isInterface = require('../../../../utilities/is-interface.js');
var isReactElement = require('../../../../utilities/is-react-element.js');
var Header_module = require('./Header.css.js');
var Breadcrumbs = require('../../../Breadcrumbs/Breadcrumbs.js');
var Title = require('./components/Title/Title.js');
var ActionMenu = require('../../../ActionMenu/ActionMenu.js');
var FilterActionsProvider = require('../../../FilterActionsProvider/FilterActionsProvider.js');
var hooks = require('../../../../utilities/i18n/hooks.js');
var hooks$1 = require('../../../../utilities/media-query/hooks.js');
var Box = require('../../../Box/Box.js');
var Pagination = require('../../../Pagination/Pagination.js');
var Text = require('../../../Text/Text.js');
var InlineStack = require('../../../InlineStack/InlineStack.js');
var utils = require('../../../Button/utils.js');
var Tooltip = require('../../../Tooltip/Tooltip.js');

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
  const i18n = hooks.useI18n();
  const {
    isNavigationCollapsed
  } = hooks$1.useMediaQuery();
  const isSingleRow = !primaryAction && !pagination && (isInterface.isInterface(secondaryActions) && !secondaryActions.length || isReactElement.isReactElement(secondaryActions)) && !actionGroups.length;
  const hasActionGroupsOrSecondaryActions = actionGroups.length > 0 || isInterface.isInterface(secondaryActions) && secondaryActions.length > 0 || isReactElement.isReactElement(secondaryActions);
  const breadcrumbMarkup = backAction ? /*#__PURE__*/React.createElement("div", {
    className: Header_module.default.BreadcrumbWrapper
  }, /*#__PURE__*/React.createElement(Box.Box, {
    maxWidth: "100%",
    paddingInlineEnd: "100",
    printHidden: true
  }, /*#__PURE__*/React.createElement(Breadcrumbs.Breadcrumbs, {
    backAction: backAction
  }))) : null;
  const paginationMarkup = pagination && !isNavigationCollapsed ? /*#__PURE__*/React.createElement("div", {
    className: Header_module.default.PaginationWrapper
  }, /*#__PURE__*/React.createElement(Box.Box, {
    printHidden: true
  }, /*#__PURE__*/React.createElement(Pagination.Pagination, Object.assign({}, pagination, {
    hasPrevious: pagination.hasPrevious,
    hasNext: pagination.hasNext
  })))) : null;
  const pageTitleMarkup = /*#__PURE__*/React.createElement("div", {
    className: css.classNames(Header_module.default.TitleWrapper, !hasActionGroupsOrSecondaryActions && Header_module.default.TitleWrapperExpand)
  }, /*#__PURE__*/React.createElement(Title.Title, {
    title: title,
    subtitle: subtitle,
    titleMetadata: titleMetadata,
    compactTitle: compactTitle,
    hasSubtitleMaxWidth: hasActionGroupsOrSecondaryActions
  }));
  const labelForPageReadyAccessibilityLabel = pageReadyAccessibilityLabel || title;
  const pageReadyAccessibilityLabelMarkup = labelForPageReadyAccessibilityLabel ? /*#__PURE__*/React.createElement("div", {
    role: "status"
  }, /*#__PURE__*/React.createElement(Text.Text, {
    visuallyHidden: true,
    as: "p"
  }, i18n.translate('Polaris.Page.Header.pageReadyAccessibilityLabel', {
    title: labelForPageReadyAccessibilityLabel
  }))) : undefined;
  const primaryActionMarkup = primaryAction ? /*#__PURE__*/React.createElement(PrimaryActionMarkup, {
    primaryAction: primaryAction
  }) : null;
  let actionMenuMarkup = null;
  if (isInterface.isInterface(secondaryActions) && (secondaryActions.length > 0 || ActionMenu.hasGroupsWithActions(actionGroups))) {
    actionMenuMarkup = /*#__PURE__*/React.createElement(ActionMenu.ActionMenu, {
      actions: secondaryActions,
      groups: actionGroups,
      rollup: isNavigationCollapsed,
      rollupActionsLabel: title ? i18n.translate('Polaris.Page.Header.rollupActionsLabel', {
        title
      }) : undefined,
      onActionRollup: onActionRollup
    });
  } else if (isReactElement.isReactElement(secondaryActions)) {
    actionMenuMarkup = /*#__PURE__*/React.createElement(React.Fragment, null, secondaryActions);
  }
  const navigationMarkup = breadcrumbMarkup || paginationMarkup ? /*#__PURE__*/React.createElement(Box.Box, {
    printHidden: true,
    paddingBlockEnd: "100",
    paddingInlineEnd: actionMenuMarkup && isNavigationCollapsed ? '1000' : undefined
  }, /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    gap: "400",
    align: "space-between",
    blockAlign: "center"
  }, breadcrumbMarkup, paginationMarkup)) : null;
  const additionalMetadataMarkup = additionalMetadata ? /*#__PURE__*/React.createElement("div", {
    className: Header_module.default.AdditionalMetaData
  }, /*#__PURE__*/React.createElement(Text.Text, {
    tone: "subdued",
    as: "span",
    variant: "bodySm"
  }, additionalMetadata)) : null;
  const headerClassNames = css.classNames(isSingleRow && Header_module.default.isSingleRow, navigationMarkup && Header_module.default.hasNavigation, actionMenuMarkup && Header_module.default.hasActionMenu, isNavigationCollapsed && Header_module.default.mobileView, !backAction && Header_module.default.noBreadcrumbs, title && title.length < LONG_TITLE && Header_module.default.mediumTitle, title && title.length > LONG_TITLE && Header_module.default.longTitle);
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
  return /*#__PURE__*/React.createElement(Box.Box, {
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
  }, /*#__PURE__*/React.createElement(FilterActionsProvider.FilterActionsProvider, {
    filterActions: Boolean(filterActions)
  }, /*#__PURE__*/React.createElement(components.ConditionalRender, {
    condition: [slot1, slot2, slot3, slot4].some(notNull)
  }, /*#__PURE__*/React.createElement("div", {
    className: Header_module.default.Row
  }, slot1, slot2, /*#__PURE__*/React.createElement(components.ConditionalRender, {
    condition: [slot3, slot4].some(notNull)
  }, /*#__PURE__*/React.createElement("div", {
    className: Header_module.default.RightAlign
  }, /*#__PURE__*/React.createElement(components.ConditionalWrapper, {
    condition: [slot3, slot4].every(notNull),
    wrapper: children => /*#__PURE__*/React.createElement("div", {
      className: Header_module.default.Actions
    }, children)
  }, slot3, slot4))))), /*#__PURE__*/React.createElement(components.ConditionalRender, {
    condition: [slot5].some(notNull)
  }, /*#__PURE__*/React.createElement("div", {
    className: Header_module.default.Row
  }, /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    gap: "400"
  }, slot5))))));
}
function PrimaryActionMarkup({
  primaryAction
}) {
  const {
    isNavigationCollapsed
  } = hooks$1.useMediaQuery();
  let actionMarkup;
  if (isInterface.isInterface(primaryAction)) {
    const {
      primary: isPrimary,
      helpText
    } = primaryAction;
    const primary = isPrimary === undefined ? true : isPrimary;
    const content = utils.buttonFrom(shouldShowIconOnly(isNavigationCollapsed, primaryAction), {
      variant: primary ? 'primary' : undefined
    });
    actionMarkup = helpText ? /*#__PURE__*/React.createElement(Tooltip.Tooltip, {
      content: helpText
    }, content) : content;
  } else {
    actionMarkup = primaryAction;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: Header_module.default.PrimaryActionWrapper
  }, /*#__PURE__*/React.createElement(Box.Box, {
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

exports.Header = Header;
