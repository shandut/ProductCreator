'use strict';

var React = require('react');
var debounce = require('../../../../utilities/debounce.js');

const DEBOUNCE_PERIOD = 250;
function useIsSticky(mode, disabled, isFlushWhenSticky) {
  const hasIOSupport = typeof window !== 'undefined' && Boolean(window.IntersectionObserver);
  const options = {
    root: null,
    rootMargin: `${isFlushWhenSticky ? '0px' : '-56px'} 0px 0px 0px`,
    threshold: 0
  };
  const [indexFilteringHeight, setIndexFiltersHeight] = React.useState(0);
  const [isSticky, setIsSticky] = React.useState(false);
  const measurerRef = React.useRef(null);
  const intersectionRef = React.useRef(null);
  const handleIntersect = entries => {
    entries.forEach(entry => {
      setIsSticky(!entry.isIntersecting);
    });
  };
  const observerRef = React.useRef(hasIOSupport ? new IntersectionObserver(handleIntersect, options) : null);
  React.useEffect(() => {
    function computeDimensions() {
      const node = measurerRef.current;
      if (!node) {
        return {
          height: 0
        };
      }
      const box = node.getBoundingClientRect();
      const height = box.height;
      setIndexFiltersHeight(height);
    }
    computeDimensions();
    const debouncedComputeDimensions = debounce.debounce(computeDimensions, DEBOUNCE_PERIOD, {
      trailing: true
    });
    window.addEventListener('resize', debouncedComputeDimensions);
    return () => window.removeEventListener('resize', debouncedComputeDimensions);
  }, [measurerRef, mode]);
  React.useEffect(() => {
    const observer = observerRef.current;
    if (!observer) {
      return;
    }
    const node = intersectionRef.current;
    if (node) {
      observer.observe(node);
    }
    return () => {
      observer?.disconnect();
    };
  }, [intersectionRef]);
  return {
    intersectionRef: intersectionRef,
    measurerRef,
    isSticky: isSticky && !disabled,
    indexFilteringHeight
  };
}

exports.useIsSticky = useIsSticky;
