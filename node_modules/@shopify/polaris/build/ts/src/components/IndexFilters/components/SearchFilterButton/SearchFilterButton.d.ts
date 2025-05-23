import React from 'react';
import type { CSSProperties } from 'react';
export interface SearchFilterButtonProps {
    onClick: () => void;
    label: string;
    disabled?: boolean;
    tooltipContent: string;
    disclosureZIndexOverride?: number;
    hideFilters?: boolean;
    hideQueryField?: boolean;
    style: CSSProperties;
}
export declare function SearchFilterButton({ onClick, label, disabled, tooltipContent, disclosureZIndexOverride, style, hideFilters, hideQueryField, }: SearchFilterButtonProps): React.JSX.Element;
//# sourceMappingURL=SearchFilterButton.d.ts.map