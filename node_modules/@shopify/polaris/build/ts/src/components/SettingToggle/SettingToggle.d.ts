import React from 'react';
import type { ComplexAction } from '../../types';
export interface SettingToggleProps {
    /** Inner content of the card */
    children?: React.ReactNode;
    /** Card header actions */
    action?: ComplexAction;
    /** Sets toggle state to activated or deactivated */
    enabled?: boolean;
}
/**
 * @deprecated The SettingToggle component will be removed in v12
 * See the "With primitive components" example to learn how to compose
 * setting toggles with layout and typography primitives.
 * https://polaris.shopify.com/components/deprecated/setting-toggle
 */
export declare function SettingToggle({ enabled, action, children }: SettingToggleProps): React.JSX.Element;
//# sourceMappingURL=SettingToggle.d.ts.map