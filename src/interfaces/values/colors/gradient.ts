import {Tuple2D} from "../tuples";
import {LinearGradient} from "../../../classes/colors/gradients/linear-gradient";
import {HSLAColor} from "../../../classes/colors/solid/hsla-color";
import {GradientStop} from "../../../classes/colors/gradients/base-gradient";

export type GradientTypes = LinearGradient; // Other Gradients don't exist yet
export type GradientDataTypes = LinearGradientData | RadialGradientData | ConicGradientData;

export type GradientInterpolation = "shortest" | "longest";

export type RadialSizes = "closest-side" | "farthest-side" | "closest-corner" | "farthest-corner";
export type RadialShapes = "circle" | "ellipse";


export interface GradientStopData {
	position: number;
	color: HSLAColor;
}

interface PositionalData {
	position?: Tuple2D
}

interface AngledData {
	angle: number;
}

export interface GradientData {
	isRepeating?: boolean;
	stops: GradientStop[];
	interpolation: GradientInterpolation;
}

export interface ConicGradientData extends GradientData, PositionalData, AngledData { }

export interface RadialGradientData extends GradientData, PositionalData, AngledData {
	shape: RadialShapes;
	size: RadialSizes;
}

export interface LinearGradientData extends GradientData, AngledData { }