export declare const queryAliases: {
    readonly touch: "(hover: none) and (pointer: coarse)";
    readonly stylus: "(hover: none) and (pointer: fine)";
    readonly pointer: "(hover) and (pointer: coarse)";
    readonly mouse: "(hover) and (pointer: fine)";
};
export type QueryAlias = keyof typeof queryAliases;
type AnyString = string & {};
interface UseMediaQueryOptions {
    /**
     * The default value to return if the hook is being run on the server.
     * @default false
     */
    defaultValue?: boolean;
    /**
     * If `true`, the hook will initialize reading the media query.
     * In SSR, you should set it to `false`, returning `options.defaultValue` or `false` initially.
     * @default false
     */
    initializeWithValue?: boolean;
}
export declare function useMediaQuery(queryOrAlias: AnyString | QueryAlias, options?: UseMediaQueryOptions): boolean;
export {};
//# sourceMappingURL=use-media-query.d.ts.map