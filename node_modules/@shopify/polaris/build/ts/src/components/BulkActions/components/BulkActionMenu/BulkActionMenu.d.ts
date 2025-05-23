import React from 'react';
import type { MenuGroupDescriptor } from '../../../../types';
import type { ButtonProps } from '../../../Button';
export interface BulkActionsMenuProps extends MenuGroupDescriptor {
    isNewBadgeInBadgeActions: boolean;
    size?: Extract<ButtonProps['size'], 'micro' | 'medium'>;
}
export declare function BulkActionMenu({ title, actions, isNewBadgeInBadgeActions, size, }: BulkActionsMenuProps): React.JSX.Element;
//# sourceMappingURL=BulkActionMenu.d.ts.map