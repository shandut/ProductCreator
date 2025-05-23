import React from 'react';
import type { ActionListSection, ActionListItemDescriptor } from '../../../../types';
export interface RollupActionsProps {
    /** Accessibilty label */
    accessibilityLabel?: string;
    /** Collection of actions for the list */
    items?: ActionListItemDescriptor[];
    /** Collection of sectioned action items */
    sections?: ActionListSection[];
}
export declare function RollupActions({ accessibilityLabel, items, sections, }: RollupActionsProps): React.JSX.Element | null;
//# sourceMappingURL=RollupActions.d.ts.map