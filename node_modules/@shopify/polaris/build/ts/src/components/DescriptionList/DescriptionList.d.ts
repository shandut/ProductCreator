import React from 'react';
interface Item {
    /** Title of the item */
    term: React.ReactNode;
    /**  Item content */
    description: React.ReactNode;
}
export interface DescriptionListProps {
    /** Collection of items for list */
    items: Item[];
    /** Determines the spacing between list items */
    gap?: 'tight' | 'loose';
}
export declare function DescriptionList({ items, gap }: DescriptionListProps): React.JSX.Element;
export {};
//# sourceMappingURL=DescriptionList.d.ts.map