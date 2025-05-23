'use strict';

var React = require('react');
var debounce = require('../../../../utilities/debounce.js');
var css = require('../../../../utilities/css.js');
var types = require('../../../../types.js');
var RangeSlider_module = require('../../RangeSlider.css.js');
var DualThumb_module = require('./DualThumb.css.js');
var Text = require('../../../Text/Text.js');
var Labelled = require('../../../Labelled/Labelled.js');
var Label = require('../../../Label/Label.js');
var EventListener = require('../../../EventListener/EventListener.js');
var context = require('../../../../utilities/features/context.js');

var Control = /*#__PURE__*/function (Control) {
  Control[Control["Lower"] = 0] = "Lower";
  Control[Control["Upper"] = 1] = "Upper";
  return Control;
}(Control || {});
class DualThumb extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      value: sanitizeValue(this.props.value, this.props.min, this.props.max, this.props.step),
      trackWidth: 0,
      trackLeft: 0
    };
    this.track = /*#__PURE__*/React.createRef();
    this.trackWrapper = /*#__PURE__*/React.createRef();
    this.thumbLower = /*#__PURE__*/React.createRef();
    this.thumbUpper = /*#__PURE__*/React.createRef();
    this.setTrackPosition = debounce.debounce(() => {
      if (this.track.current) {
        const thumbSize = 16;
        const {
          width,
          left
        } = this.track.current.getBoundingClientRect();
        const adjustedTrackWidth = width - thumbSize;
        const adjustedTrackLeft = left + thumbSize / 2;
        const range = this.props.max - this.props.min;
        const minValuePosition = this.props.min / range * adjustedTrackWidth;
        this.setState({
          trackWidth: adjustedTrackWidth,
          trackLeft: adjustedTrackLeft - minValuePosition
        });
      }
    }, 40, {
      leading: true,
      trailing: true,
      maxWait: 40
    });
    this.handleMouseDownThumbLower = event => {
      if (event.button !== 0 || this.props.disabled) return;
      registerMouseMoveHandler(this.handleMouseMoveThumbLower);
      event.stopPropagation();
    };
    this.handleMouseMoveThumbLower = event => {
      const valueUpper = this.state.value[1];
      this.setValue([this.actualXPosition(event.clientX), valueUpper], Control.Upper);
    };
    this.handleTouchStartThumbLower = event => {
      if (this.props.disabled) return;
      registerTouchMoveHandler(this.handleTouchMoveThumbLower);
      event.stopPropagation();
    };
    this.handleTouchMoveThumbLower = event => {
      event.preventDefault();
      const valueUpper = this.state.value[1];
      this.setValue([this.actualXPosition(event.touches[0].clientX), valueUpper], Control.Upper);
    };
    this.handleMouseDownThumbUpper = event => {
      if (event.button !== 0 || this.props.disabled) return;
      registerMouseMoveHandler(this.handleMouseMoveThumbUpper);
      event.stopPropagation();
    };
    this.handleMouseMoveThumbUpper = event => {
      const valueLower = this.state.value[0];
      this.setValue([valueLower, this.actualXPosition(event.clientX)], Control.Lower);
    };
    this.handleTouchStartThumbUpper = event => {
      if (this.props.disabled) return;
      registerTouchMoveHandler(this.handleTouchMoveThumbUpper);
      event.stopPropagation();
    };
    this.handleTouchMoveThumbUpper = event => {
      event.preventDefault();
      const valueLower = this.state.value[0];
      this.setValue([valueLower, this.actualXPosition(event.touches[0].clientX)], Control.Lower);
    };
    this.handleKeypressLower = event => {
      if (this.props.disabled) return;
      const {
        incrementValueLower,
        decrementValueLower
      } = this;
      const handlerMap = {
        [types.Key.UpArrow]: incrementValueLower,
        [types.Key.RightArrow]: incrementValueLower,
        [types.Key.DownArrow]: decrementValueLower,
        [types.Key.LeftArrow]: decrementValueLower
      };
      const handler = handlerMap[event.keyCode];
      if (handler != null) {
        event.preventDefault();
        event.stopPropagation();
        handler();
      }
    };
    this.handleKeypressUpper = event => {
      if (this.props.disabled) return;
      const {
        incrementValueUpper,
        decrementValueUpper
      } = this;
      const handlerMap = {
        [types.Key.UpArrow]: incrementValueUpper,
        [types.Key.RightArrow]: incrementValueUpper,
        [types.Key.DownArrow]: decrementValueUpper,
        [types.Key.LeftArrow]: decrementValueUpper
      };
      const handler = handlerMap[event.keyCode];
      if (handler != null) {
        event.preventDefault();
        event.stopPropagation();
        handler();
      }
    };
    this.incrementValueLower = () => {
      this.setValue([this.state.value[0] + this.props.step, this.state.value[1]], Control.Upper);
    };
    this.decrementValueLower = () => {
      this.setValue([this.state.value[0] - this.props.step, this.state.value[1]], Control.Upper);
    };
    this.incrementValueUpper = () => {
      this.setValue([this.state.value[0], this.state.value[1] + this.props.step], Control.Lower);
    };
    this.decrementValueUpper = () => {
      this.setValue([this.state.value[0], this.state.value[1] - this.props.step], Control.Lower);
    };
    this.dispatchValue = () => {
      const {
        onChange,
        id
      } = this.props;
      const {
        value
      } = this.state;
      onChange(value, id);
    };
    this.setValue = (dirtyValue, control) => {
      const {
        props: {
          min,
          max,
          step
        },
        state: {
          value
        }
      } = this;
      const sanitizedValue = sanitizeValue(dirtyValue, min, max, step, control);
      if (isTupleEqual(sanitizedValue, value) === false) {
        this.setState({
          value: sanitizedValue
        }, this.dispatchValue);
      }
    };
    this.handleMouseDownTrack = event => {
      if (event.button !== 0 || this.props.disabled) return;
      event.preventDefault();
      const clickXPosition = this.actualXPosition(event.clientX);
      const {
        value
      } = this.state;
      const distanceFromLowerThumb = Math.abs(value[0] - clickXPosition);
      const distanceFromUpperThumb = Math.abs(value[1] - clickXPosition);
      if (distanceFromLowerThumb <= distanceFromUpperThumb) {
        this.setValue([clickXPosition, value[1]], Control.Upper);
        registerMouseMoveHandler(this.handleMouseMoveThumbLower);
        if (this.thumbLower.current != null) {
          this.thumbLower.current.focus();
        }
      } else {
        this.setValue([value[0], clickXPosition], Control.Lower);
        registerMouseMoveHandler(this.handleMouseMoveThumbUpper);
        if (this.thumbUpper.current != null) {
          this.thumbUpper.current.focus();
        }
      }
    };
    this.handleTouchStartTrack = event => {
      if (this.props.disabled) return;
      event.preventDefault();
      const clickXPosition = this.actualXPosition(event.touches[0].clientX);
      const {
        value
      } = this.state;
      const distanceFromLowerThumb = Math.abs(value[0] - clickXPosition);
      const distanceFromUpperThumb = Math.abs(value[1] - clickXPosition);
      if (distanceFromLowerThumb <= distanceFromUpperThumb) {
        this.setValue([clickXPosition, value[1]], Control.Upper);
        registerTouchMoveHandler(this.handleTouchMoveThumbLower);
        if (this.thumbLower.current != null) {
          this.thumbLower.current.focus();
        }
      } else {
        this.setValue([value[0], clickXPosition], Control.Lower);
        registerTouchMoveHandler(this.handleTouchMoveThumbUpper);
        if (this.thumbUpper.current != null) {
          this.thumbUpper.current.focus();
        }
      }
    };
    this.actualXPosition = dirtyXPosition => {
      if (this.track.current) {
        const {
          min,
          max
        } = this.props;
        const {
          trackLeft,
          trackWidth
        } = this.state;
        const relativeX = dirtyXPosition - trackLeft;
        const percentageOfTrack = relativeX / trackWidth;
        return percentageOfTrack * (max - min);
      } else {
        return 0;
      }
    };
  }
  static getDerivedStateFromProps(props, state) {
    const {
      min,
      step,
      max,
      value,
      onChange,
      id
    } = props;
    const {
      prevValue
    } = state;
    if (isTupleEqual(prevValue, value)) {
      return null;
    }
    const sanitizedValue = sanitizeValue(value, min, max, step);
    if (!isTupleEqual(value, sanitizedValue)) {
      onChange(sanitizedValue, id);
    }
    return {
      prevValue: value,
      value: sanitizedValue
    };
  }
  componentDidMount() {
    this.setTrackPosition();
    if (this.trackWrapper.current != null) {
      this.trackWrapper.current.addEventListener('touchstart', this.handleTouchStartTrack, {
        passive: false
      });
    }
  }
  componentWillUnmount() {
    if (this.trackWrapper.current != null) {
      this.trackWrapper.current.removeEventListener('touchstart', this.handleTouchStartTrack);
    }
  }
  render() {
    const {
      id,
      min,
      max,
      prefix,
      suffix,
      disabled,
      output,
      error,
      onFocus,
      onBlur,
      label,
      labelAction,
      labelHidden,
      helpText
    } = this.props;
    const {
      value
    } = this.state;
    const idLower = id;
    const idUpper = `${id}Upper`;
    const describedBy = [];
    if (error) {
      describedBy.push(`${id}Error`);
    }
    const ariaDescribedBy = describedBy.length ? describedBy.join(' ') : undefined;
    const trackWrapperClassName = css.classNames(DualThumb_module.default.TrackWrapper, error && DualThumb_module.default.error, disabled && DualThumb_module.default.disabled);
    const thumbLowerClassName = css.classNames(DualThumb_module.default.Thumbs, DualThumb_module.default.ThumbLower, disabled && DualThumb_module.default.disabled);
    const thumbUpperClassName = css.classNames(DualThumb_module.default.Thumbs, DualThumb_module.default.ThumbUpper, disabled && DualThumb_module.default.disabled);
    const trackWidth = this.state.trackWidth;
    const range = max - min;
    const minValuePosition = min / range * trackWidth;
    const leftPositionThumbLower = value[0] / range * trackWidth - minValuePosition;
    const leftPositionThumbUpper = value[1] / range * trackWidth - minValuePosition;
    const outputLowerClassName = css.classNames(DualThumb_module.default.Output, DualThumb_module.default.OutputLower);
    const outputMarkupLower = !disabled && output ? /*#__PURE__*/React.createElement("output", {
      htmlFor: idLower,
      className: outputLowerClassName,
      style: {
        left: `${leftPositionThumbLower}px`
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: DualThumb_module.default.OutputBubble
    }, /*#__PURE__*/React.createElement(Text.Text, {
      as: "span",
      variant: "headingSm",
      alignment: "center"
    }, value[0]))) : null;
    const outputUpperClassName = css.classNames(DualThumb_module.default.Output, DualThumb_module.default.OutputUpper);
    const outputMarkupUpper = !disabled && output ? /*#__PURE__*/React.createElement("output", {
      htmlFor: idUpper,
      className: outputUpperClassName,
      style: {
        left: `${leftPositionThumbUpper}px`
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: DualThumb_module.default.OutputBubble
    }, /*#__PURE__*/React.createElement(Text.Text, {
      as: "span",
      variant: "headingSm",
      alignment: "center"
    }, value[1]))) : null;
    const cssVars = {
      '--pc-range-slider-progress-lower': `${leftPositionThumbLower}px`,
      '--pc-range-slider-progress-upper': `${leftPositionThumbUpper}px`
    };
    const prefixMarkup = prefix && /*#__PURE__*/React.createElement("div", {
      className: DualThumb_module.default.Prefix
    }, prefix);
    const suffixMarkup = suffix && /*#__PURE__*/React.createElement("div", {
      className: DualThumb_module.default.Suffix
    }, suffix);
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Labelled.Labelled, {
      id: id,
      label: label,
      error: error,
      action: labelAction,
      labelHidden: labelHidden,
      helpText: helpText
    }, /*#__PURE__*/React.createElement("div", {
      className: css.classNames(DualThumb_module.default.DualThumb, RangeSlider_module.default.RangeSlider)
    }, prefixMarkup, /*#__PURE__*/React.createElement("div", {
      className: trackWrapperClassName,
      onMouseDown: this.handleMouseDownTrack,
      ref: this.trackWrapper
    }, /*#__PURE__*/React.createElement("div", {
      className: DualThumb_module.default.Track,
      style: cssVars,
      ref: this.track
    }), /*#__PURE__*/React.createElement("div", {
      className: RangeSlider_module.default['Track--dashed']
    }), /*#__PURE__*/React.createElement("div", {
      id: idLower,
      className: thumbLowerClassName,
      style: {
        left: `${leftPositionThumbLower}px`
      },
      role: "slider",
      "aria-disabled": disabled,
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-valuenow": value[0],
      "aria-invalid": Boolean(error),
      "aria-describedby": ariaDescribedBy,
      "aria-labelledby": Label.labelID(id),
      onFocus: onFocus,
      onBlur: onBlur,
      tabIndex: 0,
      onKeyDown: this.handleKeypressLower,
      onMouseDown: this.handleMouseDownThumbLower,
      onTouchStart: this.handleTouchStartThumbLower,
      ref: this.thumbLower
    }), outputMarkupLower, /*#__PURE__*/React.createElement("div", {
      id: idUpper,
      className: thumbUpperClassName,
      style: {
        left: `${leftPositionThumbUpper}px`
      },
      role: "slider",
      "aria-disabled": disabled,
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-valuenow": value[1],
      "aria-invalid": Boolean(error),
      "aria-describedby": ariaDescribedBy,
      "aria-labelledby": Label.labelID(id),
      onFocus: onFocus,
      onBlur: onBlur,
      tabIndex: 0,
      onKeyDown: this.handleKeypressUpper,
      onMouseDown: this.handleMouseDownThumbUpper,
      onTouchStart: this.handleTouchStartThumbUpper,
      ref: this.thumbUpper
    }), outputMarkupUpper), suffixMarkup)), /*#__PURE__*/React.createElement(EventListener.EventListener, {
      event: "resize",
      handler: this.setTrackPosition
    }));
  }
}
DualThumb.contextType = context.FeaturesContext;
function registerMouseMoveHandler(handler) {
  document.addEventListener('mousemove', handler);
  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', handler);
  }, {
    once: true
  });
}
function registerTouchMoveHandler(handler) {
  const removeHandler = () => {
    document.removeEventListener('touchmove', handler);
    document.removeEventListener('touchend', removeHandler);
    document.removeEventListener('touchcancel', removeHandler);
  };
  document.addEventListener('touchmove', handler, {
    passive: false
  });
  document.addEventListener('touchend', removeHandler, {
    once: true
  });
  document.addEventListener('touchcancel', removeHandler, {
    once: true
  });
}
function sanitizeValue(value, min, max, step, control = Control.Upper) {
  let upperValue = inBoundsUpper(roundedToStep(value[1]));
  let lowerValue = inBoundsLower(roundedToStep(value[0]));
  const maxLowerValue = upperValue - step;
  const minUpperValue = lowerValue + step;
  if (control === Control.Upper && lowerValue > maxLowerValue) {
    lowerValue = maxLowerValue;
  } else if (control === Control.Lower && upperValue < minUpperValue) {
    upperValue = minUpperValue;
  }
  return [lowerValue, upperValue];
  function inBoundsUpper(value) {
    const lowerMin = min + step;
    if (value < lowerMin) {
      return lowerMin;
    } else if (value > max) {
      return max;
    } else {
      return value;
    }
  }
  function inBoundsLower(value) {
    const upperMax = max - step;
    if (value < min) {
      return min;
    } else if (value > upperMax) {
      return upperMax;
    } else {
      return value;
    }
  }
  function roundedToStep(value) {
    return Math.round(value / step) * step;
  }
}

// eslint-disable-next-line id-length
function isTupleEqual(a, b) {
  if (a == null || b == null) {
    return false;
  }
  return a[0] === b[0] && a[1] === b[1];
}

exports.DualThumb = DualThumb;
