import React, { useCallback, useMemo } from 'react';
import { isSection } from '../../utilities/options.js';
import styles from './Autocomplete.css.js';
import { MappedOption } from './components/MappedOption/MappedOption.js';
import { Listbox, AutoSelection } from '../Listbox/Listbox.js';
import { Combobox } from '../Combobox/Combobox.js';
import { MappedAction } from './components/MappedAction/MappedAction.js';
import { useI18n } from '../../utilities/i18n/hooks.js';

// TypeScript can't generate types that correctly infer the typing of
// subcomponents so explicitly state the subcomponents in the type definition.
// Letting this be implicit works in this project but fails in projects that use
// generated *.d.ts files.

const Autocomplete = function Autocomplete({
  options,
  selected,
  textField,
  preferredPosition,
  listTitle,
  allowMultiple,
  loading,
  actionBefore,
  willLoadMoreResults,
  emptyState,
  onSelect,
  onLoadMoreResults
}) {
  const i18n = useI18n();
  const buildMappedOptionFromOption = useCallback(options => {
    return options.map(option => /*#__PURE__*/React.createElement(MappedOption, Object.assign({
      key: option.id || option.value
    }, option, {
      selected: selected.includes(option.value),
      singleSelection: !allowMultiple
    })));
  }, [selected, allowMultiple]);
  const optionsMarkup = useMemo(() => {
    const conditionalOptions = loading && !willLoadMoreResults ? [] : options;
    if (isSection(conditionalOptions)) {
      const noOptionsAvailable = conditionalOptions.every(({
        options
      }) => options.length === 0);
      if (noOptionsAvailable) {
        return null;
      }
      const optionsMarkup = conditionalOptions.map(({
        options,
        title
      }) => {
        if (options.length === 0) {
          return null;
        }
        const optionMarkup = buildMappedOptionFromOption(options);
        return /*#__PURE__*/React.createElement(Listbox.Section, {
          divider: false,
          title: /*#__PURE__*/React.createElement(Listbox.Header, null, title),
          key: title
        }, optionMarkup);
      });
      return /*#__PURE__*/React.createElement("div", {
        className: styles.SectionWrapper
      }, optionsMarkup);
    }
    const optionList = conditionalOptions.length > 0 ? buildMappedOptionFromOption(conditionalOptions) : null;
    if (listTitle) {
      return /*#__PURE__*/React.createElement(Listbox.Section, {
        divider: false,
        title: /*#__PURE__*/React.createElement(Listbox.Header, null, listTitle)
      }, optionList);
    }
    return optionList;
  }, [listTitle, loading, options, willLoadMoreResults, buildMappedOptionFromOption]);
  const loadingMarkup = loading ? /*#__PURE__*/React.createElement(Listbox.Loading, {
    accessibilityLabel: i18n.translate('Polaris.Autocomplete.spinnerAccessibilityLabel')
  }) : null;
  const updateSelection = useCallback(newSelection => {
    if (actionBefore && newSelection === actionBefore.content) {
      actionBefore.onAction && actionBefore.onAction();
      return;
    }
    if (allowMultiple) {
      if (selected.includes(newSelection)) {
        onSelect(selected.filter(option => option !== newSelection));
      } else {
        onSelect([...selected, newSelection]);
      }
    } else {
      onSelect([newSelection]);
    }
  }, [allowMultiple, onSelect, selected, actionBefore]);
  const actionMarkup = actionBefore && /*#__PURE__*/React.createElement(MappedAction, actionBefore);
  const emptyStateMarkup = emptyState && options.length < 1 && !loading && /*#__PURE__*/React.createElement("div", {
    role: "status"
  }, emptyState);
  const autoSelection = actionBefore ? AutoSelection.First : undefined;
  return /*#__PURE__*/React.createElement(Combobox, {
    activator: textField,
    allowMultiple: allowMultiple,
    onScrolledToBottom: onLoadMoreResults,
    preferredPosition: preferredPosition,
    willLoadMoreOptions: willLoadMoreResults
  }, actionMarkup || optionsMarkup || loadingMarkup || emptyStateMarkup ? /*#__PURE__*/React.createElement(Listbox, {
    autoSelection: autoSelection,
    onSelect: updateSelection
  }, actionMarkup, optionsMarkup && (!loading || willLoadMoreResults) ? optionsMarkup : null, loadingMarkup, emptyStateMarkup) : null);
};
Autocomplete.TextField = Combobox.TextField;

export { Autocomplete };
