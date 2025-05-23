import React, { PureComponent } from 'react';
interface Position {
    x: number;
    y: number;
}
interface State {
    dragging: boolean;
    window?: Window | null;
}
export interface SlidableProps {
    draggerX?: number;
    draggerY?: number;
    onChange(position: Position): void;
    onDraggerHeight?(height: number): void;
}
export declare class Slidable extends PureComponent<SlidableProps, State> {
    state: State;
    private node;
    private draggerNode;
    private observer?;
    componentWillUnmount(): void;
    componentDidMount(): void;
    render(): React.JSX.Element;
    private handleResize;
    private setDraggerNode;
    private setNode;
    private startDrag;
    private handleDragEnd;
    private handleMove;
    private handleDraggerMove;
}
export {};
//# sourceMappingURL=Slidable.d.ts.map