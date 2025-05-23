'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var ChoiceList = require('../../../ChoiceList/ChoiceList.js');
var DirectionButton = require('./components/DirectionButton/DirectionButton.js');
var hooks = require('../../../../utilities/i18n/hooks.js');
var Tooltip = require('../../../Tooltip/Tooltip.js');
var Button = require('../../../Button/Button.js');
var Popover = require('../../../Popover/Popover.js');
var Box = require('../../../Box/Box.js');

let SortButtonDirection = /*#__PURE__*/function (SortButtonDirection) {
  SortButtonDirection["Asc"] = "asc";
  SortButtonDirection["Desc"] = "desc";
  return SortButtonDirection;
}({});
function SortButton({
  choices,
  selected,
  disabled,
  disclosureZIndexOverride,
  onChange,
  onChangeKey,
  onChangeDirection
}) {
  const i18n = hooks.useI18n();
  const [active, setActive] = React.useState(false);
  const [selectedValueKey, selectedDirection] = selected[0].split(' ');
  function handleClick() {
    setActive(pastActive => !pastActive);
  }
  function handleClose() {
    setActive(false);
  }
  function handleChangeChoiceList(sel) {
    if (onChangeKey) {
      const [key] = sel[0].split(' ');
      onChangeKey(key);
    } else {
      onChange(sel);
    }
  }
  function handleChangeDirection(sel) {
    if (onChangeDirection) {
      const [, direction] = sel[0].split(' ');
      onChangeDirection(direction);
    } else {
      onChange(sel);
    }
  }
  const choiceListChoices = React.useMemo(() => {
    const choiceCategories = choices.reduce((acc, curr) => {
      const alreadyExists = acc.some(option => option.label === curr.label);
      const [, currentValueDirection] = curr.value.split(' ');
      const isSameDirection = currentValueDirection === selectedDirection;
      if (!alreadyExists) {
        return [...acc, curr];
      }
      if (isSameDirection) {
        return acc.map(option => {
          if (option.label === curr.label) {
            return curr;
          }
          return option;
        });
      }
      return acc;
    }, []);
    return choiceCategories;
  }, [choices, selectedDirection]);
  const selectedChoices = choices.filter(choice => {
    const [currentKey] = choice.value.split(' ');
    return currentKey === selectedValueKey;
  });
  const sortButton = /*#__PURE__*/React.createElement(Tooltip.Tooltip, {
    content: i18n.translate('Polaris.IndexFilters.SortButton.tooltip'),
    preferredPosition: "above",
    hoverDelay: 400,
    zIndexOverride: disclosureZIndexOverride
  }, /*#__PURE__*/React.createElement(Button.Button, {
    size: "slim",
    icon: polarisIcons.SortIcon,
    onClick: handleClick,
    disabled: disabled,
    accessibilityLabel: i18n.translate('Polaris.IndexFilters.SortButton.ariaLabel')
  }));
  return /*#__PURE__*/React.createElement(Popover.Popover, {
    fluidContent: true,
    active: active && !disabled,
    activator: sortButton,
    autofocusTarget: "first-node",
    onClose: handleClose,
    preferredAlignment: "right",
    zIndexOverride: disclosureZIndexOverride
  }, /*#__PURE__*/React.createElement(Box.Box, {
    minWidth: "148px",
    paddingInlineStart: "300",
    paddingInlineEnd: "300",
    paddingBlockStart: "200",
    paddingBlockEnd: "200",
    borderBlockEndWidth: "025",
    borderColor: "border-secondary"
  }, /*#__PURE__*/React.createElement(ChoiceList.ChoiceList, {
    title: i18n.translate('Polaris.IndexFilters.SortButton.title'),
    choices: choiceListChoices,
    selected: selected,
    onChange: handleChangeChoiceList
  })), /*#__PURE__*/React.createElement(Box.Box, {
    paddingInlineStart: "150",
    paddingInlineEnd: "150",
    paddingBlockStart: "200",
    paddingBlockEnd: "200"
  }, /*#__PURE__*/React.createElement(DirectionButton.DirectionButton, {
    direction: "asc",
    active: selectedDirection === SortButtonDirection.Asc,
    onClick: handleChangeDirection,
    value: selectedChoices?.[0]?.value
  }, selectedChoices?.[0]?.directionLabel), /*#__PURE__*/React.createElement(DirectionButton.DirectionButton, {
    direction: "desc",
    active: selectedDirection === SortButtonDirection.Desc,
    onClick: handleChangeDirection,
    value: selectedChoices?.[1]?.value
  }, selectedChoices?.[1]?.directionLabel)));
}

exports.SortButton = SortButton;
exports.SortButtonDirection = SortButtonDirection;
