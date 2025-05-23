'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var types = require('../../types.js');
var focus = require('../../utilities/focus.js');
var FilterActionsProvider = require('../FilterActionsProvider/FilterActionsProvider.js');
var Section = require('./components/Section/Section.js');
var KeypressListener = require('../KeypressListener/KeypressListener.js');
var TextField = require('../TextField/TextField.js');
var hooks = require('../../utilities/i18n/hooks.js');
var Box = require('../Box/Box.js');
var Icon = require('../Icon/Icon.js');
var Item = require('./components/Item/Item.js');

const FILTER_ACTIONS_THRESHOLD = 8;
function ActionList({
  items,
  sections = [],
  actionRole,
  allowFiltering,
  onActionAnyItem,
  filterLabel
}) {
  const i18n = hooks.useI18n();
  const filterActions = React.useContext(FilterActionsProvider.FilterActionsContext);
  let finalSections = [];
  const actionListRef = React.useRef(null);
  const [searchText, setSearchText] = React.useState('');
  if (items) {
    finalSections = [{
      items
    }, ...sections];
  } else if (sections) {
    finalSections = sections;
  }
  const isFilterable = finalSections?.some(section => section.items.some(item => typeof item.content === 'string'));
  const hasMultipleSections = finalSections.length > 1;
  const elementRole = hasMultipleSections && actionRole === 'menuitem' ? 'menu' : undefined;
  const elementTabIndex = hasMultipleSections && actionRole === 'menuitem' ? -1 : undefined;
  const filteredSections = finalSections?.map(section => ({
    ...section,
    items: section.items.filter(({
      content
    }) => typeof content === 'string' ? content?.toLowerCase().includes(searchText.toLowerCase()) : content)
  }));
  const sectionMarkup = filteredSections.map((section, index) => {
    return section.items.length > 0 ? /*#__PURE__*/React.createElement(Section.Section, {
      key: typeof section.title === 'string' ? section.title : index,
      section: section,
      hasMultipleSections: hasMultipleSections,
      actionRole: actionRole,
      onActionAnyItem: onActionAnyItem,
      isFirst: index === 0
    }) : null;
  });
  const handleFocusPreviousItem = evt => {
    evt.preventDefault();
    if (actionListRef.current && evt.target) {
      if (actionListRef.current.contains(evt.target)) {
        focus.wrapFocusPreviousFocusableMenuItem(actionListRef.current, evt.target);
      }
    }
  };
  const handleFocusNextItem = evt => {
    evt.preventDefault();
    if (actionListRef.current && evt.target) {
      if (actionListRef.current.contains(evt.target)) {
        focus.wrapFocusNextFocusableMenuItem(actionListRef.current, evt.target);
      }
    }
  };
  const listeners = actionRole === 'menuitem' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(KeypressListener.KeypressListener, {
    keyEvent: "keydown",
    keyCode: types.Key.DownArrow,
    handler: handleFocusNextItem
  }), /*#__PURE__*/React.createElement(KeypressListener.KeypressListener, {
    keyEvent: "keydown",
    keyCode: types.Key.UpArrow,
    handler: handleFocusPreviousItem
  })) : null;
  const totalFilteredActions = React.useMemo(() => {
    const totalSectionItems = filteredSections?.reduce((acc, section) => acc + section.items.length, 0) || 0;
    return totalSectionItems;
  }, [filteredSections]);
  const totalActions = finalSections?.reduce((acc, section) => acc + section.items.length, 0) || 0;
  const hasManyActions = totalActions >= FILTER_ACTIONS_THRESHOLD;
  return /*#__PURE__*/React.createElement(React.Fragment, null, (allowFiltering || filterActions) && hasManyActions && isFilterable && /*#__PURE__*/React.createElement(Box.Box, {
    padding: "200",
    paddingBlockEnd: totalFilteredActions > 0 ? '0' : '200'
  }, /*#__PURE__*/React.createElement(TextField.TextField, {
    clearButton: true,
    labelHidden: true,
    label: filterLabel ? filterLabel : i18n.translate('Polaris.ActionList.SearchField.placeholder'),
    placeholder: filterLabel ? filterLabel : i18n.translate('Polaris.ActionList.SearchField.placeholder'),
    autoComplete: "off",
    value: searchText,
    onChange: value => setSearchText(value),
    prefix: /*#__PURE__*/React.createElement(Icon.Icon, {
      source: polarisIcons.SearchIcon
    }),
    onClearButtonClick: () => setSearchText('')
  })), /*#__PURE__*/React.createElement(Box.Box, {
    as: hasMultipleSections ? 'ul' : 'div',
    ref: actionListRef,
    role: elementRole,
    tabIndex: elementTabIndex
  }, listeners, sectionMarkup));
}
ActionList.Item = Item.Item;

exports.ActionList = ActionList;
