import {JSONValue} from "../../interfaces/values/json-base";
import { clamp } from "../../utilities/math";
import {LinearRange} from "./linear-range";

export class NumberRange extends LinearRange<number> {
	static fromJSON =
		(min: number, max: number) => new NumberRange({min, max});

	static readonly PERCENTAGE = new NumberRange({max: 100});
	static readonly FLOAT_PERCENTAGE = new NumberRange({max: 1});

	constructor({min = 0, max}: {min?: number, max: number}) {
		super("number-range", min, max, (a, b) => a - b);
	}

	override getRange: () => number = (): number => this.max - this.min;

	clamp: (value: number) => number = (value: number): number => clamp(value, this.min, this.max);

	protected override applyToJSONObject = (obj: { [key: string]: JSONValue }) => {
		obj.min = this.min;
		obj.min = this.max;
	}
}