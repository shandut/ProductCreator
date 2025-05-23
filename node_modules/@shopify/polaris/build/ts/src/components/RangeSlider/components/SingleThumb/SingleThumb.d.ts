import React from 'react';
import type { RangeSliderProps } from '../../types';
export interface SingleThumbProps extends RangeSliderProps {
    value: number;
    id: string;
    min: number;
    max: number;
    step: number;
}
export declare function SingleThumb(props: SingleThumbProps): React.JSX.Element;
//# sourceMappingURL=SingleThumb.d.ts.map