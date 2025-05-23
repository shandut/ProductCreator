import React from 'react';
import { Section, Item } from './components';
export interface NavigationProps {
    location: string;
    children?: React.ReactNode;
    contextControl?: React.ReactNode;
    onDismiss?(): void;
    /** id of the element used as aria-labelledby */
    ariaLabelledBy?: string;
    /** Accepts a component that is used to supplement the logo markup */
    logoSuffix?: React.ReactNode;
}
export declare const Navigation: React.FunctionComponent<NavigationProps> & {
    Item: typeof Item;
    Section: typeof Section;
};
//# sourceMappingURL=Navigation.d.ts.map