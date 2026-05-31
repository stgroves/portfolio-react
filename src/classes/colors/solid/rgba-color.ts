import {JSONValue} from "../../../interfaces/values/json-base";
import {HSLAColor} from "./hsla-color";
import {parseToRGBA, toColor} from "../../../utilities/color";
import {BaseColor} from "./base-color";
import {HexData, HSLAData, RGBAData} from "../../../interfaces/values/colors/color";
import Color from "colorjs.io";
import {NumberRange} from "../../ranges/number-range";

export class RGBAColor extends BaseColor<RGBAData> implements RGBAData {
	public static readonly TYPE: string = "rgba";

	public static isValidRGBA = (rgba: RGBAData): boolean => {
		const {r, g, b, a = 1} = rgba;
		return r >= 0 && g >= 0 && b >= 0 && a >= 0 && r <= 255 && g <= 255 && b <= 255 && a <= 1;
	}

	public static toCssString = (rgba: RGBAData): string =>
		`rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a ?? 1})`;

	public static toColor = (rgba: RGBAData): Color =>
		toColor(RGBAColor.TYPE, [rgba.r, rgba.g, rgba.b, rgba.a]);

	public static fromHSLAColor = (hsla: HSLAData): RGBAColor =>
		new RGBAColor(parseToRGBA(HSLAColor.toColor(hsla)));

	public static fromHexColor = (hex: HexData | string): RGBAColor =>
		new RGBAColor(parseToRGBA(typeof hex == "string" ? hex : hex.value));

	public static TRANSPARENT: RGBAColor = new RGBAColor({r: 0, g: 0, b: 0, a: 0});
	public static WHITE: RGBAColor = new RGBAColor({r: 255, g: 255, b: 255, a: 1});
	public static BLACK: RGBAColor = new RGBAColor({r: 0, g: 0, b: 0, a: 1});

	public static readonly CHANNEL_RANGES = {
		r: new NumberRange({max: 255}),
		g: new NumberRange({max: 255}),
		b: new NumberRange({max: 255}),
		a: NumberRange.FLOAT_PERCENTAGE,
	};

	a: number;
	b: number;
	g: number;
	r: number;

	public constructor(rgba: RGBAData) {
		const temp = {...rgba};
		temp.a ??= 1;

		super(
			RGBAColor.TYPE,
			temp,
			(color: RGBAData) => {
				if (!RGBAColor.isValidRGBA(color))
					throw new Error('Invalid rgba color');
			}
		);

		this.a = temp.a;
		this.b = temp.b;
		this.g = temp.g;
		this.r = temp.r;
	}

	public override applyToJSONObject(obj: {[key: string]: JSONValue}) {
		obj.a = this.a;
		obj.b = this.b;
		obj.g = this.g;
		obj.r = this.r;
	}

	public override toString = (): string => `{r: ${this.r}, g: ${this.g}, b: ${this.b}, a: ${this.a}}`;

	public override toCssString = (): string => RGBAColor.toCssString(this);
}