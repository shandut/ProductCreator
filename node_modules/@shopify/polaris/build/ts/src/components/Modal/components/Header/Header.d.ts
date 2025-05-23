import React from 'react';
export interface HeaderProps {
    id: string;
    titleHidden: boolean;
    closing: boolean;
    children?: React.ReactNode;
    onClose(): void;
}
export declare function Header({ id, children, closing, titleHidden, onClose, }: HeaderProps): React.JSX.Element;
//# sourceMappingURL=Header.d.ts.map