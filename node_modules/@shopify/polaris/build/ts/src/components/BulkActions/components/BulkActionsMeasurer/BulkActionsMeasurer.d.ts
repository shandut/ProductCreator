import React from 'react';
import type { BulkActionsProps } from '../../BulkActions';
export interface ActionsMeasurements {
    containerWidth: number;
    disclosureWidth: number;
    hiddenActionsWidths: number[];
}
export interface ActionsMeasurerProps {
    /** Collection of page-level action groups */
    promotedActions?: BulkActionsProps['promotedActions'];
    disabled?: BulkActionsProps['disabled'];
    buttonSize?: BulkActionsProps['buttonSize'];
    handleMeasurement(measurements: ActionsMeasurements): void;
}
export declare function BulkActionsMeasurer({ promotedActions, disabled, buttonSize, handleMeasurement: handleMeasurementProp, }: ActionsMeasurerProps): React.JSX.Element;
//# sourceMappingURL=BulkActionsMeasurer.d.ts.map