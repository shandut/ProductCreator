import React from 'react';
import { Item } from './components';
type Type = 'bullet' | 'number';
type Spacing = 'extraTight' | 'loose';
export interface ListProps {
    /**
     * Determines the space between list items
     * @default 'loose'
     */
    gap?: Spacing;
    /**
     * Type of list to display
     * @default 'bullet'
     */
    type?: Type;
    /** List item elements */
    children?: React.ReactNode;
}
export declare const List: React.FunctionComponent<ListProps> & {
    Item: typeof Item;
};
export {};
//# sourceMappingURL=List.d.ts.map