import { Rect } from '../../../utilities/geometry';
export type PreferredPosition = 'above' | 'below' | 'mostSpace' | 'cover';
export type PreferredAlignment = 'left' | 'center' | 'right';
export interface Margins {
    activator: number;
    container: number;
    horizontal: number;
}
export declare function calculateVerticalPosition(activatorRect: Rect, overlayRect: Rect, overlayMargins: Margins, scrollableContainerRect: Rect, containerRect: Rect, preferredPosition: PreferredPosition, fixed: boolean | undefined, topBarOffset?: number): {
    height: number;
    top: number;
    positioning: string;
};
export declare function calculateHorizontalPosition(activatorRect: Rect, overlayRect: Rect, containerRect: Rect, overlayMargins: Margins, preferredAlignment: PreferredAlignment): number;
export declare function rectIsOutsideOfRect(inner: Rect, outer: Rect): boolean;
export declare function intersectionWithViewport(rect: Rect, viewport?: Rect): Rect;
export declare function windowRect(node?: HTMLElement): Rect;
//# sourceMappingURL=math.d.ts.map