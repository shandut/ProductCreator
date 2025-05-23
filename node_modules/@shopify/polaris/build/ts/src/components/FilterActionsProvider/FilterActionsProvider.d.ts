import type { PropsWithChildren } from 'react';
import React from 'react';
export declare const FilterActionsContext: React.Context<boolean>;
type FilterActionsProviderProps = PropsWithChildren<{
    filterActions: boolean;
}>;
export declare function FilterActionsProvider({ children, filterActions, }: FilterActionsProviderProps): React.JSX.Element;
export {};
//# sourceMappingURL=FilterActionsProvider.d.ts.map