import type { ColumnVisibilityData, DataTableState } from './types';
interface TableMeasurements {
    firstVisibleColumnIndex: number;
    tableLeftVisibleEdge: number;
    tableRightVisibleEdge: number;
}
export declare function measureColumn(tableData: TableMeasurements): (column: HTMLElement, index: number) => ColumnVisibilityData;
export declare function isEdgeVisible(position: number, start: number, end: number, edgeType: string): boolean;
export declare function getPrevAndCurrentColumns(tableData: TableMeasurements, columnData: DataTableState['columnVisibilityData']): {
    previousColumn: ColumnVisibilityData;
    currentColumn: ColumnVisibilityData;
};
export {};
//# sourceMappingURL=utilities.d.ts.map