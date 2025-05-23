'use strict';

var React = require('react');
var ColorPicker_module = require('../../ColorPicker.css.js');
var utilities = require('./utilities.js');
var Slidable = require('../Slidable/Slidable.js');

class HuePicker extends React.PureComponent {
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
      const hue = utilities.hueForDraggerY(y, sliderHeight);
      onChange(hue);
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
      hue
    } = this.props;
    const {
      sliderHeight,
      draggerHeight
    } = this.state;
    const draggerY = utilities.calculateDraggerY(hue, sliderHeight, draggerHeight);
    return /*#__PURE__*/React.createElement("div", {
      className: ColorPicker_module.default.HuePicker,
      ref: this.setNode
    }, /*#__PURE__*/React.createElement(Slidable.Slidable, {
      draggerY: draggerY,
      draggerX: 0,
      onChange: this.handleChange,
      onDraggerHeight: this.setDraggerHeight
    }));
  }
}

exports.HuePicker = HuePicker;
