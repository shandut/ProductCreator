export declare enum SelectionType {
    All = "all",
    Page = "page",
    Multi = "multi",
    Single = "single",
    Range = "range"
}
type Range = [number, number];
type ResourceIDResolver<T extends {
    [key: string]: unknown;
}> = (resource: T) => string;
export declare function useIndexResourceState<T extends {
    [key: string]: unknown;
}>(resources: T[], { selectedResources: initSelectedResources, allResourcesSelected: initAllResourcesSelected, resourceIDResolver, resourceFilter, }?: {
    selectedResources?: string[];
    allResourcesSelected?: boolean;
    resourceIDResolver?: ResourceIDResolver<T>;
    resourceFilter?: (value: T, index: number) => boolean;
}): {
    selectedResources: string[];
    allResourcesSelected: boolean;
    handleSelectionChange: (selectionType: SelectionType, isSelecting: boolean, selection?: string | Range, _position?: number) => void;
    clearSelection: () => void;
    removeSelectedResources: (removeResources: string[]) => void;
};
export {};
//# sourceMappingURL=use-index-resource-state.d.ts.map