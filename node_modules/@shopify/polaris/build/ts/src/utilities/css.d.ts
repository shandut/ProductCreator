/// <reference types="react" />
import type { BreakpointsAlias } from '@shopify/polaris-tokens';
type Falsy = boolean | undefined | null | 0;
type ResponsivePropConfig<T = string> = {
    [Breakpoint in BreakpointsAlias]?: T;
};
export type ResponsiveProp<T> = T | ResponsivePropConfig<T>;
export type ResponsiveValue<T = string> = undefined | ResponsiveProp<T>;
type ResponsiveVariables<T> = {
    [Breakpoint in `${string}-${BreakpointsAlias}`]?: T;
};
export declare function classNames(...classes: (string | Falsy)[]): string;
export declare function variationName(name: string, value: string): string;
export declare function sanitizeCustomProperties(styles: React.CSSProperties): React.CSSProperties | undefined;
/**
 * Given params like so:
 * (
 *   'button',
 *   'padding',
 *   'spacing',
 *   {
 *     sm: "4",
 *     lg: "6"
 *   }
 * )
 * Converts it to an object like so:
 * {
 *   '--pc-button-padding-sm': 'var(--p-spacing-4)',
 *   '--pc-button-padding-lg': 'var(--p-spacing-6)'
 * }
 *
 */
export declare function getResponsiveProps<T = string>(componentName: string, componentProp: string, tokenSubgroup: string, responsiveProp?: ResponsiveProp<T>): ResponsiveVariables<T>;
export declare function getResponsiveValue<T = string>(componentName: string, componentProp: string, responsiveProp?: ResponsiveValue<T>): ResponsiveVariables<T>;
export {};
//# sourceMappingURL=css.d.ts.map