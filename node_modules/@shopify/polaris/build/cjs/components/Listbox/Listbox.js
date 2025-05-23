'use strict';

var React = require('react');
var debounce = require('../../utilities/debounce.js');
var useToggle = require('../../utilities/use-toggle.js');
var types = require('../../types.js');
var shared = require('../shared.js');
var Listbox_module = require('./Listbox.css.js');
var hooks = require('../../utilities/combobox/hooks.js');
var utilities = require('../../utilities/listbox/utilities.js');
var context = require('../../utilities/listbox/context.js');
var TextOption = require('./components/TextOption/TextOption.js');
var Loading = require('./components/Loading/Loading.js');
var Section = require('./components/Section/Section.js');
var Header = require('./components/Header/Header.js');
var Action = require('./components/Action/Action.js');
var KeypressListener = require('../KeypressListener/KeypressListener.js');
var Text = require('../Text/Text.js');
var Option = require('./components/Option/Option.js');

let AutoSelection = /*#__PURE__*/function (AutoSelection) {
  AutoSelection["FirstSelected"] = "FIRST_SELECTED";
  AutoSelection["First"] = "FIRST";
  AutoSelection["None"] = "NONE";
  return AutoSelection;
}({});
const OPTION_SELECTOR = '[data-listbox-option]';
const OPTION_VALUE_ATTRIBUTE = 'data-listbox-option-value';
const OPTION_ACTION_ATTRIBUTE = 'data-listbox-option-action';
const OPTION_FOCUS_ATTRIBUTE = 'data-focused';
function Listbox({
  children,
  autoSelection = AutoSelection.FirstSelected,
  enableKeyboardControl,
  accessibilityLabel,
  customListId,
  onSelect,
  onActiveOptionChange
}) {
  const [loading, setLoading] = React.useState();
  const [activeOption, setActiveOption] = React.useState();
  const [lazyLoading, setLazyLoading] = React.useState(false);
  const [currentOptions, setCurrentOptions] = React.useState([]);
  const {
    value: keyboardEventsEnabled,
    setTrue: enableKeyboardEvents,
    setFalse: disableKeyboardEvents
  } = useToggle.useToggle(Boolean(enableKeyboardControl));
  const uniqueId = React.useId();
  const listId = customListId || uniqueId;
  const scrollableRef = React.useRef(null);
  const listboxRef = React.useRef(null);
  const {
    listboxId,
    textFieldLabelId,
    textFieldFocused,
    willLoadMoreOptions,
    setActiveOptionId,
    setListboxId,
    onOptionSelected,
    onKeyToBottom
  } = hooks.useComboboxListbox();
  const inCombobox = Boolean(setActiveOptionId);
  React.useEffect(() => {
    if (setListboxId && !listboxId) {
      setListboxId(listId);
    }
  }, [setListboxId, listboxId, listId]);
  const getNavigableOptions = React.useCallback(() => {
    if (!listboxRef.current) {
      return [];
    }
    return [...new Set(listboxRef.current.querySelectorAll(OPTION_SELECTOR))];
  }, []);
  const getFirstNavigableOption = React.useCallback(currentOptions => {
    const hasSelectedOptions = currentOptions.some(option => option.getAttribute('aria-selected') === 'true');
    let elementIndex = 0;
    const element = currentOptions.find((option, index) => {
      const isInteractable = option.getAttribute('aria-disabled') !== 'true';
      let isFirstNavigableOption;
      if (hasSelectedOptions && autoSelection === AutoSelection.FirstSelected) {
        const isSelected = option.getAttribute('aria-selected') === 'true';
        isFirstNavigableOption = isSelected && isInteractable;
      } else {
        isFirstNavigableOption = isInteractable;
      }
      if (isFirstNavigableOption) elementIndex = index;
      return isFirstNavigableOption;
    });
    if (!element) return;
    return {
      element,
      index: elementIndex
    };
  }, [autoSelection]);
  const handleScrollIntoView = React.useCallback(option => {
    const {
      current: scrollable
    } = scrollableRef;
    if (scrollable) {
      utilities.scrollOptionIntoView(option.element, scrollable);
    }
  }, []);
  const handleScrollIntoViewDebounced = debounce.debounce(handleScrollIntoView, 50);
  const handleKeyToBottom = React.useCallback(() => {
    if (onKeyToBottom) {
      setLazyLoading(true);
      return Promise.resolve(onKeyToBottom());
    }
  }, [onKeyToBottom]);
  const handleChangeActiveOption = React.useCallback(nextOption => {
    if (!nextOption) return setActiveOption(undefined);
    activeOption?.element.removeAttribute(OPTION_FOCUS_ATTRIBUTE);
    nextOption.element.setAttribute(OPTION_FOCUS_ATTRIBUTE, 'true');
    handleScrollIntoViewDebounced(nextOption);
    setActiveOption(nextOption);
    setActiveOptionId?.(nextOption.domId);
    onActiveOptionChange?.(nextOption.value, nextOption.domId);
  }, [activeOption, setActiveOptionId, onActiveOptionChange, handleScrollIntoViewDebounced]);
  const getFormattedOption = React.useCallback((element, index) => {
    return {
      element,
      index,
      domId: element.id,
      value: element.getAttribute(OPTION_VALUE_ATTRIBUTE) || '',
      disabled: element.getAttribute('aria-disabled') === 'true',
      isAction: element.getAttribute(OPTION_ACTION_ATTRIBUTE) === 'true'
    };
  }, []);
  const resetActiveOption = React.useCallback(() => {
    let nextOption;
    const nextOptions = getNavigableOptions();
    const nextActiveOption = getFirstNavigableOption(nextOptions);
    if (nextOptions.length === 0 && currentOptions.length > 0) {
      setCurrentOptions(nextOptions);
      handleChangeActiveOption();
      return;
    }
    if (nextActiveOption) {
      const {
        element,
        index
      } = nextActiveOption;
      nextOption = getFormattedOption(element, index);
    }
    const optionIsAlreadyActive = activeOption !== undefined && nextOption?.domId === activeOption?.domId;
    const actionContentHasUpdated = activeOption?.isAction && nextOption?.isAction && nextOption?.value !== activeOption?.value;
    const currentValues = currentOptions.map(option => option.getAttribute(OPTION_VALUE_ATTRIBUTE));
    const nextValues = nextOptions.map(option => option.getAttribute(OPTION_VALUE_ATTRIBUTE));
    const listIsUnchanged = nextValues.length === currentValues.length && nextValues.every((value, index) => {
      return currentValues[index] === value;
    });
    const listIsAppended = currentValues.length !== 0 && nextValues.length > currentValues.length && currentValues.every((value, index) => {
      return nextValues[index] === value;
    });
    if (listIsUnchanged) {
      if (optionIsAlreadyActive && actionContentHasUpdated) {
        setCurrentOptions(nextOptions);
        handleChangeActiveOption(nextOption);
      }
      return;
    }
    if (listIsAppended) {
      setCurrentOptions(nextOptions);
      return;
    }
    setCurrentOptions(nextOptions);
    if (lazyLoading) {
      setLazyLoading(false);
      return;
    }
    handleChangeActiveOption(nextOption);
  }, [lazyLoading, currentOptions, activeOption, getFirstNavigableOption, getNavigableOptions, getFormattedOption, handleChangeActiveOption]);
  React.useEffect(() => {
    if (autoSelection !== AutoSelection.None && !loading && children && React.Children.count(children) > 0) {
      resetActiveOption();
    }
  }, [children, autoSelection, activeOption, loading, resetActiveOption]);
  React.useEffect(() => {
    if (listboxRef.current) {
      scrollableRef.current = listboxRef.current.closest(shared.scrollable.selector);
    }
  }, []);
  React.useEffect(() => {
    if (enableKeyboardControl && !keyboardEventsEnabled) {
      enableKeyboardEvents();
    }
  }, [enableKeyboardControl, keyboardEventsEnabled, enableKeyboardEvents]);
  const onOptionSelect = React.useCallback(option => {
    handleChangeActiveOption(option);
    if (onOptionSelected) onOptionSelected();
    if (onSelect) onSelect(option.value);
  }, [handleChangeActiveOption, onSelect, onOptionSelected]);
  const getNextIndex = React.useCallback((currentIndex, lastIndex, direction) => {
    let nextIndex;
    if (direction === 'down') {
      if (currentIndex === lastIndex) {
        nextIndex = willLoadMoreOptions ? currentIndex + 1 : 0;
      } else {
        nextIndex = currentIndex + 1;
      }
    } else {
      nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
    }
    return nextIndex;
  }, [willLoadMoreOptions]);
  const getNextValidOption = React.useCallback(async key => {
    const lastIndex = currentOptions.length - 1;
    let currentIndex = activeOption?.index || 0;
    let nextIndex = 0;
    let element = activeOption?.element;
    let totalOptions = -1;
    if (!activeOption && autoSelection === AutoSelection.None) {
      const nextOptions = getNavigableOptions();
      const nextActiveOption = getFirstNavigableOption(nextOptions);
      setCurrentOptions(nextOptions);
      return {
        element: nextActiveOption?.element,
        nextIndex: nextActiveOption?.index || 0
      };
    }
    while (totalOptions++ < lastIndex) {
      nextIndex = getNextIndex(currentIndex, lastIndex, key);
      element = currentOptions[nextIndex];
      const triggerLazyLoad = nextIndex >= lastIndex;
      const isDisabled = element?.getAttribute('aria-disabled') === 'true';
      if (triggerLazyLoad && willLoadMoreOptions) {
        await handleKeyToBottom();
      }
      if (isDisabled) {
        currentIndex = nextIndex;
        element = undefined;
        continue;
      }
      break;
    }
    return {
      element,
      nextIndex
    };
  }, [autoSelection, currentOptions, activeOption, willLoadMoreOptions, getNextIndex, handleKeyToBottom, getFirstNavigableOption, getNavigableOptions]);
  const handleArrow = React.useCallback(async (type, event) => {
    event.preventDefault();
    const {
      element,
      nextIndex
    } = await getNextValidOption(type);
    if (!element) return;
    const nextOption = getFormattedOption(element, nextIndex);
    handleChangeActiveOption(nextOption);
  }, [getFormattedOption, getNextValidOption, handleChangeActiveOption]);
  const handleDownArrow = React.useCallback(event => {
    handleArrow('down', event);
  }, [handleArrow]);
  const handleUpArrow = React.useCallback(event => {
    handleArrow('up', event);
  }, [handleArrow]);
  const handleEnter = React.useCallback(event => {
    event.preventDefault();
    event.stopPropagation();
    if (activeOption) {
      onOptionSelect(activeOption);
    }
  }, [activeOption, onOptionSelect]);
  const handleFocus = React.useCallback(() => {
    if (enableKeyboardControl) return;
    enableKeyboardEvents();
  }, [enableKeyboardControl, enableKeyboardEvents]);
  const handleBlur = React.useCallback(event => {
    event.stopPropagation();
    if (keyboardEventsEnabled) {
      const nextActiveOption = getFirstNavigableOption(currentOptions);
      if (nextActiveOption) {
        const {
          element,
          index
        } = nextActiveOption;
        const nextOption = getFormattedOption(element, index);
        handleChangeActiveOption(nextOption);
      }
    }
    if (enableKeyboardControl) return;
    disableKeyboardEvents();
  }, [enableKeyboardControl, currentOptions, keyboardEventsEnabled, disableKeyboardEvents, getFirstNavigableOption, getFormattedOption, handleChangeActiveOption]);
  const listeners = keyboardEventsEnabled || textFieldFocused ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(KeypressListener.KeypressListener, {
    keyEvent: "keydown",
    keyCode: types.Key.DownArrow,
    handler: handleDownArrow
  }), /*#__PURE__*/React.createElement(KeypressListener.KeypressListener, {
    keyEvent: "keydown",
    keyCode: types.Key.UpArrow,
    handler: handleUpArrow
  }), /*#__PURE__*/React.createElement(KeypressListener.KeypressListener, {
    keyEvent: "keydown",
    keyCode: types.Key.Enter,
    handler: handleEnter
  })) : null;
  const listboxContext = React.useMemo(() => ({
    onOptionSelect,
    setLoading
  }), [onOptionSelect]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, listeners, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    visuallyHidden: true
  }, /*#__PURE__*/React.createElement("div", {
    "aria-live": "polite"
  }, loading ? loading : null)), /*#__PURE__*/React.createElement(context.ListboxContext.Provider, {
    value: listboxContext
  }, /*#__PURE__*/React.createElement(context.WithinListboxContext.Provider, {
    value: true
  }, children ? /*#__PURE__*/React.createElement("ul", {
    tabIndex: 0,
    role: "listbox",
    className: Listbox_module.default.Listbox,
    "aria-label": inCombobox ? undefined : accessibilityLabel,
    "aria-labelledby": textFieldLabelId,
    "aria-busy": Boolean(loading),
    "aria-activedescendant": activeOption && activeOption.domId,
    id: listId,
    onFocus: inCombobox ? undefined : handleFocus,
    onBlur: inCombobox ? undefined : handleBlur,
    ref: listboxRef
  }, children) : null)));
}
Listbox.Option = Option.Option;
Listbox.TextOption = TextOption.TextOption;
Listbox.Loading = Loading.Loading;
Listbox.Section = Section.Section;
Listbox.Header = Header.Header;
Listbox.Action = Action.Action;

exports.AutoSelection = AutoSelection;
exports.Listbox = Listbox;
