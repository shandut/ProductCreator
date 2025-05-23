import React from 'react';
/**
 * Allowlist of local themes
 * TODO: Replace `as const` with `satisfies ThemeName[]`
 */
export declare const themeNamesLocal: readonly ["light", "dark-experimental"];
type ThemeNameLocal = (typeof themeNamesLocal)[number];
export declare const isThemeNameLocal: (name: string) => name is "light" | "dark-experimental";
export interface ThemeProviderProps {
    as?: keyof React.ReactHTML;
    children: React.ReactNode;
    className?: string;
    theme?: ThemeNameLocal;
    'data-portal-id'?: string;
}
export declare function ThemeProvider(props: ThemeProviderProps): React.JSX.Element;
export {};
//# sourceMappingURL=ThemeProvider.d.ts.map