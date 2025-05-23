import React, { PureComponent } from 'react';
import styles from '../../ColorPicker.css.js';
import { hueForDraggerY, calculateDraggerY } from './utilities.js';
import { Slidable } from '../Slidable/Slidable.js';

class HuePicker extends PureComponent {
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
      const hue = hueForDraggerY(y, sliderHeight);
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
    const draggerY = calculateDraggerY(hue, sliderHeight, draggerHeight);
    return /*#__PURE__*/React.createElement("div", {
      className: styles.HuePicker,
      ref: this.setNode
    }, /*#__PURE__*/React.createElement(Slidable, {
      draggerY: draggerY,
      draggerX: 0,
      onChange: this.handleChange,
      onDraggerHeight: this.setDraggerHeight
    }));
  }
}

export { HuePicker };
