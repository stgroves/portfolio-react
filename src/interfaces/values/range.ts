export interface RangeValue<T> {
	type: string;
	min: T;
	max: T;

	contains: (value: T) => boolean;
}