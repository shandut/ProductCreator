import React from 'react';
import type { ActionListItemDescriptor } from '../../../../types';
export type ItemProps = ActionListItemDescriptor;
export declare function Item({ id, badge, content, accessibilityLabel, helpText, url, onAction, onMouseEnter, icon, image, prefix, suffix, disabled, external, destructive, ellipsis, truncate, active, role, variant, }: ItemProps): React.JSX.Element;
export declare const TruncateText: ({ children }: {
    children: string;
}) => React.JSX.Element;
//# sourceMappingURL=Item.d.ts.map