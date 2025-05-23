import React from 'react';
import type { MenuActionDescriptor, MenuGroupDescriptor } from '../../../../../../types';
export interface ActionsMeasurements {
    containerWidth: number;
    disclosureWidth: number;
    hiddenActionsWidths: number[];
}
export interface ActionsMeasurerProps {
    /** Collection of page-level secondary actions */
    actions?: MenuActionDescriptor[];
    /** Collection of page-level action groups */
    groups?: MenuGroupDescriptor[];
    handleMeasurement(measurements: ActionsMeasurements): void;
}
export declare function ActionsMeasurer({ actions, groups, handleMeasurement: handleMeasurementProp, }: ActionsMeasurerProps): React.JSX.Element;
//# sourceMappingURL=ActionsMeasurer.d.ts.map