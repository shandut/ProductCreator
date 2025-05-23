import React, { PureComponent } from 'react';
import type { PositionedOverlayProps } from '../../../PositionedOverlay';
import { PortalsManagerContext } from '../../../../utilities/portals';
export declare enum PopoverCloseSource {
    Click = 0,
    EscapeKeypress = 1,
    FocusOut = 2,
    ScrollOut = 3
}
export type PopoverAutofocusTarget = 'none' | 'first-node' | 'container';
declare enum TransitionStatus {
    Entering = "entering",
    Entered = "entered",
    Exiting = "exiting",
    Exited = "exited"
}
export interface PopoverOverlayProps {
    children?: React.ReactNode;
    fullWidth?: boolean;
    fullHeight?: boolean;
    fluidContent?: boolean;
    preferredPosition?: PositionedOverlayProps['preferredPosition'];
    preferredAlignment?: PositionedOverlayProps['preferredAlignment'];
    active: boolean;
    id: string;
    zIndexOverride?: number;
    activator: HTMLElement;
    preferInputActivator?: PositionedOverlayProps['preferInputActivator'];
    sectioned?: boolean;
    fixed?: boolean;
    hideOnPrint?: boolean;
    onClose(source: PopoverCloseSource): void;
    autofocusTarget?: PopoverAutofocusTarget;
    preventCloseOnChildOverlayClick?: boolean;
    captureOverscroll?: boolean;
}
interface State {
    transitionStatus: TransitionStatus;
    window?: Window | null;
}
export declare class PopoverOverlay extends PureComponent<PopoverOverlayProps, State> {
    static contextType: React.Context<import("../../../../utilities/portals").PortalsManager | undefined>;
    context: React.ContextType<typeof PortalsManagerContext>;
    state: State;
    private contentNode;
    private enteringTimer?;
    private overlayRef;
    private observer?;
    constructor(props: PopoverOverlayProps);
    forceUpdatePosition(): void;
    changeTransitionStatus(transitionStatus: TransitionStatus, cb?: () => void): void;
    componentDidMount(): void;
    componentDidUpdate(oldProps: PopoverOverlayProps): void;
    componentWillUnmount(): void;
    render(): React.JSX.Element | null;
    private clearTransitionTimeout;
    private focusContent;
    private renderPopover;
    private handleClick;
    private handleScrollOut;
    private handleEscape;
    private handleFocusFirstItem;
    private handleFocusLastItem;
}
export declare function nodeContainsDescendant(rootNode: HTMLElement, descendant: HTMLElement): boolean;
export {};
//# sourceMappingURL=PopoverOverlay.d.ts.map