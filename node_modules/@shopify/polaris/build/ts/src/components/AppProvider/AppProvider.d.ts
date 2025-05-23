import React, { Component } from 'react';
import type { ThemeName } from '@shopify/polaris-tokens';
import { I18n } from '../../utilities/i18n';
import type { LinkLikeComponent } from '../../utilities/link';
import type { FeaturesConfig } from '../../utilities/features';
import './global.css';
interface State {
    intl: I18n;
    link: LinkLikeComponent | undefined;
}
export interface AppProviderProps {
    theme?: ThemeName;
    /** A locale object or array of locale objects that overrides default translations. If specifying an array then your primary language dictionary should come first, followed by your fallback language dictionaries */
    i18n: ConstructorParameters<typeof I18n>[0];
    /** A custom component to use for all links used by Polaris components */
    linkComponent?: LinkLikeComponent;
    /** For toggling features */
    features?: FeaturesConfig;
    /** Inner content of the application */
    children?: React.ReactNode;
}
export declare class AppProvider extends Component<AppProviderProps, State> {
    private stickyManager;
    private scrollLockManager;
    constructor(props: AppProviderProps);
    componentDidMount(): void;
    componentDidUpdate({ i18n: prevI18n, linkComponent: prevLinkComponent, }: AppProviderProps): void;
    setBodyStyles: () => void;
    setRootAttributes: () => void;
    getThemeName: () => ThemeName;
    render(): React.JSX.Element;
}
export {};
//# sourceMappingURL=AppProvider.d.ts.map