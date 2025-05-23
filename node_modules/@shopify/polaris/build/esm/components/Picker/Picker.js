import React, { useState, useRef, useCallback, useMemo, isValidElement, createRef } from 'react';
import { SearchIcon } from '@shopify/polaris-icons';
import { escapeRegex } from '../../utilities/string.js';
import { Activator } from './components/Activator/Activator.js';
import { SearchField } from './components/SearchField/SearchField.js';
import { Popover } from '../Popover/Popover.js';
import { Box } from '../Box/Box.js';
import { ComboboxTextFieldContext, ComboboxListboxContext, ComboboxListboxOptionContext } from '../../utilities/combobox/context.js';
import { Icon } from '../Icon/Icon.js';
import { Listbox } from '../Listbox/Listbox.js';

const FILTER_REGEX = value => new RegExp(value, 'i');
const QUERY_REGEX = value => new RegExp(`^${escapeRegex(value)}$`, 'i');
function Picker({
  activator,
  allowMultiple,
  searchField,
  options = [],
  willLoadMoreOptions,
  height,
  addAction,
  onScrolledToBottom,
  onClose,
  ...listboxProps
}) {
  const activatorRef = /*#__PURE__*/createRef();
  const [activeItems, setActiveItems] = useState([]);
  const [popoverActive, setPopoverActive] = useState(false);
  const [activeOptionId, setActiveOptionId] = useState();
  const [textFieldLabelId, setTextFieldLabelId] = useState();
  const [listboxId, setListboxId] = useState();
  const [query, setQuery] = useState('');
  const filteredOptions = useRef(options);
  const shouldOpen = !popoverActive;
  const handleClose = useCallback(() => {
    setPopoverActive(false);
    onClose?.();
    activatorRef.current?.focus();
  }, [activatorRef, onClose]);
  const handleOpen = useCallback(() => {
    setPopoverActive(true);
    filteredOptions.current = options;
  }, [options]);
  const handleFocus = useCallback(() => {
    if (shouldOpen) handleOpen();
  }, [shouldOpen, handleOpen]);
  const handleChange = useCallback(() => {
    if (shouldOpen) handleOpen();
  }, [shouldOpen, handleOpen]);
  const handleBlur = useCallback(() => {
    if (popoverActive) {
      handleClose();
      setQuery('');
    }
  }, [popoverActive, handleClose]);
  const textFieldContextValue = useMemo(() => ({
    activeOptionId,
    expanded: popoverActive,
    listboxId,
    setTextFieldLabelId,
    onTextFieldFocus: handleFocus,
    onTextFieldChange: handleChange,
    onTextFieldBlur: handleBlur
  }), [activeOptionId, popoverActive, listboxId, setTextFieldLabelId, handleFocus, handleChange, handleBlur]);
  const listboxOptionContextValue = useMemo(() => ({
    allowMultiple
  }), [allowMultiple]);
  const listboxContextValue = useMemo(() => ({
    listboxId,
    textFieldLabelId,
    textFieldFocused: popoverActive,
    willLoadMoreOptions,
    setActiveOptionId,
    setListboxId,
    onKeyToBottom: onScrolledToBottom
  }), [listboxId, textFieldLabelId, popoverActive, willLoadMoreOptions, setActiveOptionId, setListboxId, onScrolledToBottom]);
  const updateText = useCallback(value => {
    setQuery(value);
    if (value === '') {
      filteredOptions.current = options;
      return;
    }
    const resultOptions = options?.filter(option => FILTER_REGEX(value).exec(reactChildrenText(option.children)));
    filteredOptions.current = resultOptions ?? [];
  }, [options]);
  const handleSelect = useCallback(selected => {
    setQuery('');
    updateText('');
    listboxProps.onSelect?.(selected);
    if (!filteredOptions.current.some(option => option.value === selected)) {
      filteredOptions.current = [...filteredOptions.current, {
        value: selected,
        children: selected
      }];
    }
    if (!allowMultiple) {
      handleClose();
      setActiveItems([selected]);
      return;
    }
    setActiveItems(selectedOptions => {
      return activeItems.includes(selected) ? selectedOptions.filter(option => option !== selected) : [...selectedOptions, selected];
    });
  }, [updateText, listboxProps, allowMultiple, handleClose, activeItems]);
  const showList = options.length > 0 || query !== '';
  const firstSelectedOption = reactChildrenText(options.find(option => option.value === activeItems?.[0])?.children);
  const queryMatchesExistingOption = options.some(option => {
    const matcher = QUERY_REGEX(query);
    return reactChildrenText(option.children).match(matcher);
  });
  return /*#__PURE__*/React.createElement(Popover, {
    activator: /*#__PURE__*/React.createElement(Activator, Object.assign({}, activator, {
      onClick: handleOpen,
      selected: firstSelectedOption || '',
      placeholder: activator.placeholder,
      ref: activatorRef
    })),
    active: popoverActive,
    autofocusTarget: "none",
    onClose: handleClose,
    preferredPosition: "cover",
    preventFocusOnClose: true
  }, /*#__PURE__*/React.createElement(Popover.Pane, {
    onScrolledToBottom: onScrolledToBottom,
    height: height
  }, searchField ? /*#__PURE__*/React.createElement(Box, {
    paddingBlockStart: "200",
    paddingBlockEnd: "100",
    paddingInline: "200",
    borderBlockEndWidth: "025",
    borderColor: "border",
    minHeight: showList ? undefined : '58px'
  }, /*#__PURE__*/React.createElement(ComboboxTextFieldContext.Provider, {
    value: textFieldContextValue
  }, /*#__PURE__*/React.createElement(SearchField, Object.assign({}, searchField, {
    value: query,
    onChange: value => {
      updateText(value);
      searchField.onChange?.(value, searchField.id ?? '');
    },
    prefix: /*#__PURE__*/React.createElement(Icon, {
      source: SearchIcon
    }),
    labelHidden: true,
    focused: popoverActive
  })))) : null, showList && /*#__PURE__*/React.createElement(ComboboxListboxContext.Provider, {
    value: listboxContextValue
  }, /*#__PURE__*/React.createElement(ComboboxListboxOptionContext.Provider, {
    value: listboxOptionContextValue
  }, /*#__PURE__*/React.createElement(Box, {
    paddingBlock: "200"
  }, /*#__PURE__*/React.createElement(Listbox, Object.assign({}, listboxProps, {
    onSelect: handleSelect
  }), filteredOptions.current?.map(option => /*#__PURE__*/React.createElement(Listbox.Option, Object.assign({
    key: option.value,
    selected: activeItems.some(item => item === option.value)
  }, option))), addAction && query !== '' && !queryMatchesExistingOption ? /*#__PURE__*/React.createElement(Listbox.Action, Object.assign({}, addAction, {
    value: query
  })) : null))))));
}
const reactChildrenText = children => {
  if (typeof children === 'string') return children;
  return /*#__PURE__*/isValidElement(children) ? reactChildrenText(children?.props?.children) : '';
};

export { Picker };
