import {JSONValue} from "../../../interfaces/values/json-base";
import {rgbaToHSLA, toColor} from "../../../utilities/color";
import {BaseColor} from "./base-color";
import {HexData, HSLAData, RGBAData} from "../../../interfaces/values/colors/color";
import Color from "colorjs.io";
import {RGBAColor} from "./rgba-color";
import {NumberRange} from "../../ranges/number-range";


export class HSLAColor extends BaseColor<HSLAData> implements HSLAData {
	public static readonly TYPE: string = "hsla";

	public static isValidHSLA = (hsla: HSLAData): boolean => {
		const {h, s, l, a = 1} = hsla;
		return h >= 0 && s >= 0 && l >= 0 && a >= 0 && h <= 359 && s <= 100 && l <= 100 && a <= 1;
	}

	public static toCssString = (hsla: HSLAData): string=>
		`hsla(${hsla.h}, ${hsla.s}%, ${hsla.l}%, ${hsla.a ?? 1})`;

	public static toColor = (hsla: HSLAData): Color =>
		toColor(HSLAColor.TYPE, [hsla.h, hsla.s, hsla.l, hsla.a]);

	public static fromRGBA = (rgba: RGBAData): HSLAColor =>
		new HSLAColor(rgbaToHSLA(rgba));

	public static fromHex = (hex: HexData | string): HSLAColor =>
		new HSLAColor(rgbaToHSLA(RGBAColor.fromHexColor(hex)));

	public static readonly TRANSPARENT: HSLAColor = new HSLAColor({h: 0, s: 0, l: 0, a: 0});
	public static readonly WHITE: HSLAColor = new HSLAColor({h: 0, s: 0, l: 100, a: 1});
	public static readonly BLACK: HSLAColor = new HSLAColor({h: 0, s: 0, l: 0, a: 1});

	public static readonly CHANNEL_RANGES = {
		h: new NumberRange({max: 360}),
		s: NumberRange.PERCENTAGE,
		l: NumberRange.PERCENTAGE,
		a: NumberRange.FLOAT_PERCENTAGE,
	};

	a: number;
	l: number;
	s: number;
	h: number;

	public constructor(hsla: HSLAData) {
		super(
			HSLAColor.TYPE,
			hsla,
			(color: HSLAData) => {
				if (!HSLAColor.isValidHSLA(color))
					throw new Error('Invalid hsla color');
			}
		);

		this.a = hsla.a ?? 1;
		this.l = hsla.l;
		this.s = hsla.s;
		this.h = hsla.h;
	}

	public override applyToJSONObject(obj: {[key: string]: JSONValue}) {
		obj.a = this.a;
		obj.l = this.l;
		obj.s = this.s;
		obj.h = this.h;
	}

	public override toString = (): string => `{h: ${this.h}, s: ${this.s}, l: ${this.l}, a: ${this.a}}`;

	toCssString = (): string => HSLAColor.toCssString(this);
}