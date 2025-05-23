import type { PropsWithChildren } from 'react';
import React from 'react';
import type { TransitionStatus } from 'react-transition-group';
import type { AppliedFilterInterface, FilterInterface } from '../../../../types';
export interface FiltersBarProps {
    /** Currently entered text in the query field */
    queryValue?: string;
    /** Placeholder text for the query field. */
    queryPlaceholder?: string;
    /** Whether the query field is focused. */
    focused?: boolean;
    /** Available filters added to the filter bar. Shortcut filters are pinned to the front of the bar. */
    filters: FilterInterface[];
    /** Applied filters which are rendered as filter pills. The remove callback is called with the respective key. */
    appliedFilters?: AppliedFilterInterface[];
    /** Callback when the reset all button is pressed. */
    onClearAll: () => void;
    /** Disable all filters. */
    disabled?: boolean;
    /** Hide the query field. */
    hideQueryField?: boolean;
    /** Disable the filters */
    disableFilters?: boolean;
    mountedState?: TransitionStatus;
    /** Callback when the add filter button is clicked. */
    onAddFilterClick?: () => void;
    /** Whether the filter should close when clicking inside another Popover. */
    closeOnChildOverlayClick?: boolean;
    mountedStateStyles?: any;
}
export declare function FiltersBar({ filters, appliedFilters, onClearAll, disabled, hideQueryField, disableFilters, mountedStateStyles, onAddFilterClick, closeOnChildOverlayClick, children, }: PropsWithChildren<FiltersBarProps>): React.JSX.Element;
//# sourceMappingURL=FiltersBar.d.ts.map