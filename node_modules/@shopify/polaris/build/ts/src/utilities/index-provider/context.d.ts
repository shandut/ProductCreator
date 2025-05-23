/// <reference types="react" />
import type { SelectionType, SELECT_ALL_ITEMS, Range } from './types';
export interface IndexContextType {
    loading?: boolean;
    bulkSelectState?: boolean | 'indeterminate';
    resourceName: {
        singular: string;
        plural: string;
    };
    selectedItemsCount: typeof SELECT_ALL_ITEMS | number;
    bulkActionsAccessibilityLabel?: string;
    selectMode: boolean;
    paginatedSelectAllText?: string;
    itemCount: number;
    selectable?: boolean;
    hasMoreItems?: boolean;
    condensed?: boolean;
}
export declare const IndexContext: import("react").Context<IndexContextType | undefined>;
export declare const IndexSelectionChangeContext: import("react").Context<((selectionType: SelectionType, toggleType: boolean, selection?: string | Range, position?: number) => void) | undefined>;
export interface IndexRowContextType {
    selectable: boolean;
    selectMode: boolean;
    condensed?: boolean;
}
export declare const IndexRowContext: import("react").Context<IndexRowContextType | undefined>;
//# sourceMappingURL=context.d.ts.map