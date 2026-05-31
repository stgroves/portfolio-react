import {CircularRange} from "./circular-range";
import {JSONValue} from "../../interfaces/values/json-base";
import {NumberRange} from "./number-range";
import {GradientInterpolation} from "../../interfaces/values/colors/gradient";

export class CircularNumberRange extends CircularRange<number> {
	constructor({min = 0, max, wrapRange}: {min?: number, max: number, wrapRange: NumberRange}) {
		super("circular-number-range", min, max, wrapRange, (a, b) => a - b);
	}

	protected applyToJSONObject(obj: { [p: string]: JSONValue }): void {
	}

	getRange:(interpolationDirection: GradientInterpolation) => number = (interpolationDirection: GradientInterpolation): number =>
		this.min > this.max ? (this.wrapRange.max - this.min) + (this.max - this.wrapRange.min) : this.max - this.min;
}