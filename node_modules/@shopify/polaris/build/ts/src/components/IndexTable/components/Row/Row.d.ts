import React from 'react';
import type { Range } from '../../../../utilities/index-provider/types';
type RowType = 'data' | 'subheader' | 'child';
type RowStatus = 'subdued' | 'success' | 'warning' | 'critical';
export interface RowProps {
    /** Table header or data cells */
    children: React.ReactNode;
    /** A unique identifier for the row */
    id: string;
    /** Whether the row should hide the selectable checkbox while the parent IndexTable is selectable */
    hideSelectable?: boolean;
    /** Whether the row is selected */
    selected?: boolean | 'indeterminate';
    /** The zero-indexed position of the row. Used for Shift key multi-selection */
    position: number;
    /** Whether the row should visually indicate its status with a background color */
    tone?: RowStatus;
    /** Whether the row should be disabled */
    disabled?: boolean;
    /** A tuple array with the first and last index of the range of other rows that this row describes. All rows in the range are selected when the selection range row is selected. */
    selectionRange?: Range;
    /**
     * Indicates the relationship or role of the row's contents. A "subheader" row displays the same as the table header. Rows of type "child" are indented.
     *  @default 'data' */
    rowType?: RowType;
    /** Label set on the row's checkbox
     * @default "Select {resourceName}"
     */
    accessibilityLabel?: string;
    /** Callback fired when the row is clicked and contains a data-primary-link */
    onNavigation?(id: string): void;
    /** Callback fired when the row is clicked. Overrides the default click behaviour. */
    onClick?(): void;
}
export declare const Row: React.NamedExoticComponent<RowProps>;
export {};
//# sourceMappingURL=Row.d.ts.map