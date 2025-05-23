'use strict';

var React = require('react');
var debounce = require('../../utilities/debounce.js');
var clamp = require('../../utilities/clamp.js');
var css = require('../../utilities/css.js');
var colorTransformers = require('../../utilities/color-transformers.js');
var ColorPicker_module = require('./ColorPicker.css.js');
var AlphaPicker = require('./components/AlphaPicker/AlphaPicker.js');
var HuePicker = require('./components/HuePicker/HuePicker.js');
var Slidable = require('./components/Slidable/Slidable.js');

const RESIZE_DEBOUNCE_TIME_MS = 200;
class ColorPicker extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      pickerSize: {
        width: 0,
        height: 0
      }
    };
    this.colorNode = null;
    this.handleResize = debounce.debounce(() => {
      const {
        colorNode
      } = this;
      if (colorNode == null) {
        return;
      }
      this.setState({
        pickerSize: {
          width: colorNode.clientWidth,
          height: colorNode.clientHeight
        }
      });
    }, RESIZE_DEBOUNCE_TIME_MS, {
      leading: true,
      trailing: true,
      maxWait: RESIZE_DEBOUNCE_TIME_MS
    });
    this.setColorNode = node => {
      this.colorNode = node;
    };
    this.handleHueChange = hue => {
      const {
        color: {
          brightness,
          saturation,
          alpha = 1
        },
        onChange
      } = this.props;
      onChange({
        hue,
        brightness,
        saturation,
        alpha
      });
    };
    this.handleAlphaChange = alpha => {
      const {
        color: {
          hue,
          brightness,
          saturation
        },
        onChange
      } = this.props;
      onChange({
        hue,
        brightness,
        saturation,
        alpha
      });
    };
    this.handleDraggerMove = ({
      x,
      y
    }) => {
      const {
        pickerSize
      } = this.state;
      const {
        color: {
          hue,
          alpha = 1
        },
        onChange
      } = this.props;
      const saturation = clamp.clamp(x / pickerSize.width, 0, 1);
      const brightness = clamp.clamp(1 - y / pickerSize.height, 0, 1);
      onChange({
        hue,
        saturation,
        brightness,
        alpha
      });
    };
    this.handlePickerDrag = event => {
      // prevents external elements from being selected
      event.preventDefault();
    };
  }
  componentWillUnmount() {
    this.observer?.disconnect();
  }
  componentDidMount() {
    const {
      colorNode
    } = this;
    if (!colorNode) {
      return;
    }
    this.observer = new ResizeObserver(this.handleResize);
    this.observer.observe(colorNode);
    this.setState({
      pickerSize: {
        width: colorNode.clientWidth,
        height: colorNode.clientHeight
      }
    });
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        this.setState({
          pickerSize: {
            width: colorNode.clientWidth,
            height: colorNode.clientHeight
          }
        });
      }, 0);
    }
  }
  render() {
    const {
      id,
      color,
      allowAlpha,
      fullWidth
    } = this.props;
    const {
      hue,
      saturation,
      brightness,
      alpha: providedAlpha
    } = color;
    const {
      pickerSize
    } = this.state;
    const alpha = providedAlpha != null && allowAlpha ? providedAlpha : 1;
    const {
      red,
      green,
      blue
    } = colorTransformers.hsbToRgb({
      hue,
      saturation: 1,
      brightness: 1
    });
    const colorString = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    const draggerX = clamp.clamp(saturation * pickerSize.width, 0, pickerSize.width);
    const draggerY = clamp.clamp(pickerSize.height - brightness * pickerSize.height, 0, pickerSize.height);
    const alphaSliderMarkup = allowAlpha ? /*#__PURE__*/React.createElement(AlphaPicker.AlphaPicker, {
      alpha: alpha,
      color: color,
      onChange: this.handleAlphaChange
    }) : null;
    const className = css.classNames(ColorPicker_module.default.ColorPicker, fullWidth && ColorPicker_module.default.fullWidth);
    return /*#__PURE__*/React.createElement("div", {
      className: className,
      id: id,
      onMouseDown: this.handlePickerDrag
    }, /*#__PURE__*/React.createElement("div", {
      ref: this.setColorNode,
      className: ColorPicker_module.default.MainColor
    }, /*#__PURE__*/React.createElement("div", {
      className: ColorPicker_module.default.ColorLayer,
      style: {
        backgroundColor: colorString
      }
    }), /*#__PURE__*/React.createElement(Slidable.Slidable, {
      onChange: this.handleDraggerMove,
      draggerX: draggerX,
      draggerY: draggerY
    })), /*#__PURE__*/React.createElement(HuePicker.HuePicker, {
      hue: hue,
      onChange: this.handleHueChange
    }), alphaSliderMarkup);
  }
}

exports.ColorPicker = ColorPicker;
