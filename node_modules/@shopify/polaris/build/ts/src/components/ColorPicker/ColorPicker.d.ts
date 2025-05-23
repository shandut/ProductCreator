import React, { PureComponent } from 'react';
import type { HSBColor, HSBAColor } from '../../utilities/color-types';
interface State {
    pickerSize: {
        width: number;
        height: number;
    };
}
interface Color extends HSBColor {
    /** Level of transparency */
    alpha?: HSBAColor['alpha'];
}
export interface ColorPickerProps {
    /** ID for the element */
    id?: string;
    /** The currently selected color */
    color: Color;
    /** Allow user to select an alpha value */
    allowAlpha?: boolean;
    /** Allow HuePicker to take the full width */
    fullWidth?: boolean;
    /** Callback when color is selected */
    onChange(color: HSBAColor): void;
}
export declare class ColorPicker extends PureComponent<ColorPickerProps, State> {
    state: State;
    private colorNode;
    private handleResize;
    private observer?;
    componentWillUnmount(): void;
    componentDidMount(): void;
    render(): React.JSX.Element;
    private setColorNode;
    private handleHueChange;
    private handleAlphaChange;
    private handleDraggerMove;
    private handlePickerDrag;
}
export {};
//# sourceMappingURL=ColorPicker.d.ts.map