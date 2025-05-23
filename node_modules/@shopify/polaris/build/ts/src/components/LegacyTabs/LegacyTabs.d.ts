import React from 'react';
import type { TabDescriptor } from './types';
export interface LegacyTabsProps {
    /** Content to display in tabs */
    children?: React.ReactNode;
    /** Index of selected tab */
    selected: number;
    /** List of tabs */
    tabs: TabDescriptor[];
    /** Fit tabs to container */
    fitted?: boolean;
    /** Text to replace disclosures horizontal dots */
    disclosureText?: string;
    /** Callback when tab is selected */
    onSelect?(selectedTabIndex: number): void;
}
/** @deprecated Use the Tabs component instead */
export declare function LegacyTabs(props: LegacyTabsProps): React.JSX.Element;
//# sourceMappingURL=LegacyTabs.d.ts.map