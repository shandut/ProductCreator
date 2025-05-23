'use strict';

var React = require('react');
var debounce = require('../../../../utilities/debounce.js');
var ScrollContainer_module = require('./ScrollContainer.css.js');
var context = require('../../../../utilities/index-table/context.js');

function ScrollContainer({
  children,
  scrollableContainerRef,
  onScroll
}) {
  React.useEffect(() => {
    if (!scrollableContainerRef.current) return;
    scrollableContainerRef.current.dispatchEvent(new Event('scroll'));
  }, [scrollableContainerRef]);
  const [containerScroll, setContainerScroll] = React.useState(context.scrollDefaultContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = React.useCallback(debounce.debounce(() => {
    if (!scrollableContainerRef.current) {
      return;
    }
    const availableScrollAmount = scrollableContainerRef.current.scrollWidth - scrollableContainerRef.current.offsetWidth;
    const canScrollLeft = scrollableContainerRef.current.scrollLeft > 0;
    const canScrollRight = scrollableContainerRef.current.scrollLeft < availableScrollAmount;
    onScroll(canScrollLeft, canScrollRight);
    setContainerScroll({
      scrollableContainer: scrollableContainerRef.current,
      canScrollLeft,
      canScrollRight
    });
  }, 40, {
    trailing: true,
    leading: true,
    maxWait: 40
  }), [onScroll, scrollableContainerRef]);
  return /*#__PURE__*/React.createElement(context.ScrollContext.Provider, {
    value: containerScroll
  }, /*#__PURE__*/React.createElement("div", {
    className: ScrollContainer_module.default.ScrollContainer,
    ref: scrollableContainerRef,
    onScroll: handleScroll
  }, children));
}

exports.ScrollContainer = ScrollContainer;
