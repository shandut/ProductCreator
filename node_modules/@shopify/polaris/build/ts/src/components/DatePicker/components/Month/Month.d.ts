import React from 'react';
import type { Range } from '../../../../utilities/dates';
export interface MonthProps {
    focusedDate?: Date;
    selected?: Range;
    hoverDate?: Date;
    month: number;
    year: number;
    disableDatesBefore?: Date;
    disableDatesAfter?: Date;
    disableSpecificDates?: Date[];
    allowRange?: boolean;
    weekStartsOn: number;
    accessibilityLabelPrefixes: [string | undefined, string];
    onChange?(date: Range): void;
    onHover?(hoverEnd: Date): void;
    onFocus?(date: Date): void;
}
export declare function Month({ focusedDate, selected, hoverDate, disableDatesBefore, disableDatesAfter, disableSpecificDates, allowRange, onChange, onHover, onFocus, month, year, weekStartsOn, accessibilityLabelPrefixes, }: MonthProps): React.JSX.Element;
//# sourceMappingURL=Month.d.ts.map