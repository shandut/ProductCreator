import React from 'react';
import type { ActionListItemDescriptor } from '../../../../types';
interface MappedAction extends ActionListItemDescriptor {
    wrapOverflow?: boolean;
}
export declare function MappedAction({ active, content, disabled, icon, image, prefix, suffix, ellipsis, role, url, external, onAction, destructive, badge, helpText, wrapOverflow, }: MappedAction): React.JSX.Element;
export {};
//# sourceMappingURL=MappedAction.d.ts.map