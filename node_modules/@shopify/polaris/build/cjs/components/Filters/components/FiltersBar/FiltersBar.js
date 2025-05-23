'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var useOnValueChange = require('../../../../utilities/use-on-value-change.js');
var css = require('../../../../utilities/css.js');
var Filters_module = require('../../Filters.css.js');
var FilterPill = require('../FilterPill/FilterPill.js');
var hooks = require('../../../../utilities/i18n/hooks.js');
var UnstyledButton = require('../../../UnstyledButton/UnstyledButton.js');
var Text = require('../../../Text/Text.js');
var Popover = require('../../../Popover/Popover.js');
var ActionList = require('../../../ActionList/ActionList.js');
var Button = require('../../../Button/Button.js');
var Box = require('../../../Box/Box.js');
var InlineStack = require('../../../InlineStack/InlineStack.js');

function FiltersBar({
  filters,
  appliedFilters,
  onClearAll,
  disabled,
  hideQueryField,
  disableFilters,
  mountedStateStyles,
  onAddFilterClick,
  closeOnChildOverlayClick,
  children
}) {
  const i18n = hooks.useI18n();
  const [popoverActive, setPopoverActive] = React.useState(false);
  const hasMounted = React.useRef(false);
  React.useEffect(() => {
    hasMounted.current = true;
  });
  const togglePopoverActive = () => setPopoverActive(popoverActive => !popoverActive);
  const handleAddFilterClick = () => {
    onAddFilterClick?.();
    togglePopoverActive();
  };
  const appliedFilterKeys = appliedFilters?.map(({
    key
  }) => key);
  const pinnedFromPropsKeys = filters.filter(({
    pinned
  }) => pinned).map(({
    key
  }) => key);
  const pinnedFiltersFromPropsAndAppliedFilters = filters.filter(({
    pinned,
    key
  }) => {
    const isPinnedOrApplied = Boolean(pinned) || appliedFilterKeys?.includes(key);
    return isPinnedOrApplied;
  });
  const [localPinnedFilters, setLocalPinnedFilters] = React.useState(pinnedFiltersFromPropsAndAppliedFilters.map(({
    key
  }) => key));
  useOnValueChange.useOnValueChange(filters.length, () => {
    setLocalPinnedFilters(pinnedFiltersFromPropsAndAppliedFilters.map(({
      key
    }) => key));
  });
  const pinnedFilters = localPinnedFilters.map(key => filters.find(filter => filter.key === key)).reduce((acc, filter) => filter ? [...acc, filter] : acc, []);
  const onFilterClick = ({
    key,
    onAction
  }) => () => {
    // PopoverOverlay will cause a rerender of the component and nuke the
    // popoverActive state, so we set this as a microtask
    setTimeout(() => {
      setLocalPinnedFilters(currentLocalPinnedFilters => [...new Set([...currentLocalPinnedFilters, key])]);
      onAction?.();
      togglePopoverActive();
    }, 0);
  };
  const filterToActionItem = filter => ({
    ...filter,
    content: filter.label,
    onAction: onFilterClick(filter)
  });
  const unpinnedFilters = filters.filter(filter => !pinnedFilters.some(({
    key
  }) => key === filter.key));
  const unsectionedFilters = unpinnedFilters.filter(filter => !filter.section && !filter.hidden).map(filterToActionItem);
  const sectionedFilters = unpinnedFilters.filter(filter => filter.section).reduce((acc, filter) => {
    const filterActionItem = filterToActionItem(filter);
    const sectionIndex = acc.findIndex(section => section.title === filter.section);
    if (sectionIndex === -1) {
      acc.push({
        title: filter.section,
        items: [filterActionItem]
      });
    } else {
      acc[sectionIndex].items.push(filterActionItem);
    }
    return acc;
  }, []);
  const hasOneOrMorePinnedFilters = pinnedFilters.length >= 1;
  const addFilterActivator = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(UnstyledButton.UnstyledButton, {
    type: "button",
    className: Filters_module.default.AddFilter,
    onClick: handleAddFilterClick,
    "aria-label": i18n.translate('Polaris.Filters.addFilter'),
    disabled: disabled || unsectionedFilters.length === 0 && sectionedFilters.length === 0 || disableFilters
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "bodySm",
    tone: disabled ? 'disabled' : 'base'
  }, i18n.translate('Polaris.Filters.addFilter'), ' '), /*#__PURE__*/React.createElement(polarisIcons.PlusIcon, null)));
  const handleClearAllFilters = () => {
    setLocalPinnedFilters(pinnedFromPropsKeys);
    onClearAll?.();
  };
  const shouldShowAddButton = filters.some(filter => !filter.pinned) || filters.length !== localPinnedFilters.length;
  const pinnedFiltersMarkup = pinnedFilters.map(({
    key: filterKey,
    ...pinnedFilter
  }) => {
    const appliedFilter = appliedFilters?.find(({
      key
    }) => key === filterKey);
    const handleFilterPillRemove = () => {
      setLocalPinnedFilters(currentLocalPinnedFilters => currentLocalPinnedFilters.filter(key => {
        const isMatchedFilters = key === filterKey;
        const isPinnedFilterFromProps = pinnedFromPropsKeys.includes(key);
        return !isMatchedFilters || isPinnedFilterFromProps;
      }));
      appliedFilter?.onRemove(filterKey);
    };
    return /*#__PURE__*/React.createElement(FilterPill.FilterPill, Object.assign({
      key: filterKey
    }, pinnedFilter, {
      initialActive: hasMounted.current && !pinnedFilter.pinned && !appliedFilter,
      unsavedChanges: appliedFilter?.unsavedChanges,
      label: appliedFilter?.label || pinnedFilter.label,
      filterKey: filterKey,
      selected: appliedFilterKeys?.includes(filterKey),
      onRemove: handleFilterPillRemove,
      disabled: pinnedFilter.disabled || disableFilters,
      closeOnChildOverlayClick: closeOnChildOverlayClick
    }));
  });
  const addButton = shouldShowAddButton ? /*#__PURE__*/React.createElement("div", {
    className: css.classNames(Filters_module.default.AddFilterActivator, hasOneOrMorePinnedFilters && Filters_module.default.AddFilterActivatorMultiple)
  }, /*#__PURE__*/React.createElement(Popover.Popover, {
    active: popoverActive && !disabled,
    activator: addFilterActivator,
    onClose: togglePopoverActive
  }, /*#__PURE__*/React.createElement(ActionList.ActionList, {
    actionRole: "menuitem",
    items: unsectionedFilters,
    sections: sectionedFilters
  }))) : null;
  const clearAllMarkup = appliedFilters?.length ? /*#__PURE__*/React.createElement("div", {
    className: css.classNames(Filters_module.default.ClearAll, hasOneOrMorePinnedFilters && shouldShowAddButton && Filters_module.default.MultiplePinnedFilterClearAll)
  }, /*#__PURE__*/React.createElement(Button.Button, {
    size: "micro",
    onClick: handleClearAllFilters,
    variant: "monochromePlain"
  }, i18n.translate('Polaris.Filters.clearFilters'))) : null;
  return /*#__PURE__*/React.createElement("div", {
    className: css.classNames(Filters_module.default.FiltersWrapper, shouldShowAddButton && hasOneOrMorePinnedFilters && Filters_module.default.FiltersWrapperWithAddButton),
    "aria-live": "polite",
    style: mountedStateStyles
  }, /*#__PURE__*/React.createElement("div", {
    className: css.classNames(Filters_module.default.FiltersInner)
  }, /*#__PURE__*/React.createElement("div", {
    className: css.classNames(Filters_module.default.FiltersStickyArea)
  }, pinnedFiltersMarkup, addButton, clearAllMarkup)), hideQueryField ? /*#__PURE__*/React.createElement(Box.Box, {
    paddingInlineEnd: "300",
    paddingBlockStart: "200",
    paddingBlockEnd: "200"
  }, /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    align: "start",
    blockAlign: "center",
    gap: {
      xs: '400',
      md: '300'
    }
  }, children)) : null);
}

exports.FiltersBar = FiltersBar;
