'use strict';

function measureColumn(tableData) {
  return function (column, index) {
    const {
      firstVisibleColumnIndex,
      tableLeftVisibleEdge: tableStart,
      tableRightVisibleEdge: tableEnd
    } = tableData;
    const leftEdge = column.offsetLeft;
    const rightEdge = leftEdge + column.offsetWidth;
    const isVisibleLeft = isEdgeVisible(leftEdge, tableStart, tableEnd, 'left');
    const isVisibleRight = isEdgeVisible(rightEdge, tableStart, tableEnd, 'right');
    const isVisible = isVisibleLeft || isVisibleRight;
    const width = column.offsetWidth;
    if (isVisible) {
      tableData.firstVisibleColumnIndex = Math.min(firstVisibleColumnIndex, index);
    }
    return {
      leftEdge,
      rightEdge,
      isVisible,
      width,
      index
    };
  };
}
function isEdgeVisible(position, start, end, edgeType) {
  const minVisiblePixels = 30;
  return position >= start + (edgeType === 'left' ? 0 : minVisiblePixels) && position <= end - minVisiblePixels;
}
function getPrevAndCurrentColumns(tableData, columnData) {
  const {
    firstVisibleColumnIndex
  } = tableData;
  const previousColumnIndex = Math.max(firstVisibleColumnIndex - 1, 0);
  const previousColumn = columnData[previousColumnIndex];
  const currentColumn = columnData[firstVisibleColumnIndex];
  return {
    previousColumn,
    currentColumn
  };
}

exports.getPrevAndCurrentColumns = getPrevAndCurrentColumns;
exports.isEdgeVisible = isEdgeVisible;
exports.measureColumn = measureColumn;
