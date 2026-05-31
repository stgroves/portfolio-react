import {JSONValue} from "../../../interfaces/values/json-base";
import {rgbaToHex} from "../../../utilities/color";
import {BaseColor} from "./base-color";
import {HexData, HSLAData, RGBAData} from "../../../interfaces/values/colors/color";
import Color from "colorjs.io";
import {RGBAColor} from "./rgba-color";
import {NumberRange} from "../../ranges/number-range";

export class HexColor extends BaseColor<HexData> implements HexData {
	public static readonly TYPE: string = "hex";

	public static isValidHex = (hex: HexData | string): boolean => {
		const test: string = typeof hex == "string" ? hex : hex.value;
		return /^#(?:[0-9a-fA-F]{3,4}){1,2}$/.test(test);
	}

	public static toCssString = (hex: HexData): string => hex.value;

	public static toColor = (hex: HexData): Color => new Color(hex.value);

	public static fromRGBA = (rgba: RGBAData): HexColor => new HexColor(rgbaToHex(rgba));

	public static fromHSLA = (hsla: HSLAData): HexColor =>
		new HexColor(rgbaToHex(RGBAColor.fromHSLAColor(hsla)));

	public static TRANSPARENT: HexColor = new HexColor({value: "#0000"});
	public static WHITE: HexColor = new HexColor({value: "#FFF"});
	public static BLACK: HexColor = new HexColor({value: "#000"});

	public static readonly CHANNEL_RANGES = {
		r: new NumberRange({max: 255}),
		g: new NumberRange({max: 255}),
		b: new NumberRange({max: 255}),
		a: NumberRange.FLOAT_PERCENTAGE,
	};

	value: string;

	public constructor(hex: HexData) {
		super(
			HexColor.TYPE,
			hex,
			(color: HexData) => {
				if (!HexColor.isValidHex(color.value))
					throw new Error('Invalid hex color');
			}
		);

		this.value = hex.value;
	}

	public override toString = (): string => this.value;
	public override toCssString = (): string => HexColor.toCssString(this);

	protected applyToJSONObject(obj: { [p: string]: JSONValue }): void {
		obj.value = this.value;
	}
}