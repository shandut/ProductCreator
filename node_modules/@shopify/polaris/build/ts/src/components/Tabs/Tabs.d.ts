import React from 'react';
import type { TabProps } from './types';
export interface TabsState {
    disclosureWidth: number;
    tabWidths: number[];
    visibleTabs: number[];
    hiddenTabs: number[];
    containerWidth: number;
    showDisclosure: boolean;
    tabToFocus: number;
    isTabPopoverOpen: boolean;
    isTabModalOpen: boolean;
    isNewViewModalActive: boolean;
    modalSubmitted: boolean;
    isTabsFocused: boolean;
}
export interface TabsProps {
    /** The items that map to each Tab. */
    tabs: TabProps[];
    /** Content to display in tabs */
    children?: React.ReactNode;
    /** The index of the currently selected Tab. */
    selected: number;
    /** Whether the Tabs are disabled or not. */
    disabled?: boolean;
    /** Whether to show the add new view Tab. */
    canCreateNewView?: boolean;
    /** Label for the new view Tab. Will override the default of "Create new view" */
    newViewAccessibilityLabel?: string;
    /** Fit tabs to container */
    fitted?: boolean;
    /** Text to replace disclosures horizontal dots */
    disclosureText?: string;
    /** Override z-index of popovers and tooltips */
    disclosureZIndexOverride?: number;
    /** Optional callback invoked when a Tab becomes selected. */
    onSelect?: (selectedTabIndex: number) => void;
    /** Optional callback invoked when a merchant saves a new view from the Modal */
    onCreateNewView?: (value: string) => Promise<boolean>;
}
export declare const Tabs: ({ tabs, children, selected, newViewAccessibilityLabel, canCreateNewView, disabled, onCreateNewView, onSelect, fitted, disclosureText, disclosureZIndexOverride, }: TabsProps) => React.JSX.Element;
//# sourceMappingURL=Tabs.d.ts.map