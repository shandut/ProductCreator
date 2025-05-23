import React, { PureComponent } from 'react';
import { Rect } from '../../utilities/geometry';
import type { PreferredPosition, PreferredAlignment } from './utilities/math';
type Positioning = 'above' | 'below' | 'cover';
interface OverlayDetails {
    left?: number;
    right?: number;
    desiredHeight: number;
    positioning: Positioning;
    measuring: boolean;
    activatorRect: Rect;
    chevronOffset: number;
}
export interface PositionedOverlayProps {
    active: boolean;
    activator: HTMLElement;
    preferInputActivator?: boolean;
    preferredPosition?: PreferredPosition;
    preferredAlignment?: PreferredAlignment;
    fullWidth?: boolean;
    fixed?: boolean;
    preventInteraction?: boolean;
    classNames?: string;
    zIndexOverride?: number;
    render(overlayDetails: OverlayDetails): React.ReactNode;
    onScrollOut?(): void;
}
interface State {
    measuring: boolean;
    activatorRect: Rect;
    left?: number;
    right?: number;
    top: number;
    height: number;
    width: number | null;
    positioning: Positioning;
    zIndex: number | null;
    outsideScrollableContainer: boolean;
    lockPosition: boolean;
    chevronOffset: number;
}
export declare class PositionedOverlay extends PureComponent<PositionedOverlayProps, State> {
    state: State;
    private overlay;
    private scrollableContainers;
    private observer;
    constructor(props: PositionedOverlayProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    render(): React.JSX.Element;
    get firstScrollableContainer(): HTMLElement | Document | null;
    forceUpdatePosition(): void;
    private overlayDetails;
    private setOverlay;
    private setScrollableContainers;
    private registerScrollHandlers;
    private unregisterScrollHandlers;
    private handleMeasurement;
}
export {};
//# sourceMappingURL=PositionedOverlay.d.ts.map