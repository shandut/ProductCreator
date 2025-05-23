import React from 'react';
import type { ComplexAction } from '../../types';
import type { ButtonProps } from './Button';
export declare function buttonsFrom(action: ComplexAction, overrides?: Partial<ButtonProps>): React.ReactElement<ButtonProps>;
export declare function buttonsFrom(actions: ComplexAction[], overrides?: Partial<ButtonProps>): React.ReactElement<ButtonProps>[];
export declare function buttonFrom({ content, onAction, plain, destructive, ...action }: ComplexAction, overrides?: Partial<ButtonProps>, key?: any): React.JSX.Element;
//# sourceMappingURL=utils.d.ts.map