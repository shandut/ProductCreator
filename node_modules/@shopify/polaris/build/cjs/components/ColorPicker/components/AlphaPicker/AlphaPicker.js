'use strict';

var React = require('react');
var colorTransformers = require('../../../../utilities/color-transformers.js');
var ColorPicker_module = require('../../ColorPicker.css.js');
var utilities = require('./utilities.js');
var Slidable = require('../Slidable/Slidable.js');

class AlphaPicker extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      sliderHeight: 0,
      draggerHeight: 0
    };
    this.node = null;
    this.setNode = node => {
      if (!node) {
        return;
      }
      this.node = node;
    };
    this.setSliderHeight = () => {
      const {
        node
      } = this;
      if (!node) {
        return;
      }
      this.setState({
        sliderHeight: node.clientHeight
      });
      if (process.env.NODE_ENV === 'development') {
        setTimeout(() => {
          this.setState({
            sliderHeight: node.clientHeight
          });
        }, 0);
      }
    };
    this.setDraggerHeight = height => {
      this.setState({
        draggerHeight: height
      });
    };
    this.handleChange = ({
      y
    }) => {
      const {
        onChange
      } = this.props;
      const {
        sliderHeight
      } = this.state;
      const alpha = utilities.alphaForDraggerY(y, sliderHeight);
      onChange(alpha);
    };
  }
  componentWillUnmount() {
    this.observer?.disconnect();
  }
  componentDidMount() {
    if (!this.node) {
      return;
    }
    this.observer = new ResizeObserver(this.setSliderHeight);
    this.observer.observe(this.node);
    this.setSliderHeight();
  }
  render() {
    const {
      color,
      alpha
    } = this.props;
    const {
      sliderHeight,
      draggerHeight
    } = this.state;
    const draggerY = utilities.calculateDraggerY(alpha, sliderHeight, draggerHeight);
    const background = alphaGradientForColor(color);
    return /*#__PURE__*/React.createElement("div", {
      className: ColorPicker_module.default.AlphaPicker,
      ref: this.setNode
    }, /*#__PURE__*/React.createElement("div", {
      className: ColorPicker_module.default.ColorLayer,
      style: {
        background
      }
    }), /*#__PURE__*/React.createElement(Slidable.Slidable, {
      draggerY: draggerY,
      draggerX: 0,
      onChange: this.handleChange,
      onDraggerHeight: this.setDraggerHeight
    }));
  }
}
function alphaGradientForColor(color) {
  const {
    red,
    green,
    blue
  } = colorTransformers.hsbToRgb(color);
  const rgb = `${red}, ${green}, ${blue}`;
  return `linear-gradient(to top, rgba(${rgb}, 0) 18px, rgba(${rgb}, 1) calc(100% - 18px))`;
}

exports.AlphaPicker = AlphaPicker;
