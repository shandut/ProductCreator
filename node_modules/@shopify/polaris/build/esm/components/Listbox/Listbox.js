import React, { useState, useId, useRef, useEffect, useCallback, Children, useMemo } from 'react';
import { debounce } from '../../utilities/debounce.js';
import { useToggle } from '../../utilities/use-toggle.js';
import { Key } from '../../types.js';
import { scrollable } from '../shared.js';
import styles from './Listbox.css.js';
import { useComboboxListbox } from '../../utilities/combobox/hooks.js';
import { scrollOptionIntoView } from '../../utilities/listbox/utilities.js';
import { ListboxContext, WithinListboxContext } from '../../utilities/listbox/context.js';
import { TextOption } from './components/TextOption/TextOption.js';
import { Loading } from './components/Loading/Loading.js';
import { Section } from './components/Section/Section.js';
import { Header } from './components/Header/Header.js';
import { Action } from './components/Action/Action.js';
import { KeypressListener } from '../KeypressListener/KeypressListener.js';
import { Text } from '../Text/Text.js';
import { Option } from './components/Option/Option.js';

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
  const [loading, setLoading] = useState();
  const [activeOption, setActiveOption] = useState();
  const [lazyLoading, setLazyLoading] = useState(false);
  const [currentOptions, setCurrentOptions] = useState([]);
  const {
    value: keyboardEventsEnabled,
    setTrue: enableKeyboardEvents,
    setFalse: disableKeyboardEvents
  } = useToggle(Boolean(enableKeyboardControl));
  const uniqueId = useId();
  const listId = customListId || uniqueId;
  const scrollableRef = useRef(null);
  const listboxRef = useRef(null);
  const {
    listboxId,
    textFieldLabelId,
    textFieldFocused,
    willLoadMoreOptions,
    setActiveOptionId,
    setListboxId,
    onOptionSelected,
    onKeyToBottom
  } = useComboboxListbox();
  const inCombobox = Boolean(setActiveOptionId);
  useEffect(() => {
    if (setListboxId && !listboxId) {
      setListboxId(listId);
    }
  }, [setListboxId, listboxId, listId]);
  const getNavigableOptions = useCallback(() => {
    if (!listboxRef.current) {
      return [];
    }
    return [...new Set(listboxRef.current.querySelectorAll(OPTION_SELECTOR))];
  }, []);
  const getFirstNavigableOption = useCallback(currentOptions => {
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
  const handleScrollIntoView = useCallback(option => {
    const {
      current: scrollable
    } = scrollableRef;
    if (scrollable) {
      scrollOptionIntoView(option.element, scrollable);
    }
  }, []);
  const handleScrollIntoViewDebounced = debounce(handleScrollIntoView, 50);
  const handleKeyToBottom = useCallback(() => {
    if (onKeyToBottom) {
      setLazyLoading(true);
      return Promise.resolve(onKeyToBottom());
    }
  }, [onKeyToBottom]);
  const handleChangeActiveOption = useCallback(nextOption => {
    if (!nextOption) return setActiveOption(undefined);
    activeOption?.element.removeAttribute(OPTION_FOCUS_ATTRIBUTE);
    nextOption.element.setAttribute(OPTION_FOCUS_ATTRIBUTE, 'true');
    handleScrollIntoViewDebounced(nextOption);
    setActiveOption(nextOption);
    setActiveOptionId?.(nextOption.domId);
    onActiveOptionChange?.(nextOption.value, nextOption.domId);
  }, [activeOption, setActiveOptionId, onActiveOptionChange, handleScrollIntoViewDebounced]);
  const getFormattedOption = useCallback((element, index) => {
    return {
      element,
      index,
      domId: element.id,
      value: element.getAttribute(OPTION_VALUE_ATTRIBUTE) || '',
      disabled: element.getAttribute('aria-disabled') === 'true',
      isAction: element.getAttribute(OPTION_ACTION_ATTRIBUTE) === 'true'
    };
  }, []);
  const resetActiveOption = useCallback(() => {
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
  useEffect(() => {
    if (autoSelection !== AutoSelection.None && !loading && children && Children.count(children) > 0) {
      resetActiveOption();
    }
  }, [children, autoSelection, activeOption, loading, resetActiveOption]);
  useEffect(() => {
    if (listboxRef.current) {
      scrollableRef.current = listboxRef.current.closest(scrollable.selector);
    }
  }, []);
  useEffect(() => {
    if (enableKeyboardControl && !keyboardEventsEnabled) {
      enableKeyboardEvents();
    }
  }, [enableKeyboardControl, keyboardEventsEnabled, enableKeyboardEvents]);
  const onOptionSelect = useCallback(option => {
    handleChangeActiveOption(option);
    if (onOptionSelected) onOptionSelected();
    if (onSelect) onSelect(option.value);
  }, [handleChangeActiveOption, onSelect, onOptionSelected]);
  const getNextIndex = useCallback((currentIndex, lastIndex, direction) => {
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
  const getNextValidOption = useCallback(async key => {
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
  const handleArrow = useCallback(async (type, event) => {
    event.preventDefault();
    const {
      element,
      nextIndex
    } = await getNextValidOption(type);
    if (!element) return;
    const nextOption = getFormattedOption(element, nextIndex);
    handleChangeActiveOption(nextOption);
  }, [getFormattedOption, getNextValidOption, handleChangeActiveOption]);
  const handleDownArrow = useCallback(event => {
    handleArrow('down', event);
  }, [handleArrow]);
  const handleUpArrow = useCallback(event => {
    handleArrow('up', event);
  }, [handleArrow]);
  const handleEnter = useCallback(event => {
    event.preventDefault();
    event.stopPropagation();
    if (activeOption) {
      onOptionSelect(activeOption);
    }
  }, [activeOption, onOptionSelect]);
  const handleFocus = useCallback(() => {
    if (enableKeyboardControl) return;
    enableKeyboardEvents();
  }, [enableKeyboardControl, enableKeyboardEvents]);
  const handleBlur = useCallback(event => {
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
  const listeners = keyboardEventsEnabled || textFieldFocused ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(KeypressListener, {
    keyEvent: "keydown",
    keyCode: Key.DownArrow,
    handler: handleDownArrow
  }), /*#__PURE__*/React.createElement(KeypressListener, {
    keyEvent: "keydown",
    keyCode: Key.UpArrow,
    handler: handleUpArrow
  }), /*#__PURE__*/React.createElement(KeypressListener, {
    keyEvent: "keydown",
    keyCode: Key.Enter,
    handler: handleEnter
  })) : null;
  const listboxContext = useMemo(() => ({
    onOptionSelect,
    setLoading
  }), [onOptionSelect]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, listeners, /*#__PURE__*/React.createElement(Text, {
    as: "span",
    visuallyHidden: true
  }, /*#__PURE__*/React.createElement("div", {
    "aria-live": "polite"
  }, loading ? loading : null)), /*#__PURE__*/React.createElement(ListboxContext.Provider, {
    value: listboxContext
  }, /*#__PURE__*/React.createElement(WithinListboxContext.Provider, {
    value: true
  }, children ? /*#__PURE__*/React.createElement("ul", {
    tabIndex: 0,
    role: "listbox",
    className: styles.Listbox,
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
Listbox.Option = Option;
Listbox.TextOption = TextOption;
Listbox.Loading = Loading;
Listbox.Section = Section;
Listbox.Header = Header;
Listbox.Action = Action;

export { AutoSelection, Listbox };
