import React from 'react';
import type { MenuActionDescriptor, MenuGroupDescriptor } from '../../types';
export interface ActionMenuProps {
    /** Collection of page-level secondary actions */
    actions?: MenuActionDescriptor[];
    /** Collection of page-level action groups */
    groups?: MenuGroupDescriptor[];
    /** Roll up all actions into a Popover > ActionList */
    rollup?: boolean;
    /** Label for rolled up actions activator */
    rollupActionsLabel?: string;
    /** Callback that returns true when secondary actions are rolled up into action groups, and false when not */
    onActionRollup?(hasRolledUp: boolean): void;
}
export declare function ActionMenu({ actions, groups, rollup, rollupActionsLabel, onActionRollup, }: ActionMenuProps): React.JSX.Element | null;
export declare function hasGroupsWithActions(groups?: ActionMenuProps['groups']): boolean;
//# sourceMappingURL=ActionMenu.d.ts.map