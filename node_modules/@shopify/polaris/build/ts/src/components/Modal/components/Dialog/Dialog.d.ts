import React from 'react';
import type { SetStateAction, Dispatch } from 'react';
import type { ModalSize } from '../../Modal';
export interface DialogProps {
    labelledBy?: string;
    instant?: boolean;
    children?: React.ReactNode;
    limitHeight?: boolean;
    size?: ModalSize;
    onClose(): void;
    onEntered?(): void;
    onExited?(): void;
    in?: boolean;
    setClosing?: Dispatch<SetStateAction<boolean>>;
    hasToasts?: boolean;
}
export declare function Dialog({ instant, labelledBy, children, limitHeight, size, onClose, onExited, onEntered, setClosing, hasToasts, ...props }: DialogProps): React.JSX.Element;
//# sourceMappingURL=Dialog.d.ts.map