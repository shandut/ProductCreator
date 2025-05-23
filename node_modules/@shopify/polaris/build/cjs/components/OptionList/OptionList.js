'use strict';

var React = require('react');
var options = require('../../utilities/options.js');
var arrays = require('../../utilities/arrays.js');
var useDeepEffect = require('../../utilities/use-deep-effect.js');
var Option = require('./components/Option/Option.js');
var Box = require('../Box/Box.js');
var BlockStack = require('../BlockStack/BlockStack.js');
var Text = require('../Text/Text.js');

function OptionList({
  options,
  sections,
  title,
  selected,
  allowMultiple,
  role,
  verticalAlign,
  onChange,
  id: idProp,
  onPointerEnterOption,
  onFocusOption
}) {
  const [normalizedOptions, setNormalizedOptions] = React.useState(createNormalizedOptions(options, sections, title));
  const uniqId = React.useId();
  const id = idProp ?? uniqId;
  useDeepEffect.useDeepEffect(() => {
    setNormalizedOptions(createNormalizedOptions(options || [], sections || [], title));
  }, [options, sections, title], optionArraysAreEqual);
  const handleClick = React.useCallback((sectionIndex, optionIndex) => {
    const selectedValue = normalizedOptions[sectionIndex].options[optionIndex].value;
    const foundIndex = selected.indexOf(selectedValue);
    if (allowMultiple) {
      const newSelection = foundIndex === -1 ? [selectedValue, ...selected] : [...selected.slice(0, foundIndex), ...selected.slice(foundIndex + 1, selected.length)];
      onChange(newSelection);
      return;
    }
    onChange([selectedValue]);
  }, [normalizedOptions, selected, allowMultiple, onChange]);
  const handlePointerEnter = React.useCallback((sectionIndex, optionIndex) => {
    if (!onPointerEnterOption) return;
    const selectedValue = normalizedOptions[sectionIndex].options[optionIndex].value;
    onPointerEnterOption(selectedValue);
  }, [normalizedOptions, onPointerEnterOption]);
  const handleFocus = React.useCallback((sectionIndex, optionIndex) => {
    if (!onFocusOption) return;
    const selectedValue = normalizedOptions[sectionIndex].options[optionIndex].value;
    onFocusOption(selectedValue);
  }, [normalizedOptions, onFocusOption]);
  const optionsExist = normalizedOptions.length > 0;
  const optionsMarkup = optionsExist ? normalizedOptions.map(({
    title,
    options
  }, sectionIndex) => {
    const isFirstOption = sectionIndex === 0;
    const titleLevel = isFirstOption ? 'h2' : 'h3';
    const titleMarkup = title ? /*#__PURE__*/React.createElement(Box.Box, {
      paddingBlockStart: isFirstOption ? '050' : '300',
      paddingInlineStart: "150",
      paddingBlockEnd: "100",
      paddingInlineEnd: "150",
      borderColor: "border-secondary"
    }, /*#__PURE__*/React.createElement(Text.Text, {
      as: titleLevel,
      variant: "headingSm"
    }, title)) : null;
    const optionsMarkup = options && options.map((option, optionIndex) => {
      const isSelected = selected.includes(option.value);
      const optionId = option.id || `${id}-${sectionIndex}-${optionIndex}`;
      return /*#__PURE__*/React.createElement(Option.Option, Object.assign({
        key: optionId
      }, option, {
        id: optionId,
        section: sectionIndex,
        index: optionIndex,
        onClick: handleClick,
        select: isSelected,
        allowMultiple: allowMultiple,
        verticalAlign: verticalAlign,
        onPointerEnter: handlePointerEnter,
        onFocus: handleFocus
      }));
    });
    const option = /*#__PURE__*/React.createElement(Box.Box, {
      as: "ul",
      id: `${id}-${sectionIndex}`,
      role: role
    }, optionsMarkup);

    // eslint-disable-next-line no-nested-ternary
    const blockStartPadding = isFirstOption ? title ? '100' : '0' : title ? '050' : '0';
    return /*#__PURE__*/React.createElement(Box.Box, {
      key: title || `noTitle-${sectionIndex}`,
      as: "li",
      paddingBlockStart: blockStartPadding
    }, /*#__PURE__*/React.createElement(BlockStack.BlockStack, {
      gap: isFirstOption && sections ? undefined : '0'
    }, titleMarkup, option));
  }) : null;
  return /*#__PURE__*/React.createElement(Box.Box, {
    as: "ul",
    role: role,
    padding: "150"
  }, optionsMarkup);
}
function createNormalizedOptions(options, sections, title) {
  if (options == null) {
    const section = {
      options: [],
      title
    };
    return sections == null ? [] : [section, ...sections];
  }
  if (sections == null) {
    return [{
      title,
      options
    }];
  }
  return [{
    title,
    options
  }, ...sections];
}
function optionArraysAreEqual(firstArray, secondArray) {
  if (options.isSection(firstArray) && options.isSection(secondArray)) {
    return arrays.arraysAreEqual(firstArray, secondArray, testSectionsPropEquality);
  }
  return arrays.arraysAreEqual(firstArray, secondArray);
}
function testSectionsPropEquality(previousSection, currentSection) {
  const {
    options: previousOptions
  } = previousSection;
  const {
    options: currentOptions
  } = currentSection;
  const optionsAreEqual = arrays.arraysAreEqual(previousOptions, currentOptions);
  const titlesAreEqual = previousSection.title === currentSection.title;
  return optionsAreEqual && titlesAreEqual;
}

exports.OptionList = OptionList;
