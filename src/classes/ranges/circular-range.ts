import {BaseRange} from "./base-range";
import {GradientInterpolation} from "../../interfaces/values/colors/gradient";

export abstract class CircularRange<T> extends BaseRange<T> {
	protected constructor(
		type: string,
		a: T,
		b: T,
		readonly wrapRange: BaseRange<T>,
		compare: (a: T, b: T) => number
	) { super(type, a, b, compare); }

	public abstract getRange(interpolationDirection: GradientInterpolation): number;

	public override contains(value: T): boolean {

	}
}