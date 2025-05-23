'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var useComponentDidMount = require('../../../../utilities/use-component-did-mount.js');
var useEventListener = require('../../../../utilities/use-event-listener.js');
var Tabs_module = require('../../Tabs.css.js');
var Tab = require('../Tab/Tab.js');

const TabMeasurer = /*#__PURE__*/React.memo(function TabMeasurer({
  selected,
  tabs,
  activator,
  tabToFocus,
  siblingTabHasFocus,
  handleMeasurement: handleMeasurementProp
}) {
  const containerNode = React.useRef(null);
  const animationFrame = React.useRef(null);
  const handleMeasurement = React.useCallback(() => {
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
    animationFrame.current = requestAnimationFrame(() => {
      if (!containerNode.current) {
        return;
      }
      const containerWidth = containerNode.current.offsetWidth - 20 - 28;
      const hiddenTabNodes = containerNode.current.children;
      const hiddenTabNodesArray = Array.from(hiddenTabNodes);
      const hiddenTabWidths = hiddenTabNodesArray.map(node => {
        const buttonWidth = Math.ceil(node.getBoundingClientRect().width);
        return buttonWidth + 4;
      });
      const disclosureWidth = hiddenTabWidths.pop() || 0;
      handleMeasurementProp({
        containerWidth,
        disclosureWidth,
        hiddenTabWidths
      });
    });
  }, [handleMeasurementProp]);
  React.useEffect(() => {
    handleMeasurement();
  }, [handleMeasurement, tabs]);
  useComponentDidMount.useComponentDidMount(() => {
    if (process.env.NODE_ENV === 'development') {
      setTimeout(handleMeasurement, 0);
    }
  });
  const tabsMarkup = tabs.map((tab, index) => {
    return /*#__PURE__*/React.createElement(Tab.Tab, {
      measuring: true,
      key: `$${tab.id}Hidden`,
      id: `${tab.id}Measurer`,
      siblingTabHasFocus: siblingTabHasFocus,
      focused: index === tabToFocus,
      selected: index === selected,
      url: tab.url,
      content: tab.content,
      onTogglePopover: noop,
      onToggleModal: noop
    });
  });
  const classname = css.classNames(Tabs_module.default.Tabs, Tabs_module.default.TabsMeasurer);
  useEventListener.useEventListener('resize', handleMeasurement);
  return /*#__PURE__*/React.createElement("div", {
    className: classname,
    ref: containerNode
  }, tabsMarkup, activator);
});
function noop() {}

exports.TabMeasurer = TabMeasurer;
