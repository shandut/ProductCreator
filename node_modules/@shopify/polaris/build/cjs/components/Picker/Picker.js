'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var string = require('../../utilities/string.js');
var Activator = require('./components/Activator/Activator.js');
var SearchField = require('./components/SearchField/SearchField.js');
var Popover = require('../Popover/Popover.js');
var Box = require('../Box/Box.js');
var context = require('../../utilities/combobox/context.js');
var Icon = require('../Icon/Icon.js');
var Listbox = require('../Listbox/Listbox.js');

const FILTER_REGEX = value => new RegExp(value, 'i');
const QUERY_REGEX = value => new RegExp(`^${string.escapeRegex(value)}$`, 'i');
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
  const activatorRef = /*#__PURE__*/React.createRef();
  const [activeItems, setActiveItems] = React.useState([]);
  const [popoverActive, setPopoverActive] = React.useState(false);
  const [activeOptionId, setActiveOptionId] = React.useState();
  const [textFieldLabelId, setTextFieldLabelId] = React.useState();
  const [listboxId, setListboxId] = React.useState();
  const [query, setQuery] = React.useState('');
  const filteredOptions = React.useRef(options);
  const shouldOpen = !popoverActive;
  const handleClose = React.useCallback(() => {
    setPopoverActive(false);
    onClose?.();
    activatorRef.current?.focus();
  }, [activatorRef, onClose]);
  const handleOpen = React.useCallback(() => {
    setPopoverActive(true);
    filteredOptions.current = options;
  }, [options]);
  const handleFocus = React.useCallback(() => {
    if (shouldOpen) handleOpen();
  }, [shouldOpen, handleOpen]);
  const handleChange = React.useCallback(() => {
    if (shouldOpen) handleOpen();
  }, [shouldOpen, handleOpen]);
  const handleBlur = React.useCallback(() => {
    if (popoverActive) {
      handleClose();
      setQuery('');
    }
  }, [popoverActive, handleClose]);
  const textFieldContextValue = React.useMemo(() => ({
    activeOptionId,
    expanded: popoverActive,
    listboxId,
    setTextFieldLabelId,
    onTextFieldFocus: handleFocus,
    onTextFieldChange: handleChange,
    onTextFieldBlur: handleBlur
  }), [activeOptionId, popoverActive, listboxId, setTextFieldLabelId, handleFocus, handleChange, handleBlur]);
  const listboxOptionContextValue = React.useMemo(() => ({
    allowMultiple
  }), [allowMultiple]);
  const listboxContextValue = React.useMemo(() => ({
    listboxId,
    textFieldLabelId,
    textFieldFocused: popoverActive,
    willLoadMoreOptions,
    setActiveOptionId,
    setListboxId,
    onKeyToBottom: onScrolledToBottom
  }), [listboxId, textFieldLabelId, popoverActive, willLoadMoreOptions, setActiveOptionId, setListboxId, onScrolledToBottom]);
  const updateText = React.useCallback(value => {
    setQuery(value);
    if (value === '') {
      filteredOptions.current = options;
      return;
    }
    const resultOptions = options?.filter(option => FILTER_REGEX(value).exec(reactChildrenText(option.children)));
    filteredOptions.current = resultOptions ?? [];
  }, [options]);
  const handleSelect = React.useCallback(selected => {
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
  return /*#__PURE__*/React.createElement(Popover.Popover, {
    activator: /*#__PURE__*/React.createElement(Activator.Activator, Object.assign({}, activator, {
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
  }, /*#__PURE__*/React.createElement(Popover.Popover.Pane, {
    onScrolledToBottom: onScrolledToBottom,
    height: height
  }, searchField ? /*#__PURE__*/React.createElement(Box.Box, {
    paddingBlockStart: "200",
    paddingBlockEnd: "100",
    paddingInline: "200",
    borderBlockEndWidth: "025",
    borderColor: "border",
    minHeight: showList ? undefined : '58px'
  }, /*#__PURE__*/React.createElement(context.ComboboxTextFieldContext.Provider, {
    value: textFieldContextValue
  }, /*#__PURE__*/React.createElement(SearchField.SearchField, Object.assign({}, searchField, {
    value: query,
    onChange: value => {
      updateText(value);
      searchField.onChange?.(value, searchField.id ?? '');
    },
    prefix: /*#__PURE__*/React.createElement(Icon.Icon, {
      source: polarisIcons.SearchIcon
    }),
    labelHidden: true,
    focused: popoverActive
  })))) : null, showList && /*#__PURE__*/React.createElement(context.ComboboxListboxContext.Provider, {
    value: listboxContextValue
  }, /*#__PURE__*/React.createElement(context.ComboboxListboxOptionContext.Provider, {
    value: listboxOptionContextValue
  }, /*#__PURE__*/React.createElement(Box.Box, {
    paddingBlock: "200"
  }, /*#__PURE__*/React.createElement(Listbox.Listbox, Object.assign({}, listboxProps, {
    onSelect: handleSelect
  }), filteredOptions.current?.map(option => /*#__PURE__*/React.createElement(Listbox.Listbox.Option, Object.assign({
    key: option.value,
    selected: activeItems.some(item => item === option.value)
  }, option))), addAction && query !== '' && !queryMatchesExistingOption ? /*#__PURE__*/React.createElement(Listbox.Listbox.Action, Object.assign({}, addAction, {
    value: query
  })) : null))))));
}
const reactChildrenText = children => {
  if (typeof children === 'string') return children;
  return /*#__PURE__*/React.isValidElement(children) ? reactChildrenText(children?.props?.children) : '';
};

exports.Picker = Picker;
