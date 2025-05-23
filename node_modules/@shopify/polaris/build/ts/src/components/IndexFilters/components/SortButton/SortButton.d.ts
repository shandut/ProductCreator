import React from 'react';
import type { ChoiceListProps } from '../../../ChoiceList';
import type { SortButtonChoice } from '../../types';
export declare enum SortButtonDirection {
    Asc = "asc",
    Desc = "desc"
}
export interface SortButtonProps {
    choices: SortButtonChoice[];
    selected: ChoiceListProps['selected'];
    disabled?: boolean;
    disclosureZIndexOverride?: number;
    onChange: (selected: string[]) => void;
    onChangeKey?: (key: string) => void;
    onChangeDirection?: (direction: string) => void;
}
export declare function SortButton({ choices, selected, disabled, disclosureZIndexOverride, onChange, onChangeKey, onChangeDirection, }: SortButtonProps): React.JSX.Element;
//# sourceMappingURL=SortButton.d.ts.map