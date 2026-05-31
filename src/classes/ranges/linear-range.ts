import {BaseRange} from "./base-range";

export abstract class LinearRange<T> extends BaseRange<T> {
	public abstract getRange(): number;

	public override contains = (value: T): boolean =>
		this.compare(this.min, value) <= 0 && this.compare(value, this.max) <= 0;
}