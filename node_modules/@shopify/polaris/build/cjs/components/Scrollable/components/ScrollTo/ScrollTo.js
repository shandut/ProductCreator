'use strict';

var React = require('react');
var context = require('../../context.js');

function ScrollTo() {
  const anchorNode = React.useRef(null);
  const scrollToPosition = React.useContext(context.ScrollableContext);
  React.useEffect(() => {
    if (!scrollToPosition || !anchorNode.current) {
      return;
    }
    scrollToPosition(anchorNode.current.offsetTop);
  }, [scrollToPosition]);
  const id = React.useId();
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  return /*#__PURE__*/React.createElement("a", {
    id: id,
    ref: anchorNode
  });
}

exports.ScrollTo = ScrollTo;
