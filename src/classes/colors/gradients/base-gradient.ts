import {JSONBase} from "../../json-base";
import {
	GradientData,
	GradientDataTypes, GradientInterpolation, GradientStopData
} from "../../../interfaces/values/colors/gradient";
import {JSONValue} from "../../../interfaces/values/json-base";
import {HSLAColor} from "../solid/hsla-color";
import {HSLAData} from "../../../interfaces/values/colors/color";

export class GradientStop extends JSONBase implements GradientStopData {
	public static readonly TYPE = "gradient-stop";

	color: HSLAColor;
	position: number;

	constructor({ color, position }: {color: HSLAData; position: number}) {
		super(GradientStop.TYPE);

		this.color = color instanceof HSLAColor ? color : new HSLAColor(color);
		this.position = position;
	}

	protected applyToJSONObject(obj: { [p: string]: JSONValue }): void {
		obj.position = this.position;
		obj.color = this.color.saveToJSON();
	}
}

export abstract class BaseGradient<TData extends GradientDataTypes> extends JSONBase implements GradientData {
	isRepeating: boolean;
	stops: GradientStop[];
	interpolation: GradientInterpolation;

	protected constructor(
		type: string,
		gradient: TData,
		validator: (gradient: TData) => boolean,
	) {
		super(type);

		const sortedStops: GradientStop[] =
			[...gradient.stops].sort((a: GradientStop, b: GradientStop) => a.position - b.position);

		if (!validator({ ...gradient, stops: sortedStops }))
			throw new Error("Invalid gradient format");

		this.isRepeating = gradient.isRepeating !== undefined && gradient.isRepeating;
		this.stops = gradient.stops;
		this.interpolation = gradient.interpolation;
	}

	protected override applyToJSONObject(obj: { [p: string]: JSONValue }): void {
		obj.isRepeating = this.isRepeating;
		obj.stops = this.stops.map((stop: GradientStop): JSONValue => stop.saveToJSON());
	}

	abstract toString(): string;

	abstract toCssString(): string;
}