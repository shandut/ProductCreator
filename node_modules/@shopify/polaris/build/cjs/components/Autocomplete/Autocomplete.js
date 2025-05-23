'use strict';

var React = require('react');
var options = require('../../utilities/options.js');
var Autocomplete_module = require('./Autocomplete.css.js');
var MappedOption = require('./components/MappedOption/MappedOption.js');
var Listbox = require('../Listbox/Listbox.js');
var Combobox = require('../Combobox/Combobox.js');
var MappedAction = require('./components/MappedAction/MappedAction.js');
var hooks = require('../../utilities/i18n/hooks.js');

// TypeScript can't generate types that correctly infer the typing of
// subcomponents so explicitly state the subcomponents in the type definition.
// Letting this be implicit works in this project but fails in projects that use
// generated *.d.ts files.

const Autocomplete = function Autocomplete({
  options: options$1,
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
  const i18n = hooks.useI18n();
  const buildMappedOptionFromOption = React.useCallback(options => {
    return options.map(option => /*#__PURE__*/React.createElement(MappedOption.MappedOption, Object.assign({
      key: option.id || option.value
    }, option, {
      selected: selected.includes(option.value),
      singleSelection: !allowMultiple
    })));
  }, [selected, allowMultiple]);
  const optionsMarkup = React.useMemo(() => {
    const conditionalOptions = loading && !willLoadMoreResults ? [] : options$1;
    if (options.isSection(conditionalOptions)) {
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
        return /*#__PURE__*/React.createElement(Listbox.Listbox.Section, {
          divider: false,
          title: /*#__PURE__*/React.createElement(Listbox.Listbox.Header, null, title),
          key: title
        }, optionMarkup);
      });
      return /*#__PURE__*/React.createElement("div", {
        className: Autocomplete_module.default.SectionWrapper
      }, optionsMarkup);
    }
    const optionList = conditionalOptions.length > 0 ? buildMappedOptionFromOption(conditionalOptions) : null;
    if (listTitle) {
      return /*#__PURE__*/React.createElement(Listbox.Listbox.Section, {
        divider: false,
        title: /*#__PURE__*/React.createElement(Listbox.Listbox.Header, null, listTitle)
      }, optionList);
    }
    return optionList;
  }, [listTitle, loading, options$1, willLoadMoreResults, buildMappedOptionFromOption]);
  const loadingMarkup = loading ? /*#__PURE__*/React.createElement(Listbox.Listbox.Loading, {
    accessibilityLabel: i18n.translate('Polaris.Autocomplete.spinnerAccessibilityLabel')
  }) : null;
  const updateSelection = React.useCallback(newSelection => {
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
  const actionMarkup = actionBefore && /*#__PURE__*/React.createElement(MappedAction.MappedAction, actionBefore);
  const emptyStateMarkup = emptyState && options$1.length < 1 && !loading && /*#__PURE__*/React.createElement("div", {
    role: "status"
  }, emptyState);
  const autoSelection = actionBefore ? Listbox.AutoSelection.First : undefined;
  return /*#__PURE__*/React.createElement(Combobox.Combobox, {
    activator: textField,
    allowMultiple: allowMultiple,
    onScrolledToBottom: onLoadMoreResults,
    preferredPosition: preferredPosition,
    willLoadMoreOptions: willLoadMoreResults
  }, actionMarkup || optionsMarkup || loadingMarkup || emptyStateMarkup ? /*#__PURE__*/React.createElement(Listbox.Listbox, {
    autoSelection: autoSelection,
    onSelect: updateSelection
  }, actionMarkup, optionsMarkup && (!loading || willLoadMoreResults) ? optionsMarkup : null, loadingMarkup, emptyStateMarkup) : null);
};
Autocomplete.TextField = Combobox.Combobox.TextField;

exports.Autocomplete = Autocomplete;
