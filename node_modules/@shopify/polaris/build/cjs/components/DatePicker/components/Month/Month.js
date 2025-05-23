'use strict';

var React = require('react');
var dates = require('../../../../utilities/dates.js');
var DatePicker_module = require('../../DatePicker.css.js');
var utilities = require('../../utilities.js');
var Weekday = require('../Weekday/Weekday.js');
var Day = require('../Day/Day.js');
var hooks = require('../../../../utilities/i18n/hooks.js');
var Text = require('../../../Text/Text.js');

function Month({
  focusedDate,
  selected,
  hoverDate,
  disableDatesBefore,
  disableDatesAfter,
  disableSpecificDates,
  allowRange,
  onChange = noop,
  onHover = noop,
  onFocus = noop,
  month,
  year,
  weekStartsOn,
  accessibilityLabelPrefixes
}) {
  const i18n = hooks.useI18n();
  const isInHoveringRange = allowRange ? hoveringDateIsInRange : () => false;
  const now = new Date();
  const current = now.getMonth() === month && now.getFullYear() === year;
  const weeks = React.useMemo(() => dates.getWeeksForMonth(month, year, weekStartsOn), [month, weekStartsOn, year]);
  const weekdays = dates.getOrderedWeekdays(weekStartsOn).map(weekday => /*#__PURE__*/React.createElement(Weekday.Weekday, {
    key: weekday,
    title: i18n.translate(`Polaris.DatePicker.daysAbbreviated.${utilities.weekdayName(weekday)}`),
    label: weekdayLabel(weekday),
    current: current && new Date().getDay() === weekday
  }));
  const handleDateClick = React.useCallback(selectedDate => {
    onChange(dates.getNewRange(allowRange ? selected : undefined, selectedDate));
  }, [allowRange, onChange, selected]);
  const lastDayOfMonth = React.useMemo(() => new Date(year, month + 1, 0), [month, year]);
  function renderWeek(day, dayIndex) {
    if (day == null) {
      return /*#__PURE__*/React.createElement(Day.Day, {
        key: dayIndex,
        onHover: onHover,
        lastDayOfMonth: lastDayOfMonth
      });
    }
    const disabled = disableDatesBefore && dates.isDateBefore(day, disableDatesBefore) || disableDatesAfter && dates.isDateAfter(day, disableDatesAfter) || disableSpecificDates && dates.isDateDisabled(day, disableSpecificDates);
    const isFirstSelectedDay = allowRange && selected && isDateStart(day, selected);
    const isLastSelectedDay = allowRange && selected && (!dates.isSameDay(selected.start, selected.end) && isDateEnd(day, selected) || hoverDate && dates.isSameDay(selected.start, selected.end) && dates.isDateAfter(hoverDate, selected.start) && dates.isSameDay(day, hoverDate) && !isFirstSelectedDay);
    const rangeIsDifferent = !(selected && dates.isSameDay(selected.start, selected.end));
    const isHoveringRight = hoverDate && dates.isDateBefore(day, hoverDate);
    const [firstAccessibilityLabelPrefix, lastAccessibilityLabelPrefix] = accessibilityLabelPrefixes;
    let accessibilityLabelPrefix;
    if (allowRange && isFirstSelectedDay || !allowRange && firstAccessibilityLabelPrefix) {
      accessibilityLabelPrefix = firstAccessibilityLabelPrefix;
    } else if (allowRange && isLastSelectedDay) {
      accessibilityLabelPrefix = lastAccessibilityLabelPrefix;
    }
    return /*#__PURE__*/React.createElement(Day.Day, {
      selectedAccessibilityLabelPrefix: accessibilityLabelPrefix,
      weekday: weekdayLabel(dayIndex),
      focused: focusedDate != null && dates.isSameDay(day, focusedDate),
      day: day,
      key: dayIndex,
      onFocus: onFocus,
      onClick: handleDateClick,
      onHover: onHover,
      selected: selected != null && dates.dateIsSelected(day, selected),
      inRange: selected != null && dates.dateIsInRange(day, selected),
      disabled: disabled,
      inHoveringRange: selected != null && hoverDate != null && isInHoveringRange(day, selected, hoverDate),
      isLastSelectedDay: isLastSelectedDay,
      isFirstSelectedDay: isFirstSelectedDay,
      isHoveringRight: isHoveringRight,
      rangeIsDifferent: rangeIsDifferent
    });
  }
  const weeksMarkup = weeks.map((week, index) => /*#__PURE__*/React.createElement("tr", {
    className: DatePicker_module.default.Week,
    key: index
  }, week.map(renderWeek)));
  return /*#__PURE__*/React.createElement("div", {
    className: DatePicker_module.default.MonthContainer
  }, /*#__PURE__*/React.createElement("table", {
    role: "grid",
    className: DatePicker_module.default.Month
  }, /*#__PURE__*/React.createElement("caption", {
    className: DatePicker_module.default.Title
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "bodyMd",
    alignment: "center",
    fontWeight: current ? 'bold' : 'medium'
  }, i18n.translate(`Polaris.DatePicker.months.${utilities.monthName(month)}`), ' ', year)), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    className: DatePicker_module.default.WeekHeadings
  }, weekdays)), /*#__PURE__*/React.createElement("tbody", null, weeksMarkup)));
  function weekdayLabel(weekday) {
    return i18n.translate(`Polaris.DatePicker.days.${utilities.weekdayName(weekday)}`);
  }
}
function noop() {}
function hoveringDateIsInRange(day, range, hoverEndDate) {
  if (day == null) {
    return false;
  }
  const {
    start,
    end
  } = range;
  return Boolean(dates.isSameDay(start, end) && day > start && day <= hoverEndDate);
}
function isDateEnd(day, range) {
  if (day == null) return false;
  const {
    end
  } = range;
  return Boolean(end && dates.isSameDay(end, day));
}
function isDateStart(day, range) {
  if (day == null) return false;
  const {
    start
  } = range;
  return Boolean(start && dates.isSameDay(start, day));
}

exports.Month = Month;
