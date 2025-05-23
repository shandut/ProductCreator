import React from 'react';
import type { ModalProps } from '../../../Modal';
export interface CreateViewModalProps {
    open: boolean;
    onClose: () => void;
    onClickPrimaryAction: (value: string) => Promise<boolean>;
    onClickSecondaryAction?: () => void;
    activator: ModalProps['activator'];
    viewNames: string[];
}
export declare function CreateViewModal({ activator, open, onClose, onClickPrimaryAction, onClickSecondaryAction, viewNames, }: CreateViewModalProps): React.JSX.Element;
//# sourceMappingURL=CreateViewModal.d.ts.map