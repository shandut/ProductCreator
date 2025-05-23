import type { ReactNode } from 'react';
import React from 'react';
export interface ItemProps {
    id: string;
    focused: boolean;
    children?: ReactNode;
    url?: string;
    accessibilityLabel?: string;
    onClick?(): void;
}
export declare const Item: React.NamedExoticComponent<ItemProps>;
//# sourceMappingURL=Item.d.ts.map