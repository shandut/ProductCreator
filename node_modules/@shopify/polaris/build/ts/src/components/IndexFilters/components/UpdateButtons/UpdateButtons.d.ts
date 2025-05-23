import React from 'react';
import type { IndexFiltersPrimaryAction, IndexFiltersCancelAction } from '../../types';
interface UpdateIndexFiltersPrimaryAction extends Omit<IndexFiltersPrimaryAction, 'onAction'> {
    onAction: (value: string) => Promise<void>;
}
export interface UpdateButtonsProps {
    primaryAction?: UpdateIndexFiltersPrimaryAction;
    cancelAction?: IndexFiltersCancelAction;
    viewNames: string[];
    disabled?: boolean;
}
export declare function UpdateButtons({ primaryAction, cancelAction, viewNames, disabled, }: UpdateButtonsProps): React.JSX.Element | null;
export {};
//# sourceMappingURL=UpdateButtons.d.ts.map