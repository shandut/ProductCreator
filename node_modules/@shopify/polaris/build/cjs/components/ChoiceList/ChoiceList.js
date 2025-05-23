'use strict';

var React = require('react');
var ChoiceList_module = require('./ChoiceList.css.js');
var Bleed = require('../Bleed/Bleed.js');
var RadioButton = require('../RadioButton/RadioButton.js');
var Box = require('../Box/Box.js');
var InlineError = require('../InlineError/InlineError.js');
var BlockStack = require('../BlockStack/BlockStack.js');
var Checkbox = require('../Checkbox/Checkbox.js');
var Text = require('../Text/Text.js');

function ChoiceList({
  title,
  titleHidden,
  allowMultiple,
  choices,
  selected,
  onChange = noop,
  error,
  disabled = false,
  name: nameProp,
  tone
}) {
  // Type asserting to any is required for TS3.2 but can be removed when we update to 3.3
  // see https://github.com/Microsoft/TypeScript/issues/28768
  const ControlComponent = allowMultiple ? Checkbox.Checkbox : RadioButton.RadioButton;
  const uniqName = React.useId();
  const name = nameProp ?? uniqName;
  const finalName = allowMultiple ? `${name}[]` : name;
  const titleMarkup = title ? /*#__PURE__*/React.createElement(Box.Box, {
    as: "legend",
    paddingBlockEnd: {
      xs: '0',
      md: '100'
    }
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "bodyMd",
    visuallyHidden: titleHidden
  }, title)) : null;
  const choicesMarkup = choices.map(choice => {
    const {
      value,
      id,
      label,
      helpText,
      disabled: choiceDisabled,
      describedByError
    } = choice;
    function handleChange(checked) {
      onChange(updateSelectedChoices(choice, checked, selected, allowMultiple), name);
    }
    const isSelected = choiceIsSelected(choice, selected);
    const renderedChildren = choice.renderChildren ? choice.renderChildren(isSelected) : null;
    const children = renderedChildren ? /*#__PURE__*/React.createElement("div", {
      className: ChoiceList_module.default.ChoiceChildren
    }, /*#__PURE__*/React.createElement(Box.Box, {
      paddingBlockStart: {
        xs: '400',
        md: '0'
      }
    }, renderedChildren)) : null;
    return /*#__PURE__*/React.createElement("li", {
      key: value
    }, /*#__PURE__*/React.createElement(Bleed.Bleed, {
      marginBlockEnd: helpText ? {
        xs: '100',
        md: '0'
      } : {
        xs: '0'
      }
    }, /*#__PURE__*/React.createElement(ControlComponent, {
      name: finalName,
      value: value,
      id: id,
      label: label,
      disabled: choiceDisabled || disabled,
      fill: {
        xs: true,
        sm: false
      },
      checked: choiceIsSelected(choice, selected),
      helpText: helpText,
      onChange: handleChange,
      ariaDescribedBy: error && describedByError ? InlineError.errorTextID(finalName) : null,
      tone: tone
    }), children));
  });
  const errorMarkup = error && /*#__PURE__*/React.createElement(Box.Box, {
    paddingBlockStart: {
      xs: '0',
      md: '100'
    },
    paddingBlockEnd: "200"
  }, /*#__PURE__*/React.createElement(InlineError.InlineError, {
    message: error,
    fieldID: finalName
  }));
  return /*#__PURE__*/React.createElement(BlockStack.BlockStack, {
    as: "fieldset",
    gap: {
      xs: '400',
      md: '0'
    },
    "aria-invalid": error != null,
    id: finalName
  }, titleMarkup, /*#__PURE__*/React.createElement(BlockStack.BlockStack, {
    as: "ul",
    gap: {
      xs: '400',
      md: '0'
    }
  }, choicesMarkup), errorMarkup);
}
function noop() {}
function choiceIsSelected({
  value
}, selected) {
  return selected.includes(value);
}
function updateSelectedChoices({
  value
}, checked, selected, allowMultiple = false) {
  if (checked) {
    return allowMultiple ? [...selected, value] : [value];
  }
  return selected.filter(selectedChoice => selectedChoice !== value);
}

exports.ChoiceList = ChoiceList;
