export interface Tuple2D {
	x: number;
	y: number;
}

export interface Dimension2D<T extends number | string> {
	width: T;
	height: T;
}