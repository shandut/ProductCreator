import type { RefObject } from 'react';
import type { IndexFiltersMode } from '../../types';
export declare function useIsSticky(mode: IndexFiltersMode, disabled: boolean, isFlushWhenSticky: boolean): {
    intersectionRef: RefObject<HTMLDivElement>;
    measurerRef: RefObject<HTMLDivElement>;
    isSticky: boolean;
    indexFilteringHeight: number;
};
//# sourceMappingURL=useIsSticky.d.ts.map