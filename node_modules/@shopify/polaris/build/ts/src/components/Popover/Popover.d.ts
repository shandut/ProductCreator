import React from 'react';
import type { AriaAttributes } from 'react';
import { PopoverCloseSource, Pane, Section } from './components';
import type { PopoverAutofocusTarget, PopoverOverlayProps } from './components';
export { PopoverCloseSource };
export type { PopoverAutofocusTarget };
export interface PopoverProps {
    /** The content to display inside the popover */
    children?: React.ReactNode;
    /** The preferred direction to open the popover */
    preferredPosition?: PopoverOverlayProps['preferredPosition'];
    /** The preferred alignment of the popover relative to its activator */
    preferredAlignment?: PopoverOverlayProps['preferredAlignment'];
    /** Show or hide the Popover */
    active: boolean;
    /** The element to activate the Popover.
     * If using a button, use the default or tertiary variant
     * which will show an active state when popover is active
     */
    activator: React.ReactElement;
    /**
     * Use the activator's input element to calculate the Popover position
     * @default true
     */
    preferInputActivator?: PopoverOverlayProps['preferInputActivator'];
    /**
     * The element type to wrap the activator with
     * @default 'div'
     */
    activatorWrapper?: string;
    /** Override on the default z-index of 400 */
    zIndexOverride?: number;
    /** Prevents focusing the activator or the next focusable element when the popover is deactivated */
    preventFocusOnClose?: boolean;
    /** Automatically add wrap content in a section */
    sectioned?: boolean;
    /** Allow popover to stretch to the full width of its activator */
    fullWidth?: boolean;
    /** Allow popover to stretch to fit content vertically */
    fullHeight?: boolean;
    /** Allow popover content to determine the overlay width and height */
    fluidContent?: boolean;
    /** Remains in a fixed position */
    fixed?: boolean;
    /** Used to illustrate the type of popover element */
    ariaHaspopup?: AriaAttributes['aria-haspopup'];
    /** Allow the popover overlay to be hidden when printing */
    hideOnPrint?: boolean;
    /** Callback when popover is closed */
    onClose(source: PopoverCloseSource): void;
    /**
     * The preferred auto focus target defaulting to the popover container
     * @default 'container'
     */
    autofocusTarget?: PopoverAutofocusTarget;
    /** Prevents closing the popover when other overlays are clicked */
    preventCloseOnChildOverlayClick?: boolean;
    /**
     * Prevents page scrolling when the end of the scrollable Popover overlay content is reached - applied to Pane subcomponent
     * @default false
     */
    captureOverscroll?: boolean;
}
type CloseTarget = 'activator' | 'next-node';
export interface PopoverPublicAPI {
    forceUpdatePosition(): void;
    close(target?: CloseTarget): void;
}
export declare const Popover: React.ForwardRefExoticComponent<PopoverProps & React.RefAttributes<PopoverPublicAPI>> & {
    Pane: typeof Pane;
    Section: typeof Section;
};
//# sourceMappingURL=Popover.d.ts.map