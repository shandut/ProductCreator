import React, { useContext, useRef, useState, useMemo } from 'react';
import { SearchIcon } from '@shopify/polaris-icons';
import { Key } from '../../types.js';
import { wrapFocusPreviousFocusableMenuItem, wrapFocusNextFocusableMenuItem } from '../../utilities/focus.js';
import { FilterActionsContext } from '../FilterActionsProvider/FilterActionsProvider.js';
import { Section } from './components/Section/Section.js';
import { KeypressListener } from '../KeypressListener/KeypressListener.js';
import { TextField } from '../TextField/TextField.js';
import { useI18n } from '../../utilities/i18n/hooks.js';
import { Box } from '../Box/Box.js';
import { Icon } from '../Icon/Icon.js';
import { Item } from './components/Item/Item.js';

const FILTER_ACTIONS_THRESHOLD = 8;
function ActionList({
  items,
  sections = [],
  actionRole,
  allowFiltering,
  onActionAnyItem,
  filterLabel
}) {
  const i18n = useI18n();
  const filterActions = useContext(FilterActionsContext);
  let finalSections = [];
  const actionListRef = useRef(null);
  const [searchText, setSearchText] = useState('');
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
    return section.items.length > 0 ? /*#__PURE__*/React.createElement(Section, {
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
        wrapFocusPreviousFocusableMenuItem(actionListRef.current, evt.target);
      }
    }
  };
  const handleFocusNextItem = evt => {
    evt.preventDefault();
    if (actionListRef.current && evt.target) {
      if (actionListRef.current.contains(evt.target)) {
        wrapFocusNextFocusableMenuItem(actionListRef.current, evt.target);
      }
    }
  };
  const listeners = actionRole === 'menuitem' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(KeypressListener, {
    keyEvent: "keydown",
    keyCode: Key.DownArrow,
    handler: handleFocusNextItem
  }), /*#__PURE__*/React.createElement(KeypressListener, {
    keyEvent: "keydown",
    keyCode: Key.UpArrow,
    handler: handleFocusPreviousItem
  })) : null;
  const totalFilteredActions = useMemo(() => {
    const totalSectionItems = filteredSections?.reduce((acc, section) => acc + section.items.length, 0) || 0;
    return totalSectionItems;
  }, [filteredSections]);
  const totalActions = finalSections?.reduce((acc, section) => acc + section.items.length, 0) || 0;
  const hasManyActions = totalActions >= FILTER_ACTIONS_THRESHOLD;
  return /*#__PURE__*/React.createElement(React.Fragment, null, (allowFiltering || filterActions) && hasManyActions && isFilterable && /*#__PURE__*/React.createElement(Box, {
    padding: "200",
    paddingBlockEnd: totalFilteredActions > 0 ? '0' : '200'
  }, /*#__PURE__*/React.createElement(TextField, {
    clearButton: true,
    labelHidden: true,
    label: filterLabel ? filterLabel : i18n.translate('Polaris.ActionList.SearchField.placeholder'),
    placeholder: filterLabel ? filterLabel : i18n.translate('Polaris.ActionList.SearchField.placeholder'),
    autoComplete: "off",
    value: searchText,
    onChange: value => setSearchText(value),
    prefix: /*#__PURE__*/React.createElement(Icon, {
      source: SearchIcon
    }),
    onClearButtonClick: () => setSearchText('')
  })), /*#__PURE__*/React.createElement(Box, {
    as: hasMultipleSections ? 'ul' : 'div',
    ref: actionListRef,
    role: elementRole,
    tabIndex: elementTabIndex
  }, listeners, sectionMarkup));
}
ActionList.Item = Item;

export { ActionList };
