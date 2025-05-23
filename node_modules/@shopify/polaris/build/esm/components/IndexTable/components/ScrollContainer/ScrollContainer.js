import React, { useEffect, useState, useCallback } from 'react';
import { debounce } from '../../../../utilities/debounce.js';
import styles from './ScrollContainer.css.js';
import { scrollDefaultContext, ScrollContext } from '../../../../utilities/index-table/context.js';

function ScrollContainer({
  children,
  scrollableContainerRef,
  onScroll
}) {
  useEffect(() => {
    if (!scrollableContainerRef.current) return;
    scrollableContainerRef.current.dispatchEvent(new Event('scroll'));
  }, [scrollableContainerRef]);
  const [containerScroll, setContainerScroll] = useState(scrollDefaultContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = useCallback(debounce(() => {
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
  return /*#__PURE__*/React.createElement(ScrollContext.Provider, {
    value: containerScroll
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.ScrollContainer,
    ref: scrollableContainerRef,
    onScroll: handleScroll
  }, children));
}

export { ScrollContainer };
