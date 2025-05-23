import React from 'react';
import { Item } from './components';
type Spacing = 'extraTight' | 'tight' | 'baseTight' | 'loose' | 'extraLoose' | 'none';
type Alignment = 'leading' | 'trailing' | 'center' | 'fill' | 'baseline';
type Distribution = 'equalSpacing' | 'leading' | 'trailing' | 'center' | 'fill' | 'fillEvenly';
export interface LegacyStackProps {
    /** Elements to display inside stack */
    children?: React.ReactNode;
    /** Wrap stack elements to additional rows as needed on small screens (Defaults to true) */
    wrap?: boolean;
    /** Stack the elements vertically */
    vertical?: boolean;
    /** Adjust spacing between elements */
    spacing?: Spacing;
    /** Adjust vertical alignment of elements */
    alignment?: Alignment;
    /** Adjust horizontal alignment of elements */
    distribution?: Distribution;
}
/** @deprecated Use the BlockStack component instead */
export declare const LegacyStack: React.NamedExoticComponent<LegacyStackProps> & {
    Item: typeof Item;
};
export {};
//# sourceMappingURL=LegacyStack.d.ts.map