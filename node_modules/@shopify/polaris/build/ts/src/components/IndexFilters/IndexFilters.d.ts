import React from 'react';
import type { FiltersProps } from '../Filters';
import type { TabsProps } from '../Tabs';
import type { IndexFiltersPrimaryAction, IndexFiltersCancelAction, SortButtonChoice } from './types';
import { IndexFiltersMode } from './types';
type ActionableIndexFiltersMode = Exclude<IndexFiltersMode, IndexFiltersMode.Default>;
export interface IndexFiltersProps extends Omit<FiltersProps, 'focused' | 'children' | 'disableQueryField' | 'disableFilters'>, Pick<TabsProps, 'tabs' | 'onSelect' | 'selected'> {
    /** The available sorting choices. If not present, the sort button will not show */
    sortOptions?: SortButtonChoice[];
    /** The currently selected sort choice. Required if using sorting */
    sortSelected?: string[];
    /** Optional callback invoked when a merchant changes the sort order. Required if using sorting */
    onSort?: (value: string[]) => void;
    /** Optional callback when using saved views and changing the sort key */
    onSortKeyChange?: (value: string) => void;
    /** Optional callback when using saved views and changing the sort direction */
    onSortDirectionChange?: (value: string) => void;
    /** Callback when the add filter button is clicked, to be passed to AlphaFilters. */
    onAddFilterClick?: () => void;
    /** The primary action to display  */
    primaryAction?: IndexFiltersPrimaryAction;
    /** The cancel action to display */
    cancelAction?: IndexFiltersCancelAction;
    /** Optional callback invoked when a merchant begins to edit a view */
    onEditStart?: (mode: ActionableIndexFiltersMode) => void;
    /** The current mode of the IndexFilters component. Used to determine which view to show */
    mode: IndexFiltersMode;
    /** Override z-index of popovers and tooltips */
    disclosureZIndexOverride?: number;
    /** Callback to set the mode of the IndexFilters component */
    setMode: (mode: IndexFiltersMode) => void;
    /** Will disable all the elements within the IndexFilters component */
    disabled?: boolean;
    /** Will disable just the query field */
    disableQueryField?: boolean;
    /** If true, the sticky interaction on smaller devices will be disabled */
    disableStickyMode?: boolean;
    /** If the component should go flush to the top of the page when sticking */
    isFlushWhenSticky?: boolean;
    /** Whether the index supports creating new views */
    canCreateNewView?: boolean;
    /** Callback invoked when a merchant creates a new view */
    onCreateNewView?: (name: string) => Promise<boolean>;
    /** Optional override to the default aria-label for the button that toggles the filtering mode */
    filteringAccessibilityLabel?: string;
    /** Optional override to the default Tooltip message for the button that toggles the filtering mode */
    filteringAccessibilityTooltip?: string;
    /** Whether the filter should close when clicking inside another Popover. */
    closeOnChildOverlayClick?: boolean;
    /** Optional override to the default keyboard shortcuts available. Should be set to true for all instances
     * of this component not controlling a root-level index */
    disableKeyboardShortcuts?: boolean;
    /** Whether to display the edit columns button with the other default mode filter actions */
    showEditColumnsButton?: boolean;
    /** Whether or not to auto-focus the search field when it renders */
    autoFocusSearchField?: boolean;
}
export declare function IndexFilters({ tabs, selected, onSelect, onSort, onSortKeyChange, onSortDirectionChange, onAddFilterClick, sortOptions, sortSelected, queryValue, queryPlaceholder, primaryAction, cancelAction, filters, appliedFilters, onClearAll, onQueryChange, onQueryFocus, onQueryClear, onEditStart, disabled, disableQueryField, hideFilters, loading, mode, setMode, disclosureZIndexOverride, disableStickyMode, isFlushWhenSticky, canCreateNewView, onCreateNewView, filteringAccessibilityLabel, filteringAccessibilityTooltip, hideQueryField, closeOnChildOverlayClick, disableKeyboardShortcuts, showEditColumnsButton, autoFocusSearchField, }: IndexFiltersProps): React.JSX.Element;
export {};
//# sourceMappingURL=IndexFilters.d.ts.map