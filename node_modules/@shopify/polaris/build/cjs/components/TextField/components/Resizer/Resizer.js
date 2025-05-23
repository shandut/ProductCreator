'use strict';

var React = require('react');
var useIsomorphicLayoutEffect = require('../../../../utilities/use-isomorphic-layout-effect.js');
var TextField_module = require('../../TextField.css.js');
var EventListener = require('../../../EventListener/EventListener.js');

function Resizer({
  contents,
  currentHeight: currentHeightProp = null,
  minimumLines,
  onHeightChange
}) {
  const contentNode = React.useRef(null);
  const minimumLinesNode = React.useRef(null);
  const animationFrame = React.useRef();
  const currentHeight = React.useRef(currentHeightProp);
  if (currentHeightProp !== currentHeight.current) {
    currentHeight.current = currentHeightProp;
  }
  React.useEffect(() => {
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);
  const minimumLinesMarkup = minimumLines ? /*#__PURE__*/React.createElement("div", {
    ref: minimumLinesNode,
    className: TextField_module.default.DummyInput,
    dangerouslySetInnerHTML: {
      __html: getContentsForMinimumLines(minimumLines)
    }
  }) : null;
  const handleHeightCheck = React.useCallback(() => {
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
    animationFrame.current = requestAnimationFrame(() => {
      if (!contentNode.current || !minimumLinesNode.current) {
        return;
      }
      const newHeight = Math.max(contentNode.current.offsetHeight, minimumLinesNode.current.offsetHeight);
      if (newHeight !== currentHeight.current) {
        onHeightChange(newHeight);
      }
    });
  }, [onHeightChange]);
  useIsomorphicLayoutEffect.useIsomorphicLayoutEffect(() => {
    handleHeightCheck();
  });
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    className: TextField_module.default.Resizer
  }, /*#__PURE__*/React.createElement(EventListener.EventListener, {
    event: "resize",
    handler: handleHeightCheck
  }), /*#__PURE__*/React.createElement("div", {
    ref: contentNode,
    className: TextField_module.default.DummyInput,
    dangerouslySetInnerHTML: {
      __html: getFinalContents(contents)
    }
  }), minimumLinesMarkup);
}
const ENTITIES_TO_REPLACE = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '\n': '<br>',
  '\r': ''
};
const REPLACE_REGEX = new RegExp(`[${Object.keys(ENTITIES_TO_REPLACE).join()}]`, 'g');
function replaceEntity(entity) {
  return ENTITIES_TO_REPLACE[entity];
}
function getContentsForMinimumLines(minimumLines) {
  let content = '';
  for (let line = 0; line < minimumLines; line++) {
    content += '<br>';
  }
  return content;
}
function getFinalContents(contents) {
  return contents ? `${contents.replace(REPLACE_REGEX, replaceEntity)}<br>` : '<br>';
}

exports.Resizer = Resizer;
