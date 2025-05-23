import React from 'react';
import { ScrollTo } from './components';
export interface ScrollableProps extends React.HTMLProps<HTMLDivElement> {
    /** Content to display in scrollable area */
    children?: React.ReactNode;
    /** Scroll content vertically
     * @default true
     * */
    vertical?: boolean;
    /** Scroll content horizontally
     * @default true
     * */
    horizontal?: boolean;
    /** Add a shadow when content is scrollable */
    shadow?: boolean;
    /** Slightly hints content upon mounting when scrollable */
    hint?: boolean;
    /** Adds a tabIndex to scrollable when children are not focusable */
    focusable?: boolean;
    /** Browser determined scrollbar width
     * @default 'thin'
     */
    scrollbarWidth?: 'thin' | 'none' | 'auto';
    /** Adds space to one or both sides to prevent content shift when scrolling is necessary */
    scrollbarGutter?: 'stable' | 'stable both-edges';
    /** Called when scrolled to the bottom of the scroll area */
    onScrolledToBottom?(): void;
}
export interface ScrollToOptions {
    behavior?: 'instant' | 'smooth' | 'auto';
}
export interface ScrollableRef {
    scrollTo: (scrollY: number, options?: ScrollToOptions) => void;
}
declare const ScrollableComponent: React.ForwardRefExoticComponent<Omit<ScrollableProps, "ref"> & React.RefAttributes<ScrollableRef>>;
declare const forNode: (node: HTMLElement) => HTMLElement | Document;
type ScrollableType = typeof ScrollableComponent & {
    ScrollTo: typeof ScrollTo;
    forNode: typeof forNode;
};
declare const Scrollable: ScrollableType;
export { Scrollable };
//# sourceMappingURL=Scrollable.d.ts.map