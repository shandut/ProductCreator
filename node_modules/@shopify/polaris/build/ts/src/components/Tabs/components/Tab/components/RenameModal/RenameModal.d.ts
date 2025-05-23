import React from 'react';
export interface RenameModalProps {
    open: boolean;
    isModalLoading?: boolean;
    name: string;
    helpText?: string;
    viewNames?: string[];
    onClose: () => void;
    onClickPrimaryAction: (value: string) => Promise<void>;
    onClickSecondaryAction?: () => void;
}
export declare function RenameModal({ open, isModalLoading, name, onClose, onClickPrimaryAction, onClickSecondaryAction, helpText, viewNames, }: RenameModalProps): React.JSX.Element;
//# sourceMappingURL=RenameModal.d.ts.map