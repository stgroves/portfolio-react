import {NumberRange} from "../classes/ranges/number-range";

export const clamp= (value: number, min: number, max: number): number =>
	Math.max(min, Math.min(value, max));

export const roundToNearest = (value: number, fractional: number): number =>
	Math.round(value * (1 / fractional)) / (1 / fractional);

export const lerp = (start: number, end: number, progress: number): number =>
	(1 - progress) * start + progress * end;

export const percentage = (value: number, range: NumberRange): number =>
	value - range.min / range.getRange();

export const normalizeAngle:(angle: number) => number = (angle: number): number => ((angle % 360) + 360) % 360;

export const angleToRadians:(angle: number) => number = (angle: number): number => angle * Math.PI / 180;