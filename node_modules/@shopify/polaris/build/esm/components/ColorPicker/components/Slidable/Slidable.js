import React, { PureComponent } from 'react';
import { isServer } from '../../../../utilities/target.js';
import styles from '../../ColorPicker.css.js';
import { EventListener } from '../../../EventListener/EventListener.js';

let isDragging = false;

// Required to solve a bug causing the underlying page/container to scroll
// while trying to drag the ColorPicker controls.
// This must be called as soon as possible to properly prevent the event.
// `passive: false` must also be set, as it seems webkit has changed the "default" behaviour
// https://bugs.webkit.org/show_bug.cgi?id=182521
if (!isServer) {
  window.addEventListener('touchmove', event => {
    if (!isDragging) {
      return;
    }
    event.preventDefault();
  }, {
    passive: false
  });
}
class Slidable extends PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      dragging: false
    };
    this.node = null;
    this.draggerNode = null;
    this.setDraggerNode = node => {
      this.draggerNode = node;
    };
    this.setNode = node => {
      this.node = node;
    };
    this.startDrag = event => {
      if (isMouseDownEvent(event)) {
        this.handleDraggerMove(event.clientX, event.clientY);
      }
      isDragging = true;
      this.setState({
        dragging: true
      });
    };
    this.handleDragEnd = () => {
      isDragging = false;
      this.setState({
        dragging: false
      });
    };
    this.handleMove = event => {
      event.stopImmediatePropagation();
      event.stopPropagation();
      if (event.cancelable) {
        event.preventDefault();
      }
      if (isMouseMoveEvent(event)) {
        this.handleDraggerMove(event.clientX, event.clientY);
        return;
      }
      this.handleDraggerMove(event.touches[0].clientX, event.touches[0].clientY);
    };
    this.handleDraggerMove = (x, y) => {
      if (this.node == null) {
        return;
      }
      const {
        onChange
      } = this.props;
      const rect = this.node.getBoundingClientRect();
      const offsetX = x - rect.left;
      const offsetY = y - rect.top;
      onChange({
        x: offsetX,
        y: offsetY
      });
    };
  }
  componentWillUnmount() {
    this.observer?.disconnect();
  }
  componentDidMount() {
    if (!this.node) {
      return;
    }
    this.observer = new ResizeObserver(() => {
      /**
       * This is a workaround to enable event listeners to be
       * re-attached when moving from one document to another
       * when using a React portal across iframes.
       * Using a resize observer works because when the clientWidth
       * will go from 0 to the real width after the node
       * gets rendered in its new place.
       */
      const {
        window
      } = this.state;
      if (window !== this.node?.ownerDocument.defaultView) {
        this.setState({
          window: this.node?.ownerDocument.defaultView
        });
      }
      this.handleResize();
    });
    this.observer.observe(this.node);
    this.handleResize();
  }
  render() {
    const {
      dragging,
      window
    } = this.state;
    const {
      draggerX = 0,
      draggerY = 0
    } = this.props;
    const draggerPositioning = {
      transform: `translate3d(${draggerX}px, ${draggerY}px, 0)`
    };
    const moveListener = dragging ? /*#__PURE__*/React.createElement(EventListener, {
      event: "mousemove",
      handler: this.handleMove,
      passive: false,
      window: window
    }) : null;
    const touchMoveListener = dragging ? /*#__PURE__*/React.createElement(EventListener, {
      event: "touchmove",
      handler: this.handleMove,
      passive: false,
      window: window
    }) : null;
    const endDragListener = dragging ? /*#__PURE__*/React.createElement(EventListener, {
      event: "mouseup",
      handler: this.handleDragEnd,
      window: window
    }) : null;
    const touchEndListener = dragging ? /*#__PURE__*/React.createElement(EventListener, {
      event: "touchend",
      handler: this.handleDragEnd,
      window: window
    }) : null;
    const touchCancelListener = dragging ? /*#__PURE__*/React.createElement(EventListener, {
      event: "touchcancel",
      handler: this.handleDragEnd,
      window: window
    }) : null;
    return /*#__PURE__*/React.createElement("div", {
      ref: this.setNode,
      className: styles.Slidable,
      onMouseDown: this.startDrag,
      onTouchStart: this.startDrag
    }, endDragListener, moveListener, touchMoveListener, touchEndListener, touchCancelListener, /*#__PURE__*/React.createElement("div", {
      style: draggerPositioning,
      className: styles.Dragger,
      ref: this.setDraggerNode
    }));
  }
  handleResize() {
    const {
      onDraggerHeight
    } = this.props;
    if (!onDraggerHeight) {
      return;
    }
    const {
      draggerNode
    } = this;
    if (!draggerNode) {
      return;
    }
    onDraggerHeight(draggerNode.clientWidth);
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        onDraggerHeight(draggerNode.clientWidth);
      }, 0);
    }
  }
}
function isMouseMoveEvent(event) {
  return event.type === 'mousemove';
}
function isMouseDownEvent(event) {
  return event.type === 'mousedown';
}

export { Slidable };
