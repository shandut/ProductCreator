import React, { PureComponent } from 'react';
import { classNames } from '../../utilities/css.js';
import { getRectForNode, Rect } from '../../utilities/geometry.js';
import { dataPolarisTopBar, layer } from '../shared.js';
import { windowRect, calculateVerticalPosition, calculateHorizontalPosition, rectIsOutsideOfRect, intersectionWithViewport } from './utilities/math.js';
import styles from './PositionedOverlay.css.js';
import { Scrollable } from '../Scrollable/Scrollable.js';
import { EventListener } from '../EventListener/EventListener.js';

const OBSERVER_CONFIG = {
  childList: true,
  subtree: true,
  characterData: true,
  attributeFilter: ['style']
};
class PositionedOverlay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      measuring: true,
      activatorRect: getRectForNode(this.props.activator),
      right: undefined,
      left: undefined,
      top: 0,
      height: 0,
      width: null,
      positioning: 'below',
      zIndex: null,
      outsideScrollableContainer: false,
      lockPosition: false,
      chevronOffset: 0
    };
    this.overlay = null;
    this.scrollableContainers = [];
    this.overlayDetails = () => {
      const {
        measuring,
        left,
        right,
        positioning,
        height,
        activatorRect,
        chevronOffset
      } = this.state;
      return {
        measuring,
        left,
        right,
        desiredHeight: height,
        positioning,
        activatorRect,
        chevronOffset
      };
    };
    this.setOverlay = node => {
      this.overlay = node;
    };
    this.setScrollableContainers = () => {
      const containers = [];
      let scrollableContainer = Scrollable.forNode(this.props.activator);
      if (scrollableContainer) {
        containers.push(scrollableContainer);
        while (scrollableContainer?.parentElement) {
          scrollableContainer = Scrollable.forNode(scrollableContainer.parentElement);
          containers.push(scrollableContainer);
        }
      }
      this.scrollableContainers = containers;
    };
    this.registerScrollHandlers = () => {
      this.scrollableContainers.forEach(node => {
        node.addEventListener('scroll', this.handleMeasurement);
      });
    };
    this.unregisterScrollHandlers = () => {
      this.scrollableContainers.forEach(node => {
        node.removeEventListener('scroll', this.handleMeasurement);
      });
    };
    this.handleMeasurement = () => {
      const {
        lockPosition,
        top
      } = this.state;
      this.observer.disconnect();
      this.setState(({
        left,
        top,
        right
      }) => ({
        left,
        right,
        top,
        height: 0,
        positioning: 'below',
        measuring: true
      }), () => {
        if (this.overlay == null || this.firstScrollableContainer == null) {
          return;
        }
        const {
          activator,
          preferredPosition = 'below',
          preferredAlignment = 'center',
          onScrollOut,
          fullWidth,
          fixed,
          preferInputActivator = true
        } = this.props;
        const document = activator.ownerDocument;
        const preferredActivator = preferInputActivator ? activator.querySelector('input') || activator : activator;
        const activatorRect = getRectForNode(preferredActivator);
        const currentOverlayRect = getRectForNode(this.overlay);
        const scrollableElement = isDocument(this.firstScrollableContainer) ? document.body : this.firstScrollableContainer;
        const scrollableContainerRect = getRectForNode(scrollableElement);
        const overlayRect = fullWidth || preferredPosition === 'cover' ? new Rect({
          ...currentOverlayRect,
          width: activatorRect.width
        }) : currentOverlayRect;

        // If `body` is 100% height, it still acts as though it were not constrained to that size. This adjusts for that.
        if (scrollableElement === document.body) {
          scrollableContainerRect.height = document.body.scrollHeight;
        }
        let topBarOffset = 0;
        const topBarElement = scrollableElement.querySelector(`${dataPolarisTopBar.selector}`);
        if (topBarElement) {
          topBarOffset = topBarElement.clientHeight;
        }
        let overlayMargins = {
          activator: 0,
          container: 0,
          horizontal: 0
        };
        if (this.overlay.firstElementChild) {
          const nodeMargins = getMarginsForNode(this.overlay.firstElementChild);
          overlayMargins = nodeMargins;
        }
        const containerRect = windowRect(activator);
        const zIndexForLayer = getZIndexForLayerFromNode(activator);
        const zIndex = zIndexForLayer == null ? zIndexForLayer : zIndexForLayer + 1;
        const verticalPosition = calculateVerticalPosition(activatorRect, overlayRect, overlayMargins, scrollableContainerRect, containerRect, preferredPosition, fixed, topBarOffset);
        const horizontalPosition = calculateHorizontalPosition(activatorRect, overlayRect, containerRect, overlayMargins, preferredAlignment);
        const chevronOffset = activatorRect.center.x - horizontalPosition + overlayMargins.horizontal * 2;
        this.setState({
          measuring: false,
          activatorRect: getRectForNode(activator),
          left: preferredAlignment !== 'right' ? horizontalPosition : undefined,
          right: preferredAlignment === 'right' ? horizontalPosition : undefined,
          top: lockPosition ? top : verticalPosition.top,
          lockPosition: Boolean(fixed),
          height: verticalPosition.height || 0,
          width: fullWidth || preferredPosition === 'cover' ? overlayRect.width : null,
          positioning: verticalPosition.positioning,
          outsideScrollableContainer: onScrollOut != null && rectIsOutsideOfRect(activatorRect, intersectionWithViewport(scrollableContainerRect, containerRect)),
          zIndex,
          chevronOffset
        }, () => {
          if (!this.overlay) return;
          this.observer.observe(this.overlay, OBSERVER_CONFIG);
          this.observer.observe(activator, OBSERVER_CONFIG);
        });
      });
    };
    this.observer = new MutationObserver(this.handleMeasurement);
  }
  componentDidMount() {
    this.setScrollableContainers();
    if (this.scrollableContainers.length && !this.props.fixed) {
      this.registerScrollHandlers();
    }
    this.handleMeasurement();
  }
  componentWillUnmount() {
    this.observer.disconnect();
    if (this.scrollableContainers.length && !this.props.fixed) {
      this.unregisterScrollHandlers();
    }
  }
  componentDidUpdate() {
    const {
      outsideScrollableContainer,
      top
    } = this.state;
    const {
      onScrollOut,
      active
    } = this.props;
    if (active && onScrollOut != null && top !== 0 && outsideScrollableContainer) {
      onScrollOut();
    }
  }
  render() {
    const {
      left,
      right,
      top,
      zIndex,
      width
    } = this.state;
    const {
      render,
      fixed,
      preventInteraction,
      classNames: propClassNames,
      zIndexOverride
    } = this.props;
    const style = {
      top: top == null || isNaN(top) ? undefined : top,
      left: left == null || isNaN(left) ? undefined : left,
      right: right == null || isNaN(right) ? undefined : right,
      width: width == null || isNaN(width) ? undefined : width,
      zIndex: zIndexOverride || zIndex || undefined
    };
    const className = classNames(styles.PositionedOverlay, fixed && styles.fixed, preventInteraction && styles.preventInteraction, propClassNames);
    return /*#__PURE__*/React.createElement("div", {
      className: className,
      style: style,
      ref: this.setOverlay
    }, /*#__PURE__*/React.createElement(EventListener, {
      event: "resize",
      handler: this.handleMeasurement,
      window: this.overlay?.ownerDocument.defaultView
    }), render(this.overlayDetails()));
  }
  get firstScrollableContainer() {
    return this.scrollableContainers[0] ?? null;
  }
  forceUpdatePosition() {
    // Wait a single animation frame before re-measuring.
    // Consumer's may also need to setup their own timers for
    // triggering forceUpdatePosition() `children` use animation.
    // Ideally, forceUpdatePosition() is fired at the end of a transition event.
    requestAnimationFrame(this.handleMeasurement);
  }
}
function getMarginsForNode(node) {
  // Accounts for when the node is moved between documents
  const window = node.ownerDocument.defaultView || globalThis.window;
  const nodeStyles = window.getComputedStyle(node);
  return {
    activator: parseFloat(nodeStyles.marginTop || '0'),
    container: parseFloat(nodeStyles.marginBottom || '0'),
    horizontal: parseFloat(nodeStyles.marginLeft || '0')
  };
}
function getZIndexForLayerFromNode(node) {
  const layerNode = node.closest(layer.selector) || node.ownerDocument.body;
  const zIndex = layerNode === node.ownerDocument.body ? 'auto' : parseInt(window.getComputedStyle(layerNode).zIndex || '0', 10);
  return zIndex === 'auto' || isNaN(zIndex) ? null : zIndex;
}
function isDocument(node) {
  return node.ownerDocument === null;
}

export { PositionedOverlay };
