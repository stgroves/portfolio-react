import {JSONBase} from "../json-base";
import {RangeValue} from "../../interfaces/values/range";

export abstract class BaseRange<T> extends JSONBase implements RangeValue<T> {
	protected constructor(
		type: string,
		readonly min: T,
		readonly max: T,
		protected readonly compare: (a: T, b: T) => number
	) { super(type); }

	public abstract contains(value: T): boolean;
}