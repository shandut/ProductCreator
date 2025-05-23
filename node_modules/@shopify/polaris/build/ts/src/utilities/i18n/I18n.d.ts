interface TranslationDictionary {
    [key: string]: string | TranslationDictionary;
}
export declare class I18n {
    private translation;
    /**
     * @param translation A locale object or array of locale objects that overrides default translations. If specifying an array then your desired language dictionary should come first, followed by your fallback language dictionaries
     */
    constructor(translation: TranslationDictionary | TranslationDictionary[]);
    translate(id: string, replacements?: {
        [key: string]: string | number;
    }): string;
    translationKeyExists(path: string): boolean;
}
export {};
//# sourceMappingURL=I18n.d.ts.map