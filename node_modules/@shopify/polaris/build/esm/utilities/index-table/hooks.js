import { useContext } from 'react';
import { RowHoveredContext, RowContext, ScrollContext } from './context.js';

function useRowHovered() {
  const hovered = useContext(RowHoveredContext);
  return hovered;
}
function useRowSelected() {
  const {
    selected
  } = useContext(RowContext);
  return selected;
}
function useContainerScroll() {
  const scrolledContainerRef = useContext(ScrollContext);
  return scrolledContainerRef;
}

export { useContainerScroll, useRowHovered, useRowSelected };
