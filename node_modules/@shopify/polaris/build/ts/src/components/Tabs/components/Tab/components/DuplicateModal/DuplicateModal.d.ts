import React from 'react';
export interface DuplicateModalProps {
    open: boolean;
    isModalLoading?: boolean;
    name: string;
    helpText?: string;
    viewNames?: string[];
    onClose: () => void;
    onClickPrimaryAction: (value: string) => Promise<void>;
    onClickSecondaryAction?: () => void;
}
export declare function DuplicateModal({ open, isModalLoading, name, onClose, onClickPrimaryAction, onClickSecondaryAction, helpText, viewNames, }: DuplicateModalProps): React.JSX.Element;
//# sourceMappingURL=DuplicateModal.d.ts.map