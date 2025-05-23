import React from 'react';
import type { ReactNode } from 'react';
interface Props {
    children?: ReactNode;
    fallback?: ReactNode;
    onMount?: () => void;
}
export declare function AfterInitialMount({ children, onMount, fallback }: Props): React.JSX.Element;
export {};
//# sourceMappingURL=AfterInitialMount.d.ts.map