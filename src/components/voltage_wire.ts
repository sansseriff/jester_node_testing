import { Circle, makeScene2D, Path, Node, NodeProps } from '@motion-canvas/2d';
import { createRef, all, SignalValue } from '@motion-canvas/core';

export interface VoltageWireProps extends NodeProps {
    flowSpeed?: SignalValue<number>;
}

export class VoltageWire extends Node {

}