import React from 'react';
import type { Action } from '../../types';
export interface SelectAllActionsProps {
    /** Label for the bulk actions */
    label?: string;
    /** List is in a selectable state */
    selectMode?: boolean;
    /** Text to select all across pages */
    paginatedSelectAllText?: string;
    /** Action for selecting all across pages */
    paginatedSelectAllAction?: Action;
    /** Disables bulk actions */
    disabled?: boolean;
    /** If the BulkActions is currently sticky in view */
    isSticky?: boolean;
    /** Whether there is a Pagination element on the associated table. Disables the vertical appear animation if so */
    hasPagination?: boolean;
    /** @deprecated Visually hidden text for screen readers */
    accessibilityLabel?: string;
    /** @deprecated State of the bulk actions checkbox */
    selected?: boolean | 'indeterminate';
    /** @deprecated Callback when the select all checkbox is clicked */
    onToggleAll?(): void;
}
/**
 * @deprecated Use `BulkActions` instead.
 */
export declare const SelectAllActions: React.ForwardRefExoticComponent<SelectAllActionsProps & React.RefAttributes<unknown>>;
//# sourceMappingURL=SelectAllActions.d.ts.map