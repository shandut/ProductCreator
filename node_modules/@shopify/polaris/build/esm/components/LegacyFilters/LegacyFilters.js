import React, { Component, createRef } from 'react';
import { SearchIcon, XSmallIcon, ChevronUpIcon, ChevronDownIcon } from '@shopify/polaris-icons';
import { classNames } from '../../utilities/css.js';
import { focusFirstFocusableNode } from '../../utilities/focus.js';
import { WithinFilterContext } from '../../utilities/within-filter-context.js';
import { Key } from '../../types.js';
import styles from './LegacyFilters.css.js';
import { ResourceListContext } from '../../utilities/resource-list/context.js';
import { Collapsible } from '../Collapsible/Collapsible.js';
import { ConnectedFilterControl } from './components/ConnectedFilterControl/ConnectedFilterControl.js';
import { TagsWrapper } from './components/TagsWrapper/TagsWrapper.js';
import { Tag } from '../Tag/Tag.js';
import { Sheet } from '../Sheet/Sheet.js';
import { useI18n } from '../../utilities/i18n/hooks.js';
import { useMediaQuery } from '../../utilities/media-query/hooks.js';
import { ScrollLock } from '../ScrollLock/ScrollLock.js';
import { Badge } from '../Badge/Badge.js';
import { Text } from '../Text/Text.js';
import { Icon } from '../Icon/Icon.js';
import { Focus } from '../Focus/Focus.js';
import { Button } from '../Button/Button.js';
import { TextField } from '../TextField/TextField.js';
import { Scrollable } from '../Scrollable/Scrollable.js';
import { KeypressListener } from '../KeypressListener/KeypressListener.js';
import { LegacyStack } from '../LegacyStack/LegacyStack.js';

var Suffix = /*#__PURE__*/function (Suffix) {
  Suffix["Filter"] = "Filter";
  Suffix["Shortcut"] = "Shortcut";
  return Suffix;
}(Suffix || {});
class LegacyFiltersInner extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      open: false,
      readyForFocus: false
    };
    this.moreFiltersButtonContainer = /*#__PURE__*/createRef();
    this.moreFiltersDoneButtonContainer = /*#__PURE__*/createRef();
    this.focusNode = /*#__PURE__*/createRef();
    this.closeFilters = () => {
      this.setState({
        open: false
      }, () => {
        if (this.moreFiltersButtonContainer.current) {
          focusFirstFocusableNode(this.moreFiltersButtonContainer.current, false);
        }
      });
    };
    this.toggleFilters = () => {
      if (this.state.open === true) {
        this.closeFilters();
      } else {
        this.openFilters();
      }
    };
    this.setReadyForFocus = newState => () => {
      this.setState({
        readyForFocus: newState
      });
    };
    this.handleClearAll = () => {
      this.props.onClearAll();
      this.moreFiltersDoneButtonContainer.current && focusFirstFocusableNode(this.moreFiltersDoneButtonContainer.current, false);
    };
  }
  render() {
    const {
      filters,
      queryValue,
      onQueryBlur,
      onQueryChange,
      onQueryFocus,
      focused,
      onClearAll,
      appliedFilters,
      onQueryClear,
      queryPlaceholder,
      children,
      disabled = false,
      helpText,
      hideTags,
      hideQueryField,
      disableQueryField = false,
      i18n,
      mediaQuery: {
        isNavigationCollapsed
      }
    } = this.props;
    const {
      resourceName
    } = this.context;
    const {
      open,
      readyForFocus
    } = this.state;
    const backdropMarkup = open ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ScrollLock, null), /*#__PURE__*/React.createElement("div", {
      className: styles.Backdrop,
      onClick: this.closeFilters
    })) : null;
    const filtersContentMarkup = filters.map((filter, index) => {
      const filterIsOpen = this.state[`${filter.key}${Suffix.Filter}`] === true;
      const icon = filterIsOpen ? ChevronUpIcon : ChevronDownIcon;
      const className = classNames(styles.FilterTriggerContainer, filterIsOpen && styles.open, index === 0 && styles.first, filters.length !== 1 && index === filters.length - 1 && styles.last);
      const appliedFilterContent = this.getAppliedFilterContent(filter.key);
      const appliedFilterBadgeMarkup = appliedFilterContent ? /*#__PURE__*/React.createElement("div", {
        className: styles.AppliedFilterBadgeContainer
      }, /*#__PURE__*/React.createElement(Badge, {
        tone: "new"
      }, appliedFilterContent)) : null;
      const collapsibleID = `${filter.key}Collapsible`;
      const buttonClassName = classNames(styles.FilterTrigger);
      return /*#__PURE__*/React.createElement("div", {
        key: filter.key,
        className: className
      }, /*#__PURE__*/React.createElement("button", {
        onClick: () => this.toggleFilter(filter.key),
        className: buttonClassName,
        id: `${filter.key}ToggleButton`,
        type: "button",
        "aria-controls": collapsibleID,
        "aria-expanded": filterIsOpen
      }, /*#__PURE__*/React.createElement("div", {
        className: styles.FilterTriggerLabelContainer
      }, /*#__PURE__*/React.createElement("h3", {
        className: styles.FilterTriggerTitle
      }, /*#__PURE__*/React.createElement(Text, {
        as: "span",
        tone: this.props.disabled || filter.disabled ? 'subdued' : undefined
      }, filter.label)), /*#__PURE__*/React.createElement("span", {
        className: styles.FilterTriggerIcon
      }, /*#__PURE__*/React.createElement(Icon, {
        source: icon,
        tone: "base"
      }))), appliedFilterBadgeMarkup), /*#__PURE__*/React.createElement(Collapsible, {
        id: collapsibleID,
        open: filterIsOpen,
        onAnimationEnd: this.setReadyForFocus(true)
      }, /*#__PURE__*/React.createElement("div", {
        className: styles.FilterNodeContainer
      }, /*#__PURE__*/React.createElement(Focus, {
        disabled: !filterIsOpen || !readyForFocus || !open,
        root: this.focusNode
      }, this.generateFilterMarkup(filter)))));
    });
    const appliedFiltersCount = appliedFilters ? appliedFilters.length : 0;
    const moreFiltersLabel = hideTags && appliedFiltersCount > 0 ? i18n.translate('Polaris.Filters.moreFiltersWithCount', {
      count: appliedFiltersCount
    }) : i18n.translate('Polaris.Filters.moreFilters');
    const rightActionMarkup = filters.length ? /*#__PURE__*/React.createElement("div", {
      ref: this.moreFiltersButtonContainer
    }, /*#__PURE__*/React.createElement(Button, {
      onClick: this.toggleFilters,
      disabled: disabled,
      size: "large"
    }, moreFiltersLabel)) : null;
    const filterResourceName = resourceName || {
      singular: i18n.translate('Polaris.ResourceList.defaultItemSingular'),
      plural: i18n.translate('Polaris.ResourceList.defaultItemPlural')
    };
    const transformedFilters = this.transformFilters(filters);
    const filtersControlMarkup = /*#__PURE__*/React.createElement(ConnectedFilterControl, {
      rightPopoverableActions: transformedFilters,
      rightAction: rightActionMarkup,
      auxiliary: children,
      disabled: disabled,
      forceShowMorefiltersButton: filters.length > transformedFilters.length,
      queryFieldHidden: hideQueryField
    }, hideQueryField ? null : /*#__PURE__*/React.createElement(TextField, {
      placeholder: queryPlaceholder || i18n.translate('Polaris.Filters.filter', {
        resourceName: filterResourceName.plural
      }),
      onChange: onQueryChange,
      onBlur: onQueryBlur,
      onFocus: onQueryFocus,
      value: queryValue,
      focused: focused,
      label: queryPlaceholder || i18n.translate('Polaris.Filters.filter', {
        resourceName: filterResourceName.plural
      }),
      labelHidden: true,
      prefix: /*#__PURE__*/React.createElement("span", {
        className: styles.SearchIcon
      }, /*#__PURE__*/React.createElement(Icon, {
        source: SearchIcon
      })),
      clearButton: true,
      onClearButtonClick: onQueryClear,
      disabled: disabled || disableQueryField,
      autoComplete: "off"
    }));
    const filtersContainerHeaderClassname = classNames(styles.LegacyFiltersContainerHeader);
    const filtersDesktopHeaderMarkup = /*#__PURE__*/React.createElement("div", {
      className: filtersContainerHeaderClassname
    }, /*#__PURE__*/React.createElement(Text, {
      variant: "headingLg",
      as: "h3"
    }, moreFiltersLabel), /*#__PURE__*/React.createElement(Button, {
      icon: XSmallIcon,
      variant: "plain",
      accessibilityLabel: i18n.translate('Polaris.Filters.cancel'),
      onClick: this.closeFilters
    }));
    const filtersMobileHeaderMarkup = /*#__PURE__*/React.createElement("div", {
      className: filtersContainerHeaderClassname
    }, /*#__PURE__*/React.createElement(Button, {
      icon: XSmallIcon,
      variant: "plain",
      accessibilityLabel: i18n.translate('Polaris.Filters.cancel'),
      onClick: this.closeFilters
    }), /*#__PURE__*/React.createElement(Text, {
      variant: "headingLg",
      as: "h3"
    }, moreFiltersLabel), /*#__PURE__*/React.createElement(Button, {
      onClick: this.closeFilters,
      variant: "primary"
    }, i18n.translate('Polaris.Filters.done')));
    const filtersDesktopFooterClassname = classNames(styles.LegacyFiltersContainerFooter);
    const filtersDesktopFooterMarkup = /*#__PURE__*/React.createElement("div", {
      className: filtersDesktopFooterClassname
    }, /*#__PURE__*/React.createElement(Button, {
      onClick: this.handleClearAll,
      disabled: !this.hasAppliedFilters()
    }, i18n.translate('Polaris.Filters.clearAllFilters')), /*#__PURE__*/React.createElement("div", {
      ref: this.moreFiltersDoneButtonContainer
    }, /*#__PURE__*/React.createElement(Button, {
      onClick: this.closeFilters,
      variant: "primary"
    }, i18n.translate('Polaris.Filters.done'))));
    const filtersMobileFooterMarkup = /*#__PURE__*/React.createElement("div", {
      className: styles.LegacyFiltersMobileContainerFooter
    }, this.hasAppliedFilters() ? /*#__PURE__*/React.createElement(Button, {
      onClick: onClearAll,
      fullWidth: true
    }, i18n.translate('Polaris.Filters.clearAllFilters')) : /*#__PURE__*/React.createElement("div", {
      className: styles.EmptyFooterState
    }, /*#__PURE__*/React.createElement(Text, {
      tone: "subdued",
      as: "span"
    }, /*#__PURE__*/React.createElement("p", null, i18n.translate('Polaris.Filters.noFiltersApplied')))));
    const shouldHideTagsContainer = !appliedFilters || appliedFilters.length < 1;
    const tagsMarkup = !hideTags ? /*#__PURE__*/React.createElement(TagsWrapper, {
      hidden: shouldHideTagsContainer
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.TagsContainer,
      "aria-live": "polite"
    }, (appliedFilters || []).map(filter => {
      return /*#__PURE__*/React.createElement(Tag, {
        key: filter.key,
        onRemove: () => {
          filter.onRemove(filter.key);
        },
        disabled: disabled
      }, filter.label);
    }))) : null;
    const filtersMobileContainerContentClassName = classNames(styles.LegacyFiltersMobileContainerContent);
    const filtersDesktopContainerContentClassName = classNames(styles.LegacyFiltersDesktopContainerContent);
    const filtersContainerMarkup = isNavigationCollapsed ? /*#__PURE__*/React.createElement(Sheet, {
      accessibilityLabel: moreFiltersLabel,
      open: open,
      onClose: this.closeFilters,
      onEntered: this.setReadyForFocus(true),
      onExit: this.setReadyForFocus(false)
    }, filtersMobileHeaderMarkup, /*#__PURE__*/React.createElement(Scrollable, {
      className: filtersMobileContainerContentClassName,
      shadow: true
    }, filtersContentMarkup, filtersMobileFooterMarkup)) : /*#__PURE__*/React.createElement(Sheet, {
      accessibilityLabel: moreFiltersLabel,
      open: open,
      onClose: this.closeFilters,
      onEntered: this.setReadyForFocus(true),
      onExit: this.setReadyForFocus(false)
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.LegacyFiltersContainer
    }, filtersDesktopHeaderMarkup, /*#__PURE__*/React.createElement(Scrollable, {
      className: filtersDesktopContainerContentClassName,
      shadow: true
    }, filtersContentMarkup), filtersDesktopFooterMarkup));
    const helpTextMarkup = helpText ? /*#__PURE__*/React.createElement("div", {
      id: "FiltersHelpText",
      className: styles.HelpText
    }, /*#__PURE__*/React.createElement(Text, {
      tone: "subdued",
      as: "span"
    }, helpText)) : null;
    return /*#__PURE__*/React.createElement(WithinFilterContext.Provider, {
      value: true
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.LegacyFilters
    }, filtersControlMarkup, filtersContainerMarkup, tagsMarkup, helpTextMarkup, backdropMarkup, /*#__PURE__*/React.createElement(KeypressListener, {
      keyCode: Key.Escape,
      handler: this.closeFilters
    })));
  }
  hasAppliedFilters() {
    const {
      appliedFilters,
      queryValue
    } = this.props;
    const filtersApplied = Boolean(appliedFilters && appliedFilters.length > 0);
    const queryApplied = Boolean(queryValue && queryValue !== '');
    return filtersApplied || queryApplied;
  }
  getAppliedFilterContent(key) {
    const {
      appliedFilters
    } = this.props;
    if (!appliedFilters) {
      return undefined;
    }
    const filter = appliedFilters.find(filter => filter.key === key);
    return filter == null ? undefined : filter.label;
  }
  getAppliedFilterRemoveHandler(key) {
    const {
      appliedFilters
    } = this.props;
    if (!appliedFilters) {
      return undefined;
    }
    const filter = appliedFilters.find(filter => filter.key === key);
    return filter == null ? undefined : filter.onRemove;
  }
  openFilters() {
    this.setState({
      open: true
    });
  }
  toggleFilter(key) {
    if (this.state[`${key}${Suffix.Filter}`] === true) {
      this.setState({
        readyForFocus: false,
        [`${key}${Suffix.Filter}`]: false
      });
    } else {
      this.setState({
        readyForFocus: false,
        [`${key}${Suffix.Filter}`]: true
      });
    }
  }
  openFilterShortcut(key) {
    this.setState({
      [`${key}${Suffix.Shortcut}`]: true
    });
  }
  closeFilterShortcut(key) {
    this.setState({
      [`${key}${Suffix.Shortcut}`]: false
    });
  }
  toggleFilterShortcut(key) {
    if (this.state[`${key}${Suffix.Shortcut}`] === true) {
      this.closeFilterShortcut(key);
    } else {
      this.openFilterShortcut(key);
    }
  }
  transformFilters(filters) {
    const transformedActions = [];
    getShortcutFilters(filters).forEach(filter => {
      const {
        key,
        label,
        disabled
      } = filter;
      transformedActions.push({
        popoverContent: this.generateFilterMarkup(filter),
        popoverOpen: Boolean(this.state[`${key}${Suffix.Shortcut}`]),
        key,
        content: label,
        disabled,
        onAction: () => this.toggleFilterShortcut(key)
      });
    });
    return transformedActions;
  }
  generateFilterMarkup(filter) {
    const i18n = this.props.i18n;
    const removeCallback = this.getAppliedFilterRemoveHandler(filter.key);
    const removeHandler = removeCallback == null ? undefined : () => {
      removeCallback(filter.key);
    };
    const clearButtonMarkup = !filter.hideClearButton && /*#__PURE__*/React.createElement(Button, {
      variant: "plain",
      disabled: removeHandler == null,
      onClick: removeHandler,
      accessibilityLabel: i18n.translate('Polaris.Filters.clearLabel', {
        filterName: filter.label
      })
    }, i18n.translate('Polaris.Filters.clear'));
    return /*#__PURE__*/React.createElement("div", {
      ref: this.focusNode
    }, /*#__PURE__*/React.createElement(LegacyStack, {
      vertical: true,
      spacing: "tight"
    }, filter.filter, clearButtonMarkup));
  }
}
LegacyFiltersInner.contextType = ResourceListContext;
function getShortcutFilters(filters) {
  return filters.filter(filter => filter.shortcut === true);
}

/**
 * @deprecated The LegacyFilters component will be removed in the next
 * major version. The Filters component can be used as a standalone
 * component, but is used primarily within the IndexFilters for sorting
 * and filtering IndexTables. See the Polaris component guide on how to
 * use IndexFilters and Filters.
 *
 * https://polaris.shopify.com/components/selection-and-input/filters
 * https://polaris.shopify.com/components/selection-and-input/index-filters
 */
function LegacyFilters(props) {
  const i18n = useI18n();
  const mediaQuery = useMediaQuery();
  return /*#__PURE__*/React.createElement(LegacyFiltersInner, Object.assign({}, props, {
    i18n: i18n,
    mediaQuery: mediaQuery
  }));
}

export { LegacyFilters };
