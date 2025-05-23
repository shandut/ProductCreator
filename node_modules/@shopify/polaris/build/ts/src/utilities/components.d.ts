import React from 'react';
export declare function wrapWithComponent<TProps extends React.PropsWithChildren>(element: React.ReactNode | null | undefined, Component: React.ComponentType<TProps>, props: TProps & JSX.IntrinsicAttributes): React.ReactNode;
export declare function isElementOfType<TProps>(element: React.ReactNode | null | undefined, Component: React.ComponentType<TProps> | React.ComponentType<TProps>[]): boolean;
export declare function elementChildren<T extends React.ReactElement>(children: React.ReactNode, predicate?: (element: T) => boolean): T[];
interface ConditionalWrapperProps {
    children: any;
    condition: boolean;
    wrapper: (children: any) => any;
}
export declare function ConditionalWrapper({ condition, wrapper, children, }: ConditionalWrapperProps): JSX.Element;
interface ConditionalRenderProps {
    condition: boolean;
    children: any;
}
export declare function ConditionalRender({ condition, children, }: ConditionalRenderProps): JSX.Element;
export {};
//# sourceMappingURL=components.d.ts.map