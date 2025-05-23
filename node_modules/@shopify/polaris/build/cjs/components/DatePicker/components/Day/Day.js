'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var dates = require('../../../../utilities/dates.js');
var utilities = require('../../utilities.js');
var DatePicker_module = require('../../DatePicker.css.js');
var hooks = require('../../../../utilities/i18n/hooks.js');
var Text = require('../../../Text/Text.js');

const Day = /*#__PURE__*/React.memo(function Day({
  day,
  focused,
  onClick,
  onHover = noop,
  onFocus = noop,
  selected,
  inRange,
  inHoveringRange,
  disabled,
  lastDayOfMonth,
  isLastSelectedDay,
  isFirstSelectedDay,
  isHoveringRight,
  rangeIsDifferent,
  weekday,
  selectedAccessibilityLabelPrefix
}) {
  const i18n = hooks.useI18n();
  const dayNode = React.useRef(null);
  const hoverValue = lastDayOfMonth || day;
  React.useEffect(() => {
    if (focused && dayNode.current) {
      dayNode.current.focus();
    }
  }, [focused]);
  if (!day) {
    return /*#__PURE__*/React.createElement("td", {
      className: DatePicker_module.default.EmptyDayCell,
      onMouseOver: () => onHover(hoverValue)
    });
  }
  const handleClick = onClick && !disabled ? onClick.bind(null, day) : noop;
  const today = dates.isSameDay(new Date(), day);
  const dayCellClassName = css.classNames(DatePicker_module.default.DayCell, selected && DatePicker_module.default['DayCell-selected'], (inRange || inHoveringRange) && !disabled && DatePicker_module.default['DayCell-inRange'], isLastSelectedDay && DatePicker_module.default['DayCell-lastInRange'], isFirstSelectedDay && DatePicker_module.default['DayCell-firstInRange'], isHoveringRight && DatePicker_module.default['DayCell-hoverRight'], rangeIsDifferent && DatePicker_module.default['DayCell-hasRange']);
  const dayClassName = css.classNames(DatePicker_module.default.Day, selected && DatePicker_module.default['Day-selected'], disabled && DatePicker_module.default['Day-disabled'], (inRange || inHoveringRange) && !disabled && DatePicker_module.default['Day-inRange'], isLastSelectedDay && DatePicker_module.default['Day-lastInRange'], isFirstSelectedDay && DatePicker_module.default['Day-firstInRange'], isHoveringRight && DatePicker_module.default['Day-hoverRight'], rangeIsDifferent && DatePicker_module.default['Day-hasRange']);
  const date = day.getDate();
  const tabIndex = (focused || selected || today || date === 1) && !disabled ? 0 : -1;
  const ariaLabel = [selected && selectedAccessibilityLabelPrefix ? `${selectedAccessibilityLabelPrefix} ` : '', `${today ? i18n.translate('Polaris.DatePicker.today') : ''}`, `${weekday ? weekday : ''} `, `${i18n.translate(`Polaris.DatePicker.months.${utilities.monthName(day.getMonth())}`)} `, `${date} `, `${day.getFullYear()}`].join('');
  return /*#__PURE__*/React.createElement("td", {
    className: dayCellClassName
  }, /*#__PURE__*/React.createElement("button", {
    onFocus: () => onFocus(day),
    type: "button",
    ref: dayNode,
    tabIndex: tabIndex,
    className: dayClassName,
    onMouseOver: () => onHover(hoverValue),
    onClick: handleClick,
    "aria-label": ariaLabel,
    "aria-disabled": disabled,
    "aria-pressed": selected
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "bodySm",
    alignment: "center",
    fontWeight: today ? 'bold' : 'regular'
  }, date)));
});
function noop() {}

exports.Day = Day;
