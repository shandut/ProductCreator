import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
export interface BackdropProps {
    belowNavigation?: boolean;
    transparent?: boolean;
    onClick?(): void;
    onTouchStart?(): void;
    setClosing?: Dispatch<SetStateAction<boolean>>;
}
export declare function Backdrop(props: BackdropProps): React.JSX.Element;
//# sourceMappingURL=Backdrop.d.ts.map