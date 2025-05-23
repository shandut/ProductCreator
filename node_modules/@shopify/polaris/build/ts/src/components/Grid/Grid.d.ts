import React from 'react';
import { Cell } from './components';
type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Areas = {
    [Breakpoint in Breakpoints]?: string[];
};
type Columns = {
    [Breakpoint in Breakpoints]?: number;
};
type Gap = {
    [Breakpoint in Breakpoints]?: string;
};
export interface GridProps {
    /**
     * Set grid-template-areas
     * @deprecated To avoid a11y issues, nest layout components in individual grid
     * cells instead. See:
     * https://polaris.shopify.com/components/layout-and-structure
     */
    areas?: Areas;
    columns?: Columns;
    gap?: Gap;
    children?: React.ReactNode;
}
export declare const Grid: React.FunctionComponent<GridProps> & {
    Cell: typeof Cell;
};
export declare function formatAreas(areas?: string[]): string | undefined;
export {};
//# sourceMappingURL=Grid.d.ts.map