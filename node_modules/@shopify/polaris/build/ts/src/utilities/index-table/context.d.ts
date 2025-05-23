/// <reference types="react" />
interface RowContextType {
    itemId?: string;
    selected?: boolean | 'indeterminate';
    disabled?: boolean;
    position?: number;
    onInteraction?: (event: React.MouseEvent | React.KeyboardEvent) => void;
}
export declare const RowContext: import("react").Context<RowContextType>;
export declare const RowHoveredContext: import("react").Context<boolean | undefined>;
export interface ScrollContextType {
    scrollableContainer: HTMLDivElement | null;
    canScrollLeft: boolean;
    canScrollRight: boolean;
}
export declare const scrollDefaultContext: {
    scrollableContainer: null;
    canScrollLeft: boolean;
    canScrollRight: boolean;
};
export declare const ScrollContext: import("react").Context<ScrollContextType>;
export {};
//# sourceMappingURL=context.d.ts.map