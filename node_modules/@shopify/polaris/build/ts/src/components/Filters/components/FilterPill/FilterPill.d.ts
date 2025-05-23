import React from 'react';
import type { FilterInterface } from '../../../../types';
export interface FilterPillProps extends FilterInterface {
    /** Whether the filter is newly applied or updated and hasn't been saved */
    unsavedChanges?: boolean;
    /** A unique identifier for the filter */
    filterKey: string;
    /** Whether the filter is selected or not */
    selected?: boolean;
    /** Whether the Popover will be initially open or not */
    initialActive: boolean;
    /** Whether filtering is disabled */
    disabled?: boolean;
    /** Override z-index of popovers and tooltips */
    disclosureZIndexOverride?: number;
    /** Whether the filter should close when clicking inside another Popover. */
    closeOnChildOverlayClick?: boolean;
    /** Callback invoked when the filter is removed */
    onRemove?(key: string): void;
    /** Callback invoked when the filter is clicked */
    onClick?(key: string): void;
}
export declare function FilterPill({ unsavedChanges, filterKey, label, filter, disabled, hideClearButton, selected, initialActive, disclosureZIndexOverride, closeOnChildOverlayClick, onRemove, onClick, }: FilterPillProps): React.JSX.Element | null;
//# sourceMappingURL=FilterPill.d.ts.map