import React from 'react';
import type { MenuActionDescriptor, MenuGroupDescriptor } from '../../../../types';
interface Props {
    /** Collection of page-level secondary actions */
    actions?: MenuActionDescriptor[];
    /** Collection of page-level action groups */
    groups?: MenuGroupDescriptor[];
    /** Callback that returns true when secondary actions are rolled up into action groups, and false when not */
    onActionRollup?(hasRolledUp: boolean): void;
}
export declare function Actions({ actions, groups, onActionRollup }: Props): React.JSX.Element;
export {};
//# sourceMappingURL=Actions.d.ts.map