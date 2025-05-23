import React from 'react';
import type { KeyboardEvent } from 'react';
import type { TabProps } from '../../types';
export interface ListProps {
    focusIndex: number;
    disclosureTabs: TabProps[];
    onClick?(id: string): void;
    onKeyPress?(event: KeyboardEvent<HTMLElement>): void;
}
export declare function List({ focusIndex, disclosureTabs, onClick, onKeyPress, }: ListProps): React.JSX.Element;
//# sourceMappingURL=List.d.ts.map