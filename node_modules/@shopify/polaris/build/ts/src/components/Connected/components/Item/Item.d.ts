import React from 'react';
type ItemPosition = 'left' | 'right' | 'primary';
export interface ItemProps {
    /** Position of the item */
    position: ItemPosition;
    /** Item content */
    children?: React.ReactNode;
}
export declare function Item({ children, position }: ItemProps): React.JSX.Element;
export {};
//# sourceMappingURL=Item.d.ts.map