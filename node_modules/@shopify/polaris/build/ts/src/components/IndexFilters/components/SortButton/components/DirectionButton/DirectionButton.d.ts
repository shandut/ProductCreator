import React from 'react';
import type { ReactNode } from 'react';
type DirectionButtonDirection = 'asc' | 'desc';
export interface DirectionButtonProps {
    onClick: (value: string[]) => void;
    active: boolean;
    children: ReactNode;
    direction: DirectionButtonDirection;
    value: string;
}
export declare function DirectionButton({ onClick, active, children, direction, value, }: DirectionButtonProps): React.JSX.Element;
export {};
//# sourceMappingURL=DirectionButton.d.ts.map