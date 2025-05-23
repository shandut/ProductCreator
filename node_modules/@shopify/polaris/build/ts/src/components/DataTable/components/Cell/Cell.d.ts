import React from 'react';
import type { FocusEventHandler } from 'react';
import type { SortDirection, VerticalAlign } from '../../types';
export interface CellProps {
    content?: React.ReactNode;
    contentType?: string;
    nthColumn?: boolean;
    firstColumn?: boolean;
    truncate?: boolean;
    header?: boolean;
    total?: boolean;
    totalInFooter?: boolean;
    sorted?: boolean;
    sortable?: boolean;
    sortDirection?: SortDirection;
    defaultSortDirection?: SortDirection;
    verticalAlign?: VerticalAlign;
    onSort?(): void;
    colSpan?: number;
    setRef?: (ref: HTMLTableCellElement | null) => void;
    stickyHeadingCell?: boolean;
    stickyCellWidth?: number;
    hovered?: boolean;
    handleFocus?: FocusEventHandler;
    inFixedNthColumn?: boolean;
    hasFixedNthColumn?: boolean;
    fixedCellVisible?: boolean;
    firstColumnMinWidth?: string;
    style?: React.CSSProperties;
    lastFixedFirstColumn?: boolean;
}
export declare function Cell({ content, contentType, nthColumn, firstColumn, truncate, header, total, totalInFooter, sorted, sortable, sortDirection, inFixedNthColumn, verticalAlign, defaultSortDirection, onSort, colSpan, setRef, stickyHeadingCell, stickyCellWidth, hovered, handleFocus, hasFixedNthColumn, fixedCellVisible, firstColumnMinWidth, style, lastFixedFirstColumn, }: CellProps): React.JSX.Element;
//# sourceMappingURL=Cell.d.ts.map