type ColorScale = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16';
type Color = {
    [Scale in ColorScale]: `rgba(${number}, ${number}, ${number}, 1)`;
};
type ColorAlpha = {
    [Scale in ColorScale]: `rgba(${number}, ${number}, ${number}, ${number})`;
};
export declare const gray: Color;
export declare const azure: Color;
export declare const blue: Color;
export declare const cyan: Color;
export declare const green: Color;
export declare const lime: Color;
export declare const magenta: Color;
export declare const orange: Color;
export declare const purple: Color;
export declare const red: Color;
export declare const rose: Color;
export declare const teal: Color;
export declare const yellow: Color;
export declare const blackAlpha: ColorAlpha;
export declare const whiteAlpha: ColorAlpha;
export {};
//# sourceMappingURL=colors.d.ts.map