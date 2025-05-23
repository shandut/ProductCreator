'use strict';

var React = require('react');

/**
 * useDisableInteraction provides the original event handler but disables interaction
 * if the boolean passed is true.
 * @param disabled - A boolean value that determines if the button should
 * be disabled
 * @param handleEvent - The original event handler
 * @returns Function - The original event handler but with interactions disabled if the
 * provided boolean is true
 * @example
 * function ComponentExample() {
 * const handleClick = () => {
 *  console.log('disable me');
 * };
 * const handleClickEvent = useDisableInteraction(true, handleClick);
 * return <button onClick={handleClickEvent}>Im Disabled</button>;
 * }
 */

function useDisableClick(disabled, handleClick) {
  const handleClickWrapper = React.useCallback(event => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, [disabled]);
  if (!disabled) {
    return handleClick;
  }
  return handleClickWrapper;
}

exports.useDisableClick = useDisableClick;
