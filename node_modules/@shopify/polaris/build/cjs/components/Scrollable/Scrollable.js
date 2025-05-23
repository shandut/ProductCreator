'use strict';

var React = require('react');
var debounce = require('../../utilities/debounce.js');
var css = require('../../utilities/css.js');
var shared = require('../shared.js');
var useLazyRef = require('../../utilities/use-lazy-ref.js');
var useComponentDidMount = require('../../utilities/use-component-did-mount.js');
var context = require('./context.js');
var Scrollable_module = require('./Scrollable.css.js');
var ScrollTo = require('./components/ScrollTo/ScrollTo.js');
var stickyManager = require('../../utilities/sticky-manager/sticky-manager.js');
var context$1 = require('../../utilities/sticky-manager/context.js');

const MAX_SCROLL_HINT_DISTANCE = 100;
const LOW_RES_BUFFER = 2;
const ScrollableComponent = /*#__PURE__*/React.forwardRef(({
  children,
  className,
  horizontal = true,
  vertical = true,
  shadow,
  hint,
  focusable,
  scrollbarWidth = 'thin',
  scrollbarGutter,
  onScrolledToBottom,
  ...rest
}, forwardedRef) => {
  const [topShadow, setTopShadow] = React.useState(false);
  const [bottomShadow, setBottomShadow] = React.useState(false);
  const stickyManager$1 = useLazyRef.useLazyRef(() => new stickyManager.StickyManager());
  const scrollArea = React.useRef(null);
  const scrollTo = React.useCallback((scrollY, options = {}) => {
    const optionsBehavior = options.behavior || 'smooth';
    const behavior = prefersReducedMotion() ? 'auto' : optionsBehavior;
    // @ts-expect-error TS removed "instant" option but browsers support it.
    scrollArea.current?.scrollTo({
      top: scrollY,
      behavior
    });
  }, []);
  const defaultRef = React.useRef();
  React.useImperativeHandle(forwardedRef || defaultRef, () => ({
    scrollTo
  }));
  const handleScroll = React.useCallback(() => {
    const currentScrollArea = scrollArea.current;
    if (!currentScrollArea) {
      return;
    }
    requestAnimationFrame(() => {
      const {
        scrollTop,
        clientHeight,
        scrollHeight
      } = currentScrollArea;
      const canScroll = Boolean(scrollHeight > clientHeight);
      const isBelowTopOfScroll = Boolean(scrollTop > 0);
      const isAtBottomOfScroll = Boolean(scrollTop + clientHeight >= scrollHeight - LOW_RES_BUFFER);
      setTopShadow(isBelowTopOfScroll);
      setBottomShadow(!isAtBottomOfScroll);
      if (canScroll && isAtBottomOfScroll && onScrolledToBottom) {
        onScrolledToBottom();
      }
    });
  }, [onScrolledToBottom]);
  useComponentDidMount.useComponentDidMount(() => {
    handleScroll();
    if (hint) {
      requestAnimationFrame(() => performScrollHint(scrollArea.current));
    }
  });
  React.useEffect(() => {
    const currentScrollArea = scrollArea.current;
    if (!currentScrollArea) {
      return;
    }
    const handleResize = debounce.debounce(handleScroll, 50, {
      trailing: true
    });
    stickyManager$1.current?.setContainer(currentScrollArea);
    currentScrollArea.addEventListener('scroll', handleScroll);
    globalThis.addEventListener('resize', handleResize);
    return () => {
      currentScrollArea.removeEventListener('scroll', handleScroll);
      globalThis.removeEventListener('resize', handleResize);
    };
  }, [stickyManager$1, handleScroll]);
  const finalClassName = css.classNames(className, Scrollable_module.default.Scrollable, vertical && Scrollable_module.default.vertical, horizontal && Scrollable_module.default.horizontal, shadow && topShadow && Scrollable_module.default.hasTopShadow, shadow && bottomShadow && Scrollable_module.default.hasBottomShadow, scrollbarWidth && Scrollable_module.default[css.variationName('scrollbarWidth', scrollbarWidth)], scrollbarGutter && Scrollable_module.default[css.variationName('scrollbarGutter', scrollbarGutter.replace(' ', ''))]);
  return /*#__PURE__*/React.createElement(context.ScrollableContext.Provider, {
    value: scrollTo
  }, /*#__PURE__*/React.createElement(context$1.StickyManagerContext.Provider, {
    value: stickyManager$1.current
  }, /*#__PURE__*/React.createElement("div", Object.assign({
    className: finalClassName
  }, shared.scrollable.props, rest, {
    ref: scrollArea
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    ,
    tabIndex: focusable ? 0 : undefined
  }), children)));
});
ScrollableComponent.displayName = 'Scrollable';
function prefersReducedMotion() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (err) {
    return false;
  }
}
function performScrollHint(elem) {
  if (!elem || prefersReducedMotion()) {
    return;
  }
  const scrollableDistance = elem.scrollHeight - elem.clientHeight;
  const distanceToPeek = Math.min(MAX_SCROLL_HINT_DISTANCE, scrollableDistance) - LOW_RES_BUFFER;
  const goBackToTop = () => {
    requestAnimationFrame(() => {
      if (elem.scrollTop >= distanceToPeek) {
        elem.removeEventListener('scroll', goBackToTop);
        elem.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  };
  elem.addEventListener('scroll', goBackToTop);
  elem.scrollTo({
    top: MAX_SCROLL_HINT_DISTANCE,
    behavior: 'smooth'
  });
}
const forNode = node => {
  const closestElement = node.closest(shared.scrollable.selector);
  return closestElement instanceof HTMLElement ? closestElement : document;
};
// @ts-expect-error - expected functions/sub-components are assigned after declaration
const Scrollable = ScrollableComponent;
Scrollable.ScrollTo = ScrollTo.ScrollTo;
Scrollable.forNode = forNode;

exports.Scrollable = Scrollable;
