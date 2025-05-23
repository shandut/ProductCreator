import React from 'react';
import './GridOverlay.css';
type Layer = 'above' | 'below';
interface Props {
    inFrame?: boolean;
    maxWidth?: string;
    layer?: Layer;
    children?: React.ReactNode;
}
export declare function GridOverlay({ inFrame, maxWidth, layer, children }: Props): React.JSX.Element;
export {};
//# sourceMappingURL=GridOverlay.d.ts.map