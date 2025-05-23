import React from 'react';
import type { ActionListItemDescriptor, ActionListSection } from '../../../../types';
export interface SectionProps {
    /** Section of action items */
    section: ActionListSection;
    /** Should there be multiple sections */
    hasMultipleSections: boolean;
    /** Defines a specific role attribute for each action in the list */
    actionRole?: 'option' | 'menuitem' | string;
    /** Callback when any item is clicked or keypressed */
    onActionAnyItem?: ActionListItemDescriptor['onAction'];
    /** Whether it is the first in a group of sections */
    isFirst?: boolean;
}
export declare function Section({ section, hasMultipleSections, isFirst, actionRole, onActionAnyItem, }: SectionProps): React.JSX.Element;
//# sourceMappingURL=Section.d.ts.map