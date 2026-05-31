import {LinearGradientData} from "../../../interfaces/values/colors/gradient";
import {JSONValue} from "../../../interfaces/values/json-base";
import {BaseGradient, GradientStop} from "./base-gradient";
import {normalizeAngle} from "../../../utilities/math";
import {HSLAColor} from "../solid/hsla-color";
import {HSLAData} from "../../../interfaces/values/colors/color";

export class LinearGradient extends BaseGradient<LinearGradientData> implements LinearGradientData {
	public static readonly TYPE: string = "linear-gradient";

	public static isValidGradient: (linear: LinearGradientData) => boolean = (linear: LinearGradientData): boolean =>
		linear.angle !== undefined && linear.angle >= 0 && linear.angle <= 360 &&
		linear.stops.length >= 2 && linear.stops.every(stop => stop.position >= 0 && stop.position <= 1);

	public static getHueGradient: (angle: number) => LinearGradient = (angle: number): LinearGradient => {
		const stops: GradientStop[] = [];

		for (let i = 0; i < 360; i++)
			stops.push(new GradientStop({ color: new HSLAColor({h: i, s: 100, l: 50, a: 1}), position: i / 360 }))

		return new LinearGradient(
			{
				angle: angle,
				stops,
				isRepeating: false,
				interpolation: "shortest"
			}
		);
	}

	public static getAlphaGradient: (color: HSLAData, angle: number) => LinearGradient =
		(color: HSLAData, angle: number): LinearGradient =>
			new LinearGradient(
				{
					angle: angle,
					stops: [
						new GradientStop({color, position: 0}),
						new GradientStop({color: HSLAColor.TRANSPARENT, position: 1})
					],
					isRepeating: false,
					interpolation: "shortest"
				}
			);

	angle: number;

	public constructor({ angle = 180, stops, isRepeating = false, interpolation = "shortest" }: LinearGradientData) {
		super(
			LinearGradient.TYPE,
			{ angle, stops, isRepeating, interpolation },
			(gradient: LinearGradientData): boolean => LinearGradient.isValidGradient(gradient)
		);

		this.angle = normalizeAngle(angle);
	}

	protected applyToJSONObject(obj: { [p: string]: JSONValue }): void {
		super.applyToJSONObject(obj);

		obj.angle = this.angle;
	}

	public override toCssString(): string {
		return `${this.isRepeating ? 'repeating-' : ''}linear-gradient(${this.angle}deg, ${this.stops
			.map(stop => `${stop.color.toCssString()} ${stop.position * 100}%`)
			.join(', ')
		})`;
	}

	public toString(): string {
		throw new Error("Method not implemented.");
	}
}