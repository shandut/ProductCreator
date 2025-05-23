import type { ReactElement } from 'react';
import React from 'react';
import type { TabProps, TabMeasurements } from '../../types';
export interface TabMeasurerProps {
    tabToFocus: number;
    siblingTabHasFocus: boolean;
    activator: ReactElement;
    selected: number;
    tabs: Omit<TabProps, 'onToggleModal' | 'onTogglePopover'>[];
    handleMeasurement(measurements: TabMeasurements): void;
}
export declare const TabMeasurer: React.NamedExoticComponent<TabMeasurerProps>;
//# sourceMappingURL=TabMeasurer.d.ts.map