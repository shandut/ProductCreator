'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../utilities/css.js');
var dates = require('../../utilities/dates.js');
var utilities = require('./utilities.js');
var DatePicker_module = require('./DatePicker.css.js');
var Month = require('./components/Month/Month.js');
var hooks = require('../../utilities/i18n/hooks.js');
var Button = require('../Button/Button.js');

function DatePicker({
  id,
  selected,
  month,
  year,
  allowRange,
  multiMonth,
  disableDatesBefore,
  disableDatesAfter,
  disableSpecificDates,
  weekStartsOn = 0,
  dayAccessibilityLabelPrefix,
  onMonthChange,
  onChange = noop
}) {
  const i18n = hooks.useI18n();
  const [hoverDate, setHoverDate] = React.useState(undefined);
  const [focusDate, setFocusDate] = React.useState(undefined);
  React.useEffect(() => {
    setFocusDate(undefined);
  }, [selected]);
  const handleFocus = React.useCallback(date => {
    setFocusDate(date);
  }, []);
  const setFocusDateAndHandleMonthChange = React.useCallback(date => {
    if (onMonthChange) {
      onMonthChange(date.getMonth(), date.getFullYear());
    }
    setHoverDate(date);
    setFocusDate(date);
  }, [onMonthChange]);
  const handleDateSelection = React.useCallback(range => {
    const {
      end
    } = range;
    setHoverDate(end);
    setFocusDate(new Date(end));
    onChange(range);
  }, [onChange]);
  const handleMonthChangeClick = React.useCallback((month, year) => {
    if (!onMonthChange) {
      return;
    }
    setFocusDate(undefined);
    onMonthChange(month, year);
  }, [onMonthChange]);
  const handleHover = React.useCallback(date => {
    setHoverDate(date);
  }, []);
  const handleKeyUp = React.useCallback(event => {
    const {
      key
    } = event;
    const range = deriveRange(selected);
    const focusedDate = focusDate || range && range.start;
    if (focusedDate == null) {
      return;
    }
    if (key === 'ArrowUp') {
      const previousWeek = new Date(focusedDate);
      previousWeek.setDate(focusedDate.getDate() - 7);
      if (!(disableDatesBefore && dates.isDateBefore(previousWeek, disableDatesBefore) || disableSpecificDates && dates.isDateDisabled(previousWeek, disableSpecificDates))) {
        setFocusDateAndHandleMonthChange(previousWeek);
      }
    }
    if (key === 'ArrowDown') {
      const nextWeek = new Date(focusedDate);
      nextWeek.setDate(focusedDate.getDate() + 7);
      if (!(disableDatesAfter && dates.isDateAfter(nextWeek, disableDatesAfter) || disableSpecificDates && dates.isDateDisabled(nextWeek, disableSpecificDates))) {
        setFocusDateAndHandleMonthChange(nextWeek);
      }
    }
    if (key === 'ArrowRight') {
      const tomorrow = new Date(focusedDate);
      tomorrow.setDate(focusedDate.getDate() + 1);
      if (!(disableDatesAfter && dates.isDateAfter(tomorrow, disableDatesAfter) || disableSpecificDates && dates.isDateDisabled(tomorrow, disableSpecificDates))) {
        setFocusDateAndHandleMonthChange(tomorrow);
      }
    }
    if (key === 'ArrowLeft') {
      const yesterday = new Date(focusedDate);
      yesterday.setDate(focusedDate.getDate() - 1);
      if (!(disableDatesBefore && dates.isDateBefore(yesterday, disableDatesBefore) || disableSpecificDates && dates.isDateDisabled(yesterday, disableSpecificDates))) {
        setFocusDateAndHandleMonthChange(yesterday);
      }
    }
  }, [disableDatesAfter, disableDatesBefore, disableSpecificDates, focusDate, selected, setFocusDateAndHandleMonthChange]);
  const showNextYear = dates.getNextDisplayYear(month, year);
  const showNextMonth = dates.getNextDisplayMonth(month);
  const showNextToNextYear = dates.getNextDisplayYear(showNextMonth, showNextYear);
  const showNextToNextMonth = dates.getNextDisplayMonth(showNextMonth);
  const showPreviousYear = dates.getPreviousDisplayYear(month, year);
  const showPreviousMonth = dates.getPreviousDisplayMonth(month);
  const previousMonthName = i18n.translate(`Polaris.DatePicker.months.${utilities.monthName(showPreviousMonth)}`);
  const nextMonth = multiMonth ? i18n.translate(`Polaris.DatePicker.months.${utilities.monthName(showNextToNextMonth)}`) : i18n.translate(`Polaris.DatePicker.months.${utilities.monthName(showNextMonth)}`);
  const nextYear = multiMonth ? showNextToNextYear : showNextYear;
  const monthIsSelected = React.useMemo(() => deriveRange(selected), [selected]);
  const firstDatePickerAccessibilityLabelPrefix = allowRange ? i18n.translate(`Polaris.DatePicker.start`) : dayAccessibilityLabelPrefix;
  const secondDatePickerAccessibilityLabelPrefix = i18n.translate(`Polaris.DatePicker.end`);
  const accessibilityLabelPrefixes = [firstDatePickerAccessibilityLabelPrefix, secondDatePickerAccessibilityLabelPrefix];
  const secondDatePicker = multiMonth ? /*#__PURE__*/React.createElement(Month.Month, {
    onFocus: handleFocus,
    focusedDate: focusDate,
    month: showNextMonth,
    year: showNextYear,
    selected: monthIsSelected,
    hoverDate: hoverDate,
    onChange: handleDateSelection,
    onHover: handleHover,
    disableDatesBefore: disableDatesBefore,
    disableDatesAfter: disableDatesAfter,
    disableSpecificDates: disableSpecificDates,
    allowRange: allowRange,
    weekStartsOn: weekStartsOn,
    accessibilityLabelPrefixes: accessibilityLabelPrefixes
  }) : null;
  const datePickerClassName = css.classNames(DatePicker_module.default.DatePicker);
  return /*#__PURE__*/React.createElement("div", {
    id: id,
    className: datePickerClassName,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp
  }, /*#__PURE__*/React.createElement("div", {
    className: DatePicker_module.default.Header
  }, /*#__PURE__*/React.createElement(Button.Button, {
    variant: "tertiary",
    icon: polarisIcons.ArrowLeftIcon,
    accessibilityLabel: i18n.translate('Polaris.DatePicker.previousMonth', {
      previousMonthName,
      showPreviousYear
    }),
    onClick: () => handleMonthChangeClick(showPreviousMonth, showPreviousYear)
  }), /*#__PURE__*/React.createElement(Button.Button, {
    variant: "tertiary",
    icon: polarisIcons.ArrowRightIcon,
    accessibilityLabel: i18n.translate('Polaris.DatePicker.nextMonth', {
      nextMonth,
      nextYear
    }),
    onClick: () => handleMonthChangeClick(showNextMonth, showNextYear)
  })), /*#__PURE__*/React.createElement("div", {
    className: DatePicker_module.default.MonthLayout
  }, /*#__PURE__*/React.createElement(Month.Month, {
    onFocus: handleFocus,
    focusedDate: focusDate,
    month: month,
    year: year,
    selected: deriveRange(selected),
    hoverDate: hoverDate,
    onChange: handleDateSelection,
    onHover: handleHover,
    disableDatesBefore: disableDatesBefore,
    disableDatesAfter: disableDatesAfter,
    disableSpecificDates: disableSpecificDates,
    allowRange: allowRange,
    weekStartsOn: weekStartsOn,
    accessibilityLabelPrefixes: accessibilityLabelPrefixes
  }), secondDatePicker));
}
function noop() {}
function handleKeyDown(event) {
  const {
    key
  } = event;
  if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
    event.preventDefault();
    event.stopPropagation();
  }
}
function deriveRange(selected) {
  return selected instanceof Date ? {
    start: selected,
    end: selected
  } : selected;
}

exports.DatePicker = DatePicker;
