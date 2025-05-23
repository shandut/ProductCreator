import React from 'react';
import type { ColumnVisibilityData } from '../../types';
export interface NavigationProps {
    columnVisibilityData: ColumnVisibilityData[];
    isScrolledFarthestLeft?: boolean;
    isScrolledFarthestRight?: boolean;
    fixedFirstColumns: number;
    navigateTableLeft?(): void;
    navigateTableRight?(): void;
    setRef?: (ref: HTMLDivElement | null) => void;
}
export declare function Navigation({ columnVisibilityData, isScrolledFarthestLeft, isScrolledFarthestRight, navigateTableLeft, navigateTableRight, fixedFirstColumns, setRef, }: NavigationProps): React.JSX.Element;
//# sourceMappingURL=Navigation.d.ts.map